import { z } from "zod";

export const ProductCategorySchema = z.enum(["music", "video", "merch", "experience"]);
export type ProductCategory = z.infer<typeof ProductCategorySchema>;

const BaseProductSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1).max(200),
	imageUrl: z.string().url(),
	listingDate: z.string().datetime(),
	price: z.number().int().nonnegative(),
	totalEarnings: z.number().int().nonnegative(),
	unitsSold: z.number().int().nonnegative(),
});

export const MusicProductSchema = BaseProductSchema.extend({
	category: z.literal("music"),
	releaseType: z.enum(["single", "ep", "album"]),
	trackCount: z.number().int().positive(),
	streams: z.number().int().nonnegative(),
});

export const VideoProductSchema = BaseProductSchema.extend({
	category: z.literal("video"),
	duration: z.number().int().positive(),
	viewCount: z.number().int().nonnegative(),
});

export const MerchProductSchema = BaseProductSchema.extend({
	category: z.literal("merch"),
	variant: z.string().optional(),
	inventory: z.number().int().nonnegative(),
});

export const ExperienceProductSchema = BaseProductSchema.extend({
	category: z.literal("experience"),
	eventDate: z.string().datetime(),
	capacity: z.number().int().positive(),
	attendees: z.number().int().nonnegative(),
});

export const ProductSchema = z.discriminatedUnion("category", [
	MusicProductSchema,
	VideoProductSchema,
	MerchProductSchema,
	ExperienceProductSchema,
]);

export type MusicProduct = z.infer<typeof MusicProductSchema>;
export type VideoProduct = z.infer<typeof VideoProductSchema>;
export type MerchProduct = z.infer<typeof MerchProductSchema>;
export type ExperienceProduct = z.infer<typeof ExperienceProductSchema>;
export type Product = z.infer<typeof ProductSchema>;

export const ProductsResponseSchema = z.object({
	products: z.array(ProductSchema),
	total: z.number().int().nonnegative(),
});

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
