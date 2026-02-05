"use client";

import { useLanguage } from "@/i18n/provider";
import { formatChange, formatCompactNumber, formatCurrency, formatPercent } from "@even/shared";
import type { Artist } from "@even/shared";
import { Skeleton, StatCard } from "@even/ui";
import { motion } from "framer-motion";
import { DollarSign, Minus, Percent, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";

interface KpiCardsProps {
	artist: Artist | undefined;
	isLoading: boolean;
}

// Animation variants for staggered entrance (T029)
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

// Helper to determine trend direction and color (T027)
function getTrendInfo(value: number): {
	type: "positive" | "negative" | "neutral";
	icon: typeof TrendingUp;
} {
	if (value > 0) return { type: "positive", icon: TrendingUp };
	if (value < 0) return { type: "negative", icon: TrendingDown };
	return { type: "neutral", icon: Minus };
}

export function KpiCards({ artist, isLoading }: KpiCardsProps) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();

	// Show skeleton during loading (T030)
	if (isLoading) {
		return <KpiCardsSkeleton />;
	}

	if (!artist) {
		return null;
	}

	// Mock trend data (would come from API in real implementation) (T028)
	const trends = {
		earnings: 12.5, // +12.5%
		revenueRetained: 15, // vs industry average
		fans: 8.3, // +8.3%
		engagement: -2.1, // -2.1%
	};

	const earningsTrend = getTrendInfo(trends.earnings);
	const fansTrend = getTrendInfo(trends.fans);
	const engagementTrend = getTrendInfo(trends.engagement);

	return (
		<motion.div
			className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* T026: Total Revenue / Earnings */}
			<motion.div variants={itemVariants}>
				<StatCard
					data-testid="kpi-earnings"
					label={t("kpi.totalEarnings")}
					value={formatCurrency(artist.totalEarnings * 100, "USD", intlLocale)}
					change={formatChange(trends.earnings, intlLocale)}
					changeType={earningsTrend.type}
					icon={<DollarSign className="h-5 w-5" />}
					className="glass-card"
				/>
			</motion.div>

			{/* Revenue Retained % */}
			<motion.div variants={itemVariants}>
				<StatCard
					data-testid="kpi-revenue-retained"
					label={t("kpi.revenueRetained")}
					value={formatPercent(artist.revenueRetainedPercent, 0, intlLocale)}
					change={t("kpi.vsIndustryAvg")}
					changeType="positive"
					icon={<Percent className="h-5 w-5" />}
					className="glass-card"
				/>
			</motion.div>

			{/* Total Fans / Followers */}
			<motion.div variants={itemVariants}>
				<StatCard
					data-testid="kpi-fans"
					label={t("kpi.totalFans")}
					value={formatCompactNumber(artist.totalFans, intlLocale)}
					change={formatChange(trends.fans, intlLocale)}
					changeType={fansTrend.type}
					icon={<Users className="h-5 w-5" />}
					className="glass-card"
				/>
			</motion.div>

			{/* Engagement Rate */}
			<motion.div variants={itemVariants}>
				<StatCard
					data-testid="kpi-engagement"
					label={t("kpi.engagementRate")}
					value={formatPercent(artist.engagementRate, 1, intlLocale)}
					change={formatChange(trends.engagement, intlLocale)}
					changeType={engagementTrend.type}
					icon={<TrendingUp className="h-5 w-5" />}
					className="glass-card"
				/>
			</motion.div>
		</motion.div>
	);
}

// Skeleton loading state (T030)
function KpiCardsSkeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6">
					<div className="flex items-start justify-between">
						<div className="space-y-3">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-4 w-16" />
						</div>
						<Skeleton className="h-10 w-10 rounded-lg" />
					</div>
				</div>
			))}
		</div>
	);
}
