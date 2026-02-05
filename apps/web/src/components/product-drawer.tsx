"use client";

import { useLanguage } from "@/i18n/provider";
import type {
	ExperienceProduct,
	MerchProduct,
	MusicProduct,
	Product,
	VideoProduct,
} from "@even/shared";
import { formatCurrency, formatDate, formatNumber } from "@even/shared";
import { Badge, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@even/ui";
import { useTranslations } from "next-intl";

interface ProductDrawerProps {
	product: Product | null;
	open: boolean;
	onClose: () => void;
}

export function ProductDrawer({ product, open, onClose }: ProductDrawerProps) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	if (!product) return null;

	return (
		<Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<SheetContent className="w-full sm:max-w-md overflow-y-auto">
				<SheetHeader>
					<div className="flex items-start gap-2">
						<SheetTitle className="flex-1">{product.title}</SheetTitle>
						<Badge variant={product.category}>{t(`category.${product.category}`)}</Badge>
					</div>
					<SheetDescription>
						{t("product.listedOn", { date: formatDate(product.listingDate, "long", intlLocale) })}
					</SheetDescription>
				</SheetHeader>

				<div className="mt-6 space-y-6">
					{/* Product Image */}
					<div className="aspect-square rounded-lg overflow-hidden">
						<img
							src={product.imageUrl}
							alt={product.title}
							className="object-cover w-full h-full"
						/>
					</div>

					{/* Earnings Summary */}
					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-lg bg-secondary/50 p-4">
							<p className="text-sm text-muted-foreground">{t("product.totalEarnings")}</p>
							<p className="text-2xl font-bold">
								{formatCurrency(product.totalEarnings, "USD", intlLocale)}
							</p>
						</div>
						<div className="rounded-lg bg-secondary/50 p-4">
							<p className="text-sm text-muted-foreground">{t("product.unitsSold")}</p>
							<p className="text-2xl font-bold">{formatNumber(product.unitsSold, intlLocale)}</p>
						</div>
					</div>

					{/* Price */}
					<div className="rounded-lg border border-border p-4">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">{t("product.price")}</span>
							<span className="text-xl font-bold">
								{formatCurrency(product.price, "USD", intlLocale)}
							</span>
						</div>
					</div>

					{/* Category-specific details */}
					<div className="space-y-3">
						<h4 className="font-semibold">{t("product.details")}</h4>
						<CategoryDetails product={product} />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function CategoryDetails({ product }: { product: Product }) {
	switch (product.category) {
		case "music":
			return <MusicDetails product={product} />;
		case "video":
			return <VideoDetails product={product} />;
		case "merch":
			return <MerchDetails product={product} />;
		case "experience":
			return <ExperienceDetails product={product} />;
	}
}

function MusicDetails({ product }: { product: MusicProduct }) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	return (
		<div className="grid gap-2 text-sm">
			<DetailRow label={t("product.releaseType")} value={product.releaseType} />
			<DetailRow label={t("product.trackCount")} value={product.trackCount.toString()} />
			<DetailRow label={t("product.streams")} value={formatNumber(product.streams, intlLocale)} />
		</div>
	);
}

function VideoDetails({ product }: { product: VideoProduct }) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	const minutes = Math.floor(product.duration / 60);
	const seconds = product.duration % 60;
	const durationStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

	return (
		<div className="grid gap-2 text-sm">
			<DetailRow label={t("product.duration")} value={durationStr} />
			<DetailRow label={t("product.views")} value={formatNumber(product.viewCount, intlLocale)} />
		</div>
	);
}

function MerchDetails({ product }: { product: MerchProduct }) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	return (
		<div className="grid gap-2 text-sm">
			{product.variant && <DetailRow label={t("product.variant")} value={product.variant} />}
			<DetailRow label={t("product.inStock")} value={formatNumber(product.inventory, intlLocale)} />
		</div>
	);
}

function ExperienceDetails({ product }: { product: ExperienceProduct }) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	return (
		<div className="grid gap-2 text-sm">
			<DetailRow
				label={t("product.eventDate")}
				value={new Date(product.eventDate).toLocaleDateString(intlLocale, {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "2-digit",
				})}
			/>
			<DetailRow label={t("product.capacity")} value={formatNumber(product.capacity, intlLocale)} />
			<DetailRow
				label={t("product.attendees")}
				value={formatNumber(product.attendees, intlLocale)}
			/>
		</div>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between py-2 border-b border-border last:border-0">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium capitalize">{value}</span>
		</div>
	);
}
