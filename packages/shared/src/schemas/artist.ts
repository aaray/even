import { z } from "zod";

export const ArtistSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(100),
	avatarUrl: z.string().url(),
	bio: z.string().max(500),
	verified: z.boolean().optional(),
	totalEarnings: z.number().nonnegative(),
	revenueRetainedPercent: z.number().min(0).max(100),
	totalFans: z.number().int().nonnegative(),
	engagementRate: z.number().min(0).max(100),
	joinedAt: z.string().optional(),
});

export type Artist = z.infer<typeof ArtistSchema>;
