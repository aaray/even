import { z } from "zod";

/**
 * Release type enum
 */
export const ReleaseTypeSchema = z.enum(["Album", "Single", "EP"]);
export type ReleaseType = z.infer<typeof ReleaseTypeSchema>;

/**
 * Represents a music release (album, single, or EP) with performance metrics.
 */
export const ReleaseSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1).max(100),
	type: ReleaseTypeSchema,
	releaseDate: z.string().datetime(),
	streams: z.number().int().nonnegative(),
	sales: z.number().int().nonnegative(), // Sales amount in cents
	coverArt: z.string().url(),
	featured: z.boolean().optional(),
});

export type Release = z.infer<typeof ReleaseSchema>;

/**
 * API response for releases endpoint
 */
export const ReleasesResponseSchema = z.object({
	releases: z.array(ReleaseSchema),
	total: z.number().int().nonnegative(),
});

export type ReleasesResponse = z.infer<typeof ReleasesResponseSchema>;
