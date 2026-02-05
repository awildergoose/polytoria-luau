import type { IREnum, IRType } from "./ir";

export class CodeEmitter {
	text = "";

	super() {}

	resolveType(type: string): string {
		// TODO: resolve function and table types properly if possible
		if (type === "function" || type === "table") type = "any";
		return type;
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

			if (type.Events.length > 0) this.emit();

			for (const method of type.Methods) {
				const args = [
					"self",
					...method.Parameters.map(
						(p) => `${p.Name}: ${this.resolveType(p.Type)}`
					),
				].join(", ");
				this.emit(
					`\tfunction ${method.Name}(${args}): ${
						method.ReturnType || "nil"
					}`
				);
			}

			if (type.Methods.length > 0) this.emit();

			for (const property of type.Properties) {
				if (!property.IsAccessibleByScripts) continue;
				if (property.IsStatic) continue;
				this.emit(
					`\t${property.Name}: ${this.resolveType(property.Type)}`
				);
			}
		} else {
			for (const method of type.Methods) {
				const args = method.Parameters.map(
					(p) => `${p.Name}: ${this.resolveType(p.Type)}`
				).join(", ");
				this.emit(
					`\t${method.Name}: (${args}) -> ${this.resolveType(
						method.ReturnType || "nil"
					)},`
				);
			}

			if (
				type.Properties.filter(
					(v) => v.IsAccessibleByScripts && v.IsStatic
				).length > 0 &&
				type.Methods.length > 0
			)
				this.emit();

			for (const property of type.Properties) {
				if (!property.IsAccessibleByScripts) continue;
				if (!property.IsStatic) continue;
				this.emit(
					`\t${property.Name}: ${this.resolveType(property.Type)},`
				);
			}
		}

		if (isStaticPass) this.emit("}\n");
		else this.emit("end\n");
	}
}
