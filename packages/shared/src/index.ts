// Schemas
export {
	ArtistSchema,
	type Artist,
} from "./schemas/artist.js";

export {
	ProductCategorySchema,
	ProductSchema,
	MusicProductSchema,
	VideoProductSchema,
	MerchProductSchema,
	ExperienceProductSchema,
	ProductsResponseSchema,
	type ProductCategory,
	type Product,
	type MusicProduct,
	type VideoProduct,
	type MerchProduct,
	type ExperienceProduct,
	type ProductsResponse,
} from "./schemas/product.js";

export {
	TimeRangeSchema,
	CategoryBreakdownSchema,
	EarningsDataPointSchema,
	EarningsSummarySchema,
	EarningsResponseSchema,
	type TimeRange,
	type CategoryBreakdown,
	type EarningsDataPoint,
	type EarningsSummary,
	type EarningsResponse,
} from "./schemas/earnings.js";

export {
	FanDataPointSchema,
	FanLocationSchema,
	FansSummarySchema,
	FansResponseSchema,
	type FanDataPoint,
	type FanLocation,
	type FansSummary,
	type FansResponse,
} from "./schemas/fans.js";

export {
	ApiErrorSchema,
	type ApiError,
} from "./schemas/api-error.js";

export {
	ReleaseTypeSchema,
	ReleaseSchema,
	ReleasesResponseSchema,
	type ReleaseType,
	type Release,
	type ReleasesResponse,
} from "./schemas/release.js";

export {
	FanActivityTypeSchema,
	FanActivitySchema,
	FanActivityResponseSchema,
	type FanActivityType,
	type FanActivity,
	type FanActivityResponse,
} from "./schemas/fan-activity.js";

export {
	TopCountrySchema,
	type TopCountry,
} from "./schemas/top-country.js";

export {
	TrendSchema,
	MetricFormatSchema,
	EngagementMetricSchema,
	EngagementDataSchema,
	type Trend,
	type MetricFormat,
	type EngagementMetric,
	type EngagementData,
} from "./schemas/engagement.js";

// Utilities
export {
	formatCurrency,
	formatCompactNumber,
	formatNumber,
	formatPercent,
	formatDate,
	formatRelativeTime,
	formatChange,
} from "./utils/format.js";
