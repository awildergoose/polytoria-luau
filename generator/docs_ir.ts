import { z } from "zod";

const ParamSchema = z
	.object({
		name: z.string(),
		documentation: z.string(),
	})
	.strict();
const EntrySchema = z
	.object({
		documentation: z.string(),
		params: z.array(ParamSchema).optional(),
		returns: z.array(z.string()).optional(),
		keys: z.record(z.string(), z.string()).optional(),
		learn_more_link: z.url().optional(),
		code_sample: z.string().optional(),
	})
	.strict();

export const DocumentationSchema = z.record(z.string(), EntrySchema);

export type Documentation = z.infer<typeof DocumentationSchema>;
export type DocumentationEntry = z.infer<typeof EntrySchema>;
