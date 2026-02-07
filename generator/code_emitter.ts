import type { IREnum, IRMethod, IRParameter, IRType } from "./ir";

const ADDITIONS = {
	Instance: ["[string]: Instance"],
};
const ADDITIONS_KEYS = Object.keys(ADDITIONS);

const MODS = {
	Instance: {
		New: "New: (className: InstantiableClassName, parent: Instance?) -> Instance,",
		FindChildByClass:
			"function FindChildByClass(self, className: ClassName): Instance",
		FindAncestorByClass:
			"function FindAncestorByClass(self, className: ClassName): Instance",
		GetChildrenOfClass:
			"function GetChildrenOfClass(self, className: ClassName): { Instance }",
		IsDescendantOfClass:
			"function IsDescendantOfClass(self, className: ClassName): boolean",
	},
	NetworkedObject: {
		IsA: "function IsA(self, className: ClassName): boolean",
		ClassName: "ClassName: ClassName",
	},
};
const MODS_KEYS = Object.keys(MODS);

function unionize(types: Set<string>) {
	if (types.size === 0) return "any";
	return Array.from(types).join(" | ");
}

function chooseParamName(names: string[], fallbackIndex: number) {
	const counts = new Map<string, number>();
	for (const n of names) {
		if (!n) continue;
		counts.set(n, (counts.get(n) || 0) + 1);
	}
	if (counts.size === 0) return `arg${fallbackIndex + 1}`;
	return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]![0]!;
}

export class CodeEmitter {
	text = "";

	super() {}

	static resolveType(type: string): string {
		// TODO: resolve function and table types properly if possible
		if (type === "function" || type === "table") type = "any";
		return type;
	}

	static resolveParameter(p: IRParameter) {
		return `${p.Name}: ${CodeEmitter.resolveType(p.Type)}`;
	}

	emit(text = "") {
		this.text += `${text}\n`;
	}

	emitEnum(enm: IREnum) {
		this.emit(`declare class ${enm.Name} extends EnumItem end`);
		this.emit(`declare class ${enm.InternalName} extends Enum`);
		// TODO emit documentation
		for (const o of enm.Options) this.emit(`\t${o.Name}: ${enm.Name}`);
		this.emit(`end\n`);
	}

	emitType(type: IRType, isStaticPass: boolean) {
		this.emit(
			`declare${!isStaticPass ? " class" : ""} ${type.Name}${
				type.BaseType !== null && !isStaticPass
					? ` extends ${type.BaseType}`
					: ""
			}${isStaticPass ? ": {" : ""}`
		);

		if (!isStaticPass) {
			for (const event of type.Events) {
				const args = event.Arguments.map((x) => x.Type).join(", ");
				this.emit(`\t${event.Name}: Event<${args}>`);
			}

			if (
				type.Events.length > 0 &&
				type.Methods.filter((m) => m.IsStatic == isStaticPass).length >
					0
			)
				this.emit();
		}

		const methodsByName = new Map<string, IRMethod[]>();
		for (const method of type.Methods) {
			if (!(method.IsStatic == isStaticPass)) continue;

			const arr = methodsByName.get(method.Name) || [];
			arr.push(method);
			methodsByName.set(method.Name, arr);
		}

		for (const [methodName, overloads] of methodsByName) {
			let maxParams = 0;
			for (const ol of overloads) {
				maxParams = Math.max(maxParams, ol.Parameters.length);
			}

			type MergedParam = {
				name: string;
				typeUnion: string;
				optional: boolean;
			};

			const mergedParams: MergedParam[] = [];

			for (let i = 0; i < maxParams; i++) {
				const seenTypes = new Set<string>();
				const seenNames: string[] = [];
				let optional = false;

				for (const ol of overloads) {
					const parameter = ol.Parameters[i] as
						| IRParameter
						| undefined;

					if (!parameter) {
						optional = true;
						continue;
					}

					if (parameter.IsOptional) {
						optional = true;
					}

					if (parameter.Name) {
						seenNames.push(parameter.Name);
					}

					seenTypes.add(CodeEmitter.resolveType(parameter.Type));
				}

				let typeStr = unionize(seenTypes);
				if (optional) {
					if (!typeStr.includes("nil")) typeStr = `${typeStr} | nil`;
				}

				const paramName = chooseParamName(seenNames, i);
				mergedParams.push({
					name: paramName,
					typeUnion: typeStr,
					optional,
				});
			}

			const returnTypes = new Set<string>();
			for (const ol of overloads) {
				const rt = ol.ReturnType || "nil";
				returnTypes.add(CodeEmitter.resolveType(rt));
			}
			const mergedReturn = unionize(returnTypes);

			if (MODS_KEYS.includes(type.Name)) {
				const functions = MODS[type.Name as keyof typeof MODS];

				if (Object.keys(functions).includes(methodName)) {
					const line =
						functions[methodName as keyof typeof functions];
					this.emit(`\t${line}`);
					continue;
				}
			}

			if (!isStaticPass) {
				if (overloads.some((o) => o.IsObsolete))
					this.emit("\t@deprecated");
				const args = [
					"self",
					...mergedParams.map((p) => `${p.name}: ${p.typeUnion}`),
				].join(", ");
				this.emit(`\tfunction ${methodName}(${args}): ${mergedReturn}`);
			} else {
				const args = mergedParams
					.map((p) => `${p.name}: ${p.typeUnion}`)
					.join(", ");
				this.emit(`\t${methodName}: (${args}) -> ${mergedReturn},`);
			}
		}

		if (
			type.Methods.filter((m) => m.IsStatic == isStaticPass).length > 0 &&
			type.Properties.filter(
				(x) => x.IsAccessibleByScripts && x.IsStatic == isStaticPass
			).length > 0
		)
			this.emit();

		for (const property of type.Properties) {
			if (!property.IsAccessibleByScripts) continue;
			if (!(property.IsStatic == isStaticPass)) continue;

			if (MODS_KEYS.includes(type.Name)) {
				const properties = MODS[type.Name as keyof typeof MODS];

				if (Object.keys(properties).includes(property.Name)) {
					const line =
						properties[property.Name as keyof typeof properties];
					this.emit(`\t${line}`);
					continue;
				}
			}

			this.emit(
				`\t${property.Name}: ${CodeEmitter.resolveType(property.Type)}${
					isStaticPass ? "," : ""
				}`
			);
		}

		if (ADDITIONS_KEYS.includes(type.Name)) {
			this.emit();

			const lines = ADDITIONS[type.Name as keyof typeof ADDITIONS];
			lines.forEach((v) => this.emit(`\t${v}`));
		}

		if (isStaticPass) this.emit("}\n");
		else this.emit("end\n");
	}
}
