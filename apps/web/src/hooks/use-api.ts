"use client";

import { api } from "@/lib/api-client";
import type {
	Artist,
	EarningsResponse,
	FanActivityResponse,
	FansResponse,
	Product,
	ReleasesResponse,
} from "@even/shared";
import { useQuery } from "@tanstack/react-query";

// Query keys for cache management (T022)
export const queryKeys = {
	artist: ["artist"] as const,
	products: (params?: ProductsParams) => ["products", params] as const,
	earnings: (range: TimeRange) => ["earnings", range] as const,
	fans: (range: TimeRange) => ["fans", range] as const,
	releases: (limit?: number) => ["releases", { limit }] as const,
	fanActivity: (limit?: number) => ["fanActivity", { limit }] as const,
};

export type TimeRange = "7d" | "30d" | "90d" | "1y";

interface ProductsParams {
	category?: string | undefined;
	sortBy?: "newest" | "revenue" | "sales" | undefined;
	page?: number | undefined;
	limit?: number | undefined;
}

interface ProductsResponse {
	products: Product[];
	total: number;
	page: number;
	limit: number;
}

// Artist hook
export function useArtist() {
	return useQuery({
		queryKey: queryKeys.artist,
		queryFn: () => api.get<Artist>("/artist"),
	});
}

// Products hook
export function useProducts(params?: ProductsParams) {
	const searchParams = new URLSearchParams();
	if (params?.category) searchParams.set("category", params.category);
	if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
	if (params?.page) searchParams.set("page", String(params.page));
	if (params?.limit) searchParams.set("limit", String(params.limit));

	const queryString = searchParams.toString();
	const endpoint = queryString ? `/products?${queryString}` : "/products";

	return useQuery({
		queryKey: queryKeys.products(params),
		queryFn: () => api.get<ProductsResponse>(endpoint),
	});
}

// Single product hook
export function useProduct(id: string) {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => api.get<Product>(`/products/${id}`),
		enabled: !!id,
	});
}

// Earnings hook
export function useEarnings(range: TimeRange = "30d") {
	return useQuery({
		queryKey: queryKeys.earnings(range),
		queryFn: () => api.get<EarningsResponse>(`/earnings?range=${range}`),
	});
}

// Fans hook
export function useFans(range: TimeRange = "30d") {
	return useQuery({
		queryKey: queryKeys.fans(range),
		queryFn: () => api.get<FansResponse>(`/fans?range=${range}`),
	});
}

// Releases hook (T020)
export function useReleases(limit = 4) {
	return useQuery({
		queryKey: queryKeys.releases(limit),
		queryFn: () => api.get<ReleasesResponse>(`/releases?limit=${limit}`),
	});
}

// Fan activity hook (T021)
export function useFanActivity(limit = 10) {
	return useQuery({
		queryKey: queryKeys.fanActivity(limit),
		queryFn: () => api.get<FanActivityResponse>(`/fan-activity?limit=${limit}`),
	});
}
