import {
	Project,
	Node,
	SourceFile,
	EnumDeclaration,
	ClassDeclaration,
	TypeAliasDeclaration,
	SyntaxKind,
	ExpressionStatement,
	TypeNode,
	TypeReferenceNode,
	ParameterDeclaration,
	FunctionTypeNode,
} from "ts-morph";
import fs from "fs";

type IR = {
	enums: Map<string, IREnum>;
	classes: Map<string, IRClass>;
	aliases: Map<string, IRAlias>;
	globalStaticClasses: Map<string, IRGlobalStaticClass>;
	prefix: string[];
	suffix: string[];
};

type IREnum = {
	name: string;
	members: string[];
};

type IRClass = {
	name: string;
	// TODO property for base and sub-bases
	base?: string;
	properties: IRProperty[];
	methods: IRMethod[];
};

type IRProperty = {
	name: string;
	type: string;
	optional: boolean;
};

type IRParameter = {
	name: string;
	type: string;
};

type IRMethod = {
	name: string;
	params: IRParameter[];
	returns: string;
};

type IRAlias = {
	name: string;
	type: string;
};

type IRGlobalStaticClass = {
	name: string;
	properties: IRProperty[];
	methods: IRMethod[];
};

const project = new Project({
	tsConfigFilePath: "types/tsconfig.json",
});

const ir: IR = {
	enums: new Map(),
	classes: new Map(),
	aliases: new Map(),
	globalStaticClasses: new Map(),
	prefix: [],
	suffix: [],
};

for (const sf of project.getSourceFiles()) {
	if (sf.isDeclarationFile()) continue;
	visitSourceFile(sf);
}

/**
 * get or default a value from a map using a key,
 * note: this creates the key in the map
 * @param map the map
 * @param key the key
 * @param def the default
 * @returns the value
 */
function getOrDefault<K, V>(map: Map<K, V>, key: K, def: V): V {
	if (!map.has(key)) map.set(key, def);
	return map.get(key)!;
}

function typeNodeToName(t: TypeNode): string {
	switch (t.getKind()) {
		case SyntaxKind.FunctionType: {
			const fn = t.asKindOrThrow(SyntaxKind.FunctionType);
			const params = fn.getParameters().map(visitParameter).join(", ");
			let returns = typeNodeToName(fn.getReturnTypeNodeOrThrow());
			if (returns === "void") returns = "()";

			return `(${params}) -> ${returns}`;
		}
		case SyntaxKind.ArrayType:
			return `{ ${typeNodeToName(
				t.asKindOrThrow(SyntaxKind.ArrayType).getElementTypeNode()
			)} }`;
		case SyntaxKind.TypeReference:
			return visitTypeReference(
				t.asKindOrThrow(SyntaxKind.TypeReference)
			);
		case SyntaxKind.UnionType: // TODO handle unions properly
		case SyntaxKind.NumberKeyword:
		case SyntaxKind.VoidKeyword:
		case SyntaxKind.BooleanKeyword:
		case SyntaxKind.StringKeyword:
		case SyntaxKind.AnyKeyword:
			return t.getText();
		default:
			console.warn(
				`failed to handle type node ${t.getKindName()}: "${t.print()}"`
			);
			return t.getText();
	}
}

function throwUnhandled(node: Node) {
	throw new Error(`Unhandled node type: ${node.getKindName()}`);
}

function visitReturnType(fn: FunctionTypeNode) {
	let returns = typeNodeToName(fn.getReturnTypeNodeOrThrow());
	if (returns === "void") returns = "()";

	return returns;
}

function visitParameter(p: ParameterDeclaration) {
	const name = p.getName();
	const type = typeNodeToName(p.getTypeNodeOrThrow());

	return `${name}: ${type}`;
}

function visitTypeReference(node: TypeReferenceNode) {
	// TODO: prevent getText
	const name = node.getTypeName().getText();
	const typeArgs = node.getTypeArguments();

	// TODO: prevent getText
	if (typeArgs.length > 0 && node.getText().startsWith("Tuple")) {
		return `(${typeArgs.map((x) => x.getText()).join(", ")})`;
	}

	let text = name;

	if (typeArgs.length > 0) text += "<";
	for (let typeArg of typeArgs) {
		let typeText;
		switch (typeArg.getKind()) {
			case SyntaxKind.TupleType: {
				let tuple = typeArg.asKindOrThrow(SyntaxKind.TupleType);
				typeText = tuple
					.getElements()
					.map((x) => typeNodeToName(x))
					.join(", ");
				break;
			}
			case SyntaxKind.TypeReference:
			case SyntaxKind.NumberKeyword:
			case SyntaxKind.VoidKeyword:
			case SyntaxKind.BooleanKeyword:
			case SyntaxKind.StringKeyword:
			case SyntaxKind.AnyKeyword:
				typeText = typeArg.getText();
				break;
			default:
				console.warn(
					`failed to handle type arg ${typeArg.getKindName()}: "${typeArg.print()}"`
				);
				typeText = typeArg.getText();
				break;
		}

		if (typeText === "void") typeText = "";
		text += typeText;
	}
	if (typeArgs.length > 0) text += ">";

	return text;
}

function visitSourceFile(file: SourceFile) {
	file.forEachChild((node) => {
		switch (node.getKind()) {
			case SyntaxKind.ExpressionStatement:
				visitExpression(
					node.asKindOrThrow(SyntaxKind.ExpressionStatement)
				);
				break;
			case SyntaxKind.EnumDeclaration:
				visitEnum(node.asKindOrThrow(SyntaxKind.EnumDeclaration));
				break;
			case SyntaxKind.ClassDeclaration:
				visitClass(node.asKindOrThrow(SyntaxKind.ClassDeclaration));
				break;
			case SyntaxKind.TypeAliasDeclaration:
				visitAlias(node.asKindOrThrow(SyntaxKind.TypeAliasDeclaration));
				break;
			case SyntaxKind.EndOfFileToken:
			case SyntaxKind.ImportDeclaration:
				break;
			default:
				throwUnhandled(node);
				break;
		}
	});
}

function visitEnum(enm: EnumDeclaration) {
	const name = enm.getName();
	const members = enm.getMembers().map((m) => m.getName());
	ir.enums.set(name, { name, members });
}

function visitClass(clazz: ClassDeclaration) {
	const name = clazz.getName();
	if (!name) return;

	// TODO: prevent getText
	const base = clazz.getExtends()?.getExpression().getText();

	const properties: IRProperty[] = [];
	const methods: IRMethod[] = [];

	for (const m of clazz.getMembers()) {
		if (Node.isPropertyDeclaration(m)) {
			let item: IRProperty = {
				name: m.getName(),
				type: typeNodeToName(m.getTypeNodeOrThrow()),
				optional: m.hasQuestionToken(),
			};

			if (m.hasModifier(SyntaxKind.StaticKeyword)) {
				getOrDefault(ir.globalStaticClasses, name, {
					name,
					methods: [],
					properties: [],
				}).properties.push(item);
				continue;
			}

			properties.push(item);
		}

		if (Node.isMethodDeclaration(m)) {
			let returns = typeNodeToName(m.getReturnTypeNodeOrThrow());
			if (returns === "void") returns = "()";

			let item: IRMethod = {
				name: m.getName(),
				params: m.getParameters().map((p) => ({
					name: p.getName(),
					type: typeNodeToName(p.getTypeNodeOrThrow()),
				})),
				returns,
			};

			if (m.hasModifier(SyntaxKind.StaticKeyword)) {
				getOrDefault(ir.globalStaticClasses, name, {
					name,
					methods: [],
					properties: [],
				}).methods.push(item);
				continue;
			}

			methods.push(item);
		}
	}

	ir.classes.set(name, {
		name,
		base,
		properties,
		methods,
	});
}

function visitAlias(alias: TypeAliasDeclaration) {
	// TODO: prevent getText
	ir.aliases.set(alias.getName(), {
		name: alias.getName(),
		type: alias.getType().getText(),
	});
}

function visitExpression(expression: ExpressionStatement) {
	let callExpression = expression.getExpressionIfKind(
		SyntaxKind.CallExpression
	);
	if (callExpression !== undefined) {
		let identifier = callExpression.getExpressionIfKind(
			SyntaxKind.Identifier
		);
		if (identifier !== undefined) {
			// TODO properly handle this and prevent getText
			if (identifier.getText() === "raw_prefix") {
				ir.prefix.push(
					callExpression
						.getArguments()
						.at(0)
						?.getText(false)!
						.slice(1, -1)!
				);
			} else if (identifier.getText() === "raw_suffix") {
				ir.suffix.push(
					callExpression
						.getArguments()
						.at(0)
						?.getText(false)!
						.slice(1, -1)!
				);
			} else throwUnhandled(expression);
		} else throwUnhandled(expression);
	} else throwUnhandled(expression);
}

function lowerType(tsType: string): string {
	tsType = tsType.trim();

	if (tsType === "number") return "number";
	if (tsType === "string") return "string";
	if (tsType === "boolean") return "boolean";
	if (tsType === "void") return "nil";
	if (tsType === "undefined") return "nil";
	if (tsType === "any") return "any";

	if (tsType.includes(" | undefined")) {
		return lowerType(tsType.replace(" | undefined", "")) + "?";
	}

	if (tsType.endsWith("[]")) {
		return `{ ${lowerType(tsType.slice(0, -2))} }`;
	}

	if (tsType.startsWith("[") && tsType.endsWith("]")) {
		return tsType
			.slice(1, -1)
			.split(",")
			.map((t) => lowerType(t))
			.join(", ");
	}

	return tsType;
}

let out = "";

function emit(line = "") {
	out += line + "\n";
}

function emitN(text: string) {
	out += text;
}

function unemit(n: number) {
	out = out.slice(0, -n);
}

for (const s of ir.prefix) emit(s);

for (const a of ir.aliases.values()) {
	emit(`type ${a.name} = ${lowerType(a.type)}`);
}
emit();

emit(`declare class Enum
end

declare class EnumItem
end
`);

emitN("type ClassName = ");
for (const c of ir.classes.values()) {
	if (c.base === "Instance") {
		emitN(`"${c.name}" | `);
	}
}
unemit(3);
emit();
emit();

const bases = new Set();

for (const c of ir.classes.values()) {
	if (c.base) {
		bases.add(c.base);
	}
}

for (const b of bases) {
	emit(`declare class ${b} end`);
}

emit();
for (const e of ir.enums.values()) {
	emit(`declare class ${e.name} extends EnumItem end`);
	emit(`declare class ${e.name}_INTERNAL extends Enum`);
	for (const m of e.members) emit(`\t${m}: ${e.name}`);
	emit(`end\n`);
}

emit("type ENUM_LIST = {");

for (const e of ir.enums.values()) {
	emit(`\t${e.name}: ${e.name}_INTERNAL,`);
}

emit("}");
emit("declare Enum: ENUM_LIST\n");

for (const c of ir.classes.values()) {
	emit(`declare class ${c.name}${c.base ? ` extends ${c.base}` : ""}`);
	for (const p of c.properties) {
		emit(`\t${p.name}: ${lowerType(p.type)}${p.optional ? "?" : ""}`);
	}
	for (const m of c.methods) {
		const realParams = m.params
			.map((p) => `${p.name}: ${lowerType(p.type)}`)
			.join(", ");
		const params = `self${realParams.length > 0 ? ", " : ""}${realParams}`;
		emit(`\tfunction ${m.name}(${params}): ${lowerType(m.returns)}`);
	}
	emit("end\n");
}

for (const c of ir.globalStaticClasses.values()) {
	emit(`declare ${c.name}: {`);
	for (const p of c.properties) {
		emit(`\t${p.name}: ${lowerType(p.type)}${p.optional ? "?" : ""},`);
	}
	for (const m of c.methods) {
		const params = m.params
			.map((p) => `${p.name}: ${lowerType(p.type)}`)
			.join(", ");
		emit(`\t${m.name}: (${params}) -> ${lowerType(m.returns)},`);
	}
	emit(`}\n`);
}

for (const s of ir.suffix) emit(s);

fs.writeFileSync("generated/generated.d.luau", out);
