"use client";

import { useLanguage } from "@/i18n/provider";
import type { Product } from "@even/shared";
import { formatCurrency, formatNumber } from "@even/shared";
import { Badge, Card, CardContent } from "@even/ui";
import { useTranslations } from "next-intl";

interface ProductCardProps {
	product: Product;
	onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	return (
		<Card
			data-testid="product-card"
			role="button"
			tabIndex={0}
			aria-label={`View details for ${product.title}`}
			className="overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick();
				}
			}}
		>
			<div className="aspect-square relative overflow-hidden">
				<img
					src={product.imageUrl}
					alt={product.title}
					className="object-cover w-full h-full transition-transform hover:scale-105"
				/>
				<div className="absolute top-2 right-2">
					<Badge
						data-testid="product-badge"
						data-category={product.category}
						variant={product.category}
					>
						{t(`category.${product.category}`)}
					</Badge>
				</div>
			</div>
			<CardContent className="p-4">
				<h3 data-testid="product-title" className="font-semibold text-sm truncate mb-1">
					{product.title}
				</h3>
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">
						{formatNumber(product.unitsSold, intlLocale)} {t("products.sold")}
					</span>
					<span className="font-bold text-primary">
						{formatCurrency(product.totalEarnings, "USD", intlLocale)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
