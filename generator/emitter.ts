import type { IRType } from "./ir";

export class CodeEmitter {
	text = "";

	super() {}

	emit(text = "") {
		this.text += `${text}\n`;
	}

	emitType(type: IRType) {
		this.emit(
			`declare class ${type.Name}${
				type.BaseType !== null ? ` extends ${type.BaseType}` : ""
			}`
		);

		this.emit("}\n");
	}
}
