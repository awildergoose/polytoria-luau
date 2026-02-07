import { YAML } from "bun";
import { readdir } from "node:fs/promises";
import {
	IREnumSchema,
	IRTypeSchema,
	IRSchema,
	type IR,
	type IRType,
} from "./ir";
import { CodeEmitter } from "./code_emitter";
import { DocsEmitter } from "./docs_emitter";
import { sortTypesInDependencyOrder } from "./utils";

const ROOT = `${__dirname}/../docs-site/yaml`;
const ENUMS = `${ROOT}/enums`;
const TYPES = `${ROOT}/types`;

const ir: IR = { enums: [], types: [] };

let start = Bun.nanoseconds();

const enumFiles = await readdir(`${ENUMS}`, { recursive: true });
for (const file of enumFiles) {
	const text = await Bun.file(`${ENUMS}/${file}`).text();
	const parsed = IREnumSchema.parse(YAML.parse(text));
	ir.enums.push(parsed);
}

const typeFiles = await readdir(`${TYPES}`, { recursive: true });
for (const file of typeFiles) {
	const text = await Bun.file(`${TYPES}/${file}`).text();
	const parsed = IRTypeSchema.parse(YAML.parse(text));
	ir.types.push(parsed);
}

const fullIR = IRSchema.parse(ir);
console.log(`Parsed IR in ${((Bun.nanoseconds() - start) / 1e9).toFixed(3)}s!`);
start = Bun.nanoseconds();

const emitter = new CodeEmitter();

const instantiables: Set<string> = new Set();
const statics: Set<[string, string]> = new Set();

for (const c of ir.types.values()) {
	if (c.IsInstantiatable) {
		instantiables.add(c.Name);
	}
	if (c.IsStatic) {
		statics.add([c.StaticAlias || c.Name, c.Name]);
	}
}

emitter.emit(
	`--#METADATA#{"CREATABLE_INSTANCES":[${Array.from(instantiables)
		.map((a) => `"${a}"`)
		.join(", ")}], "SERVICES": [${Array.from(statics)
		.map((a) => a[0])
		.map((a) => `"${a}"`)
		.join(", ")}]}`
);

emitter.emit(`
declare class Enum
end

declare class EnumItem
end

export type Event<T... = ...any> = {
    Connect: (self: Event<T...>, callback: (T...) -> ()) -> (),
    Disconnect: (self: Event<T...>, callback: (T...) -> ()) -> (),
}
`);

emitter.emit(
	`type ClassName = ${ir.types.map((c) => `"${c.Name}"`).join(" | ")};`
);
emitter.emit(
	`type InstantiableClassName = ${Array.from(instantiables)
		.map((n) => `"${n}"`)
		.join(" | ")};\n`
);

emitter.emit();

for (const enm of fullIR.enums) {
	emitter.emitEnum(enm);
}

emitter.emit();

emitter.emit("type ENUM_LIST = {");
for (const enm of fullIR.enums) {
	emitter.emit(`\t${enm.Name}: ${enm.InternalName},`);
}
emitter.emit("}");
emitter.emit("declare Enum: ENUM_LIST");

emitter.emit();

const sortedTypes = sortTypesInDependencyOrder(fullIR.types);

for (const type of sortedTypes) {
	emitter.emitType(type, false);
}

emitter.emit();

for (const type of sortedTypes) {
	if (
		type.Methods.find((v) => v.IsStatic) ||
		type.Properties.find((v) => v.IsStatic)
	)
		emitter.emitType(type, true);
}

for (const [a, c] of statics) {
	emitter.emit(`declare ${a}: ${c}`);
}

console.log(
	`Emitted code in ${((Bun.nanoseconds() - start) / 1e9).toFixed(3)}s!`
);

await Bun.file("generated/generated.d.luau").write(emitter.text);
start = Bun.nanoseconds();

const docsEmitter = new DocsEmitter();
for (const enm of fullIR.enums) docsEmitter.emitEnum(enm);
for (const type of sortedTypes) docsEmitter.emitType(type);

console.log(
	`Emitted docs in ${((Bun.nanoseconds() - start) / 1e9).toFixed(3)}s!`
);
await Bun.file("generated/generated.docs.json").write(
	JSON.stringify(docsEmitter.output, null, 4)
);
