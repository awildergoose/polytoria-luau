import type { IREnum, IRType } from "./ir";

export class CodeEmitter {
	text = "";

	super() {}

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

	emitType(type: IRType) {
		this.emit(
			`declare class ${type.Name}${
				type.BaseType !== null ? ` extends ${type.BaseType}` : ""
			}`
		);

		for (const event of type.Events) {
			const args = event.Arguments.map((x) => x.Type).join(", ");
			this.emit(`\t${event.Name}: Event<${args}>`);
		}

		this.emit("end\n");
	}
}
