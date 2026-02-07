import type { Documentation, DocumentationEntry } from "./docs_ir";
import type { IREnum, IRType } from "./ir";

export class DocsEmitter {
	static DOCS_ROOT = "https://6cccc716.docs-v2-cib.pages.dev/api";

	output: Documentation = {};

	super() {}

	static getEnumDocsUrl(name: string): string {
		return `${DocsEmitter.DOCS_ROOT}/enums/${name}/`;
	}

	static getEnumMemberDocsUrl(name: string, subName: string): string {
		return `${DocsEmitter.DOCS_ROOT}/enums/${name}#${subName}`;
	}

	static getTypeDocsUrl(name: string): string {
		return `${DocsEmitter.DOCS_ROOT}/types/${name}/`;
	}

	static getTypeMemberDocsUrl(name: string, subName: string): string {
		return `${DocsEmitter.DOCS_ROOT}/types/${name}#${subName}`;
	}

	emit(key: string, value: DocumentationEntry) {
		this.output[`@polytoria/${key}`] = value;
	}

	emitEnum(enm: IREnum) {
		this.emit(`global/Enum.${enm.Name}`, {
			documentation: enm.Description,
			keys: Object.fromEntries(
				enm.Options.map((option) => [
					option.Name,
					`@polytoria/enum/${enm.Name}.${option.Name}`,
				])
			),
			learn_more_link: DocsEmitter.getEnumDocsUrl(enm.Name),
			code_sample: "",
		});

		for (const option of enm.Options) {
			this.emit(`/enum/${enm.Name}.${option.Name}`, {
				documentation: option.Description,
				keys: {},
				learn_more_link: DocsEmitter.getEnumMemberDocsUrl(
					enm.Name,
					option.Name
				),
				code_sample: "",
			});
		}
	}

	emitType(type: IRType) {
		this.emit(`globaltype/${type.Name}`, {
			documentation: type.Description,
			keys: Object.fromEntries([
				...type.Events.map((event) => [
					event.Name,
					`@polytoria/globaltype/${type.Name}.${event.Name}`,
				]),
				...type.Methods.map((method) => [
					method.Name,
					`@polytoria/globaltype/${type.Name}.${method.Name}`,
				]),
				...type.Properties.map((property) => [
					property.Name,
					`@polytoria/globaltype/${type.Name}.${property.Name}`,
				]),
			]),
			learn_more_link: DocsEmitter.getTypeDocsUrl(type.Name),
			code_sample: "",
		});

		for (const member of [...type.Events, ...type.Properties]) {
			this.emit(`globaltype/${type.Name}.${member.Name}`, {
				documentation: member.Description,
				learn_more_link: DocsEmitter.getTypeMemberDocsUrl(
					type.Name,
					member.Name
				),
				code_sample: "",
			});
		}

		for (const method of type.Methods) {
			const hasReturnType =
				(method.ReturnType && method.ReturnType !== "nil") || false;

			this.emit(`globaltype/${type.Name}.${method.Name}`, {
				documentation: method.Description,
				learn_more_link: DocsEmitter.getTypeMemberDocsUrl(
					type.Name,
					method.Name
				),
				code_sample: "",
				params: method.Parameters.map((p, i) => ({
					name: p.Name,
					documentation: `@polytoria/globaltype/${type.Name}.${method.Name}/param/${i}`,
				})),
				returns: hasReturnType
					? [
							`@polytoria/globaltype/${type.Name}.${method.Name}/return/0`,
					  ]
					: [],
			});

			method.Parameters.forEach((param, i) => {
				this.emit(`globaltype/${type.Name}.${method.Name}/param/${i}`, {
					documentation:
						param.DefaultValue != null && param.DefaultValue != ""
							? `${param.Name}: ${param.Type} = ${param.DefaultValue}`
							: `${param.Name}: ${param.Type}${
									param.IsOptional ? "?" : ""
							  }`,
				});
			});

			if (hasReturnType) {
				this.emit(`globaltype/${type.Name}.${method.Name}/return/0`, {
					documentation: method.ReturnType!,
				});
			}
		}
	}
}
