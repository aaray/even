import { z } from "zod";

export const ApiErrorSchema = z.object({
	code: z.string(),
	message: z.string(),
	timestamp: z.string().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
