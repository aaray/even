import { z } from "zod";

export const TimeRangeSchema = z.enum(["7d", "30d", "90d", "1y"]);
export type TimeRange = z.infer<typeof TimeRangeSchema>;

export const CategoryBreakdownSchema = z.object({
	music: z.number().int().nonnegative(),
	video: z.number().int().nonnegative(),
	merch: z.number().int().nonnegative(),
	experience: z.number().int().nonnegative(),
});

export type CategoryBreakdown = z.infer<typeof CategoryBreakdownSchema>;

export const EarningsDataPointSchema = z.object({
	date: z.string().datetime(),
	grossRevenue: z.number().int().nonnegative(),
	artistCut: z.number().int().nonnegative(),
	platformFee: z.number().int().nonnegative(),
	byCategory: CategoryBreakdownSchema,
});

export type EarningsDataPoint = z.infer<typeof EarningsDataPointSchema>;

export const EarningsSummarySchema = z.object({
	totalGross: z.number().int().nonnegative(),
	totalArtistCut: z.number().int().nonnegative(),
	totalPlatformFee: z.number().int().nonnegative(),
	revenueRetainedPercent: z.number().min(0).max(100),
	averageDaily: z.number().nonnegative(),
	changePercent: z.number(),
	byCategory: CategoryBreakdownSchema,
});

export type EarningsSummary = z.infer<typeof EarningsSummarySchema>;

export const EarningsResponseSchema = z.object({
	range: TimeRangeSchema,
	data: z.array(EarningsDataPointSchema),
	summary: EarningsSummarySchema,
});

export type EarningsResponse = z.infer<typeof EarningsResponseSchema>;
