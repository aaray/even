import { z } from "zod";
import { type TopCountry, TopCountrySchema } from "./top-country.js";

/**
 * Engagement trend direction
 */
export const TrendSchema = z.enum(["up", "down", "neutral"]);
export type Trend = z.infer<typeof TrendSchema>;

/**
 * Engagement metric format type
 */
export const MetricFormatSchema = z.enum(["number", "percent", "time"]);
export type MetricFormat = z.infer<typeof MetricFormatSchema>;

/**
 * Extended engagement data for the detailed metrics section.
 */
export const EngagementMetricSchema = z.object({
	metric: z.string().min(1),
	value: z.number().nonnegative(),
	change: z.number(),
	trend: TrendSchema,
	format: MetricFormatSchema,
});

export type EngagementMetric = z.infer<typeof EngagementMetricSchema>;

/**
 * Full engagement data including metrics and geographic data
 */
export const EngagementDataSchema = z.object({
	metrics: z.array(EngagementMetricSchema),
	topCountries: z.array(TopCountrySchema),
});

export type EngagementData = z.infer<typeof EngagementDataSchema>;

export { TopCountrySchema, type TopCountry };
