import { z } from "zod";
import { TimeRangeSchema } from "./earnings.js";

export const FanDataPointSchema = z.object({
	date: z.string().datetime(),
	totalFans: z.number().int().nonnegative(),
	newFans: z.number().int().nonnegative(),
	repeatBuyers: z.number().int().nonnegative(),
});

export type FanDataPoint = z.infer<typeof FanDataPointSchema>;

export const FanLocationSchema = z.object({
	location: z.string().min(1).max(100),
	fanCount: z.number().int().nonnegative(),
	percentage: z.number().min(0).max(100),
});

export type FanLocation = z.infer<typeof FanLocationSchema>;

export const FansSummarySchema = z.object({
	totalFans: z.number().int().nonnegative(),
	newFansInPeriod: z.number().int().nonnegative(),
	repeatBuyers: z.number().int().nonnegative(),
	emailSubscribers: z.number().int().nonnegative(),
	changePercent: z.number(),
	// Extended engagement metrics
	monthlyListeners: z.number().int().nonnegative().optional(),
	monthlyListenersChange: z.number().optional(),
	engagementRate: z.number().nonnegative().optional(),
	engagementRateChange: z.number().optional(),
	avgStreamTime: z.number().nonnegative().optional(), // in minutes
	avgStreamTimeChange: z.number().optional(),
});

export type FansSummary = z.infer<typeof FansSummarySchema>;

export const FansResponseSchema = z.object({
	range: TimeRangeSchema,
	data: z.array(FanDataPointSchema),
	summary: FansSummarySchema,
	topLocations: z.array(FanLocationSchema).max(5),
});

export type FansResponse = z.infer<typeof FansResponseSchema>;
