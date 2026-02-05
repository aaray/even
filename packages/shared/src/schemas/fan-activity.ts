import { z } from "zod";

/**
 * Fan activity type enum
 */
export const FanActivityTypeSchema = z.enum(["purchase", "stream", "share", "follow", "comment"]);
export type FanActivityType = z.infer<typeof FanActivityTypeSchema>;

/**
 * Represents a fan interaction event in the activity feed.
 */
export const FanActivitySchema = z.object({
	id: z.string().min(1),
	type: FanActivityTypeSchema,
	user: z.string().min(1).max(50),
	avatar: z.string().url(),
	action: z.string().min(1).max(200),
	timestamp: z.string().datetime(),
});

export type FanActivity = z.infer<typeof FanActivitySchema>;

/**
 * API response for fan-activity endpoint
 */
export const FanActivityResponseSchema = z.object({
	activities: z.array(FanActivitySchema),
});

export type FanActivityResponse = z.infer<typeof FanActivityResponseSchema>;
