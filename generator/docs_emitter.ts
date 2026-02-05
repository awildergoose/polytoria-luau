import type { Documentation } from "./docs_ir";
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

	emitEnum(enm: IREnum) {
		this.output[`@polytoria/global/Enum.${enm.Name}`] = {
			documentation: enm.Description,
			keys: Object.fromEntries(
				enm.Options.map((option) => [
					option.Name,
					`@polytoria/enum/${enm.Name}.${option.Name}`,
				])
			),
			learn_more_link: DocsEmitter.getEnumDocsUrl(enm.Name),
			code_sample: "",
		};

		for (const option of enm.Options) {
			this.output[`@polytoria/enum/${enm.Name}.${option.Name}`] = {
				documentation: option.Description,
				keys: {},
				learn_more_link: DocsEmitter.getEnumMemberDocsUrl(
					enm.Name,
					option.Name
				),
				code_sample: "",
			};
		}
	}

	emitType(type: IRType) {
		this.output[`@polytoria/globaltype/${type.Name}`] = {
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
		};

		for (const member of [
			...type.Events,
			...type.Methods,
			...type.Properties,
		]) {
			this.output[`@polytoria/globaltype/${type.Name}.${member.Name}`] = {
				documentation: member.Description,
				learn_more_link: DocsEmitter.getTypeMemberDocsUrl(
					type.Name,
					member.Name
				),
				code_sample: "",
			};
		}

		/*
		// TODO impl similar

        "@roblox/globaltype/AudioFlanger.GetConnectedWires/param/0": {
            "documentation": "Imparts a whooshing or sweeping sound on audio streams."
        },
        "@roblox/globaltype/AudioFlanger.GetConnectedWires/param/1": {
            "documentation": ""
        },
        "@roblox/globaltype/AudioFlanger.GetConnectedWires/return/0": {
            "documentation": ""
        },
        "@roblox/globaltype/AudioFlanger.WiringChanged.Connect": {
            "documentation": "Connects the given function to the event and returns an <code>RBXScriptConnection</code> that represents it.",
            "learn_more_link": "https://create.roblox.com/docs/reference/engine/datatypes/RBXScriptSignal#Connect",
            "params": [
            {
                "name": "self",
                "documentation": "@roblox/globaltype/AudioFlanger.WiringChanged.Connect/param/0"
            },
            {
                "name": "func",
                "documentation": "@roblox/globaltype/AudioFlanger.WiringChanged.Connect/param/1"
            }
            ],
            "returns": []
        },
        "@roblox/globaltype/AudioFlanger.WiringChanged.Connect/param/0": {
            "documentation": "An object that runs connected functions upon a specific occurrence."
        },
        "@roblox/globaltype/AudioFlanger.WiringChanged.Connect/param/1": {
            "documentation": ""
        },
        */
	}
}
