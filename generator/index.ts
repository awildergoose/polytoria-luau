import { YAML } from "bun";
import { readdir } from "node:fs/promises";
import { IREnumSchema, IRTypeSchema, IRSchema, type IR } from "./ir";
import { CodeEmitter } from "./emitter";

const ROOT = `${__dirname}/../docs-site/yaml`;
const ENUMS = `${ROOT}/enums`;
const TYPES = `${ROOT}/types`;

const ir: IR = { enums: [], types: [] };

const start = Bun.nanoseconds();

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
const durationSec = (Bun.nanoseconds() - start) / 1e9;
console.log(`Parsed IR in ${durationSec.toFixed(3)}s!`);

const emitter = new CodeEmitter();

const instantiables = new Set();
const bases = new Set();
const statics = new Set();

for (const c of ir.types.values()) {
	if (c.BaseType) {
		bases.add(c.BaseType);
	}
	if (c.IsInstantiatable) {
		instantiables.add(c.Name);
	}
	if (c.IsStatic) {
		statics.add(c.StaticAlias || c.Name);
	}
}

emitter.emit(
	`type InstantiableClassName = ${Array.from(instantiables)
		.map((n) => `"${n}"`)
		.join(" | ")};`
);
emitter.emit();

for (const b of bases) {
	emitter.emit(`declare class ${b} end`);
}

emitter.emit();

for (const s of statics) {
	emitter.emit(`declare ${s}: ${s}`);
}

emitter.emit();

for (const type of fullIR.types) {
	emitter.emitType(type);
}

await Bun.file("generated/generated.d.luau").write(emitter.text);
