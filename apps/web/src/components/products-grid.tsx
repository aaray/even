"use client";

import { useProducts } from "@/hooks/use-api";
import type { Product, ProductCategory } from "@even/shared";
import {
	Button,
	Card,
	CardContent,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Skeleton,
	Tabs,
	TabsList,
	TabsTrigger,
} from "@even/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { ProductDrawer } from "./product-drawer";

type CategoryFilter = "all" | ProductCategory;
type SortOption = "newest" | "revenue" | "sales";

const CATEGORIES: CategoryFilter[] = ["all", "music", "video", "merch", "experience"];
const SORT_OPTIONS: SortOption[] = ["newest", "revenue", "sales"];

export function ProductsGrid() {
	const t = useTranslations();
	const [category, setCategory] = useState<CategoryFilter>("all");
	const [sortBy, setSortBy] = useState<SortOption>("newest");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const { data, isLoading, isError, refetch } = useProducts({
		category: category === "all" ? undefined : category,
		sortBy,
		limit: 12,
	});

	const handleProductClick = (product: Product) => {
		setSelectedProduct(product);
		setDrawerOpen(true);
	};

	const handleCloseDrawer = () => {
		setDrawerOpen(false);
	};

	const getCategoryLabel = (cat: CategoryFilter): string => {
		if (cat === "all") return t("category.all");
		return t(`category.${cat}`);
	};

	const getSortLabel = (sort: SortOption): string => {
		const sortLabels: Record<SortOption, string> = {
			newest: t("sort.newest"),
			revenue: t("sort.bestSelling"),
			sales: t("sort.mostSales"),
		};
		return sortLabels[sort];
	};

	if (isError) {
		return (
			<section data-testid="products-section" className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">{t("products.title")}</h2>
				</div>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12 gap-4">
						<p className="text-muted-foreground">{t("products.error")}</p>
						<Button onClick={() => refetch()}>{t("common.retry")}</Button>
					</CardContent>
				</Card>
			</section>
		);
	}

	if (isLoading) {
		return <ProductsGridSkeleton />;
	}

	const products = data?.products ?? [];

	return (
		<section data-testid="products-section" className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<h2 className="text-2xl font-bold">{t("products.title")}</h2>
				<div className="flex items-center gap-4">
					<Tabs value={category} onValueChange={(v) => setCategory(v as CategoryFilter)}>
						<TabsList>
							{CATEGORIES.map((cat) => (
								<TabsTrigger key={cat} value={cat}>
									{getCategoryLabel(cat)}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
						<SelectTrigger className="w-[140px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{SORT_OPTIONS.map((opt) => (
								<SelectItem key={opt} value={opt}>
									{getSortLabel(opt)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{products.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12 gap-4">
						<p className="text-muted-foreground">
							{category !== "all"
								? t("products.noProductsInCategory", { category: getCategoryLabel(category) })
								: t("products.noProducts")}
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onClick={() => handleProductClick(product)}
						/>
					))}
				</div>
			)}

			<ProductDrawer product={selectedProduct} open={drawerOpen} onClose={handleCloseDrawer} />
		</section>
	);
}

function ProductsGridSkeleton() {
	return (
		<section data-testid="products-section" className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<Skeleton className="h-8 w-48" />
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-96" />
					<Skeleton className="h-10 w-[140px]" />
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
						<Skeleton className="aspect-square" />
						<div className="p-4 space-y-3">
							<Skeleton className="h-4 w-3/4" />
							<div className="flex justify-between">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-20" />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
