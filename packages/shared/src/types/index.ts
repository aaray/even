// Re-export all types from schemas
export type { Artist } from "../schemas/artist.js";
export type {
	Product,
	ProductCategory,
	MusicProduct,
	VideoProduct,
	MerchProduct,
	ExperienceProduct,
	ProductsResponse,
} from "../schemas/product.js";
export type {
	TimeRange,
	CategoryBreakdown,
	EarningsDataPoint,
	EarningsSummary,
	EarningsResponse,
} from "../schemas/earnings.js";
export type {
	FanDataPoint,
	FanLocation,
	FansSummary,
	FansResponse,
} from "../schemas/fans.js";
export type { ApiError } from "../schemas/api-error.js";
