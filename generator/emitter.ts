import type { IREnum, IRParameter, IRType } from "./ir";

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

			if (type.Events.length > 0 && type.Methods.length > 0) this.emit();

			for (const method of type.Methods) {
				const args = [
					"self",
					...method.Parameters.map(CodeEmitter.resolveParameter),
				].join(", ");
				this.emit(
					`\tfunction ${method.Name}(${args}): ${
						method.ReturnType || "nil"
					}`
				);
			}

			if (
				type.Methods.length > 0 &&
				type.Properties.filter(
					(x) => x.IsAccessibleByScripts && !x.IsStatic
				).length > 0
			)
				this.emit();

			for (const property of type.Properties) {
				if (!property.IsAccessibleByScripts) continue;
				if (property.IsStatic) continue;

				this.emit(
					`\t${property.Name}: ${CodeEmitter.resolveType(
						property.Type
					)}`
				);
			}
		} else {
			for (const method of type.Methods) {
				const args = method.Parameters.map(
					CodeEmitter.resolveParameter
				).join(", ");
				this.emit(
					`\t${method.Name}: (${args}) -> ${CodeEmitter.resolveType(
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
					`\t${property.Name}: ${CodeEmitter.resolveType(
						property.Type
					)},`
				);
			}
		}

		if (isStaticPass) this.emit("}\n");
		else this.emit("end\n");
	}
}
