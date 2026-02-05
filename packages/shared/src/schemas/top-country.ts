import { z } from "zod";

/**
 * Represents geographic listener distribution data.
 */
export const TopCountrySchema = z.object({
	country: z.string().min(1).max(100),
	percentage: z.number().min(0).max(100),
	listeners: z.number().int().nonnegative(),
});

export type TopCountry = z.infer<typeof TopCountrySchema>;
