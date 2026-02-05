import { z } from "zod";

export const IREnumOptionSchema = z.object({
	Name: z.string(),
	Description: z.string(),
});

export const IREnumSchema = z.object({
	Name: z.string(),
	InternalName: z.string(),
	Options: z.array(IREnumOptionSchema),
	Description: z.string(),
});

export const IRPropertySchema = z.object({
	Name: z.string(),
	Type: z.string(),
	IsAccessibleByScripts: z.boolean(),
	IsReadOnly: z.boolean(),
	IsObsolete: z.boolean(),
	IsStatic: z.boolean(),
	Description: z.string(),
});

export const IRParameterSchema = z.object({
	Name: z.string(),
	Type: z.string(),
	IsOptional: z.boolean(),
	DefaultValue: z.string().nullable(),
});

export const IRMethodSchema = z.object({
	Name: z.string(),
	ReturnType: z.string().optional(),
	Parameters: z.array(IRParameterSchema),
	IsAsync: z.boolean(),
	IsObsolete: z.boolean(),
	IsStatic: z.boolean(),
	Description: z.string(),
});

export const IREventArgumentsSchema = z.object({
	Name: z.string(),
	Type: z.string(),
});

export const IREventSchema = z.object({
	Name: z.string(),
	Arguments: z
		.union([
			IREventArgumentsSchema,
			z.array(IREventArgumentsSchema),
			z.string(),
		])
		.transform((v) => {
			if (v === "" || v === null || v === undefined) return [];
			if (Array.isArray(v)) return v;

			return [v];
		}),
	Description: z.string(),
});

export const IRTypeSchema = z.object({
	Name: z.string(),
	BaseType: z.string().nullable(),
	Properties: z.array(IRPropertySchema),
	Methods: z.array(IRMethodSchema),
	Events: z.array(IREventSchema),
	IsStatic: z.boolean(),
	IsAbstract: z.boolean(),
	IsInstantiatable: z.boolean(),
	StaticAlias: z.string().nullable(),
	Description: z.string(),
});

export const IRSchema = z.object({
	enums: z.array(IREnumSchema),
	types: z.array(IRTypeSchema),
});

export type IREnum = z.infer<typeof IREnumSchema>;
export type IRProperty = z.infer<typeof IRPropertySchema>;
export type IRParameter = z.infer<typeof IRParameterSchema>;
export type IRMethod = z.infer<typeof IRMethodSchema>;
export type IREventArguments = z.infer<typeof IREventArgumentsSchema>;
export type IREvent = z.infer<typeof IREventSchema>;
export type IRType = z.infer<typeof IRTypeSchema>;
export type IR = z.infer<typeof IRSchema>;
