"use client";

import { type TimeRange, useEarnings } from "@/hooks/use-api";
import { useLanguage } from "@/i18n/provider";
import { formatChange, formatCurrency, formatPercent } from "@even/shared";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton,
	StatCard,
	Tabs,
	TabsList,
	TabsTrigger,
} from "@even/ui";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TIME_RANGES: TimeRange[] = ["7d", "30d", "90d", "1y"];

const CATEGORY_COLORS = {
	music: "hsl(270, 70%, 60%)",
	video: "hsl(217, 91%, 60%)",
	merch: "hsl(142, 70%, 45%)",
	experience: "hsl(32, 95%, 55%)",
};

// Animation variants for fade-in (T038)
const fadeInVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

interface CategoryVisibility {
	music: boolean;
	video: boolean;
	merch: boolean;
	experience: boolean;
}

export function EarningsAnalytics() {
	const t = useTranslations();
	const { intlLocale } = useLanguage();
	const [range, setRange] = useState<TimeRange>("30d");
	const [categoryVisibility, setCategoryVisibility] = useState<CategoryVisibility>({
		music: true,
		video: true,
		merch: true,
		experience: true,
	});

	const { data, isLoading, isError, refetch } = useEarnings(range);

	const toggleCategory = (category: keyof CategoryVisibility) => {
		setCategoryVisibility((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	if (isError) {
		return (
			<section data-testid="earnings-section" className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">{t("earnings.title")}</h2>
				</div>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12 gap-4">
						<p className="text-muted-foreground">{t("earnings.error")}</p>
						<Button onClick={() => refetch()}>{t("common.retry")}</Button>
					</CardContent>
				</Card>
			</section>
		);
	}

	if (isLoading) {
		return <EarningsAnalyticsSkeleton />;
	}

	if (!data) {
		return null;
	}

	const { summary } = data;

	// Transform time series data for chart with category breakdown
	const chartData = data.data.map((point) => {
		const total = point.grossRevenue;
		return {
			date: new Date(point.date).toLocaleDateString(intlLocale, {
				month: "short",
				day: "numeric",
			}),
			music: categoryVisibility.music ? point.byCategory.music : 0,
			video: categoryVisibility.video ? point.byCategory.video : 0,
			merch: categoryVisibility.merch ? point.byCategory.merch : 0,
			experience: categoryVisibility.experience ? point.byCategory.experience : 0,
			total,
		};
	});

	const categoryNames = {
		music: t("category.music"),
		video: t("category.video"),
		merch: t("category.merch"),
		experience: t("category.experience"),
	} as const;

	return (
		<motion.section
			data-testid="earnings-section"
			className="space-y-6"
			variants={fadeInVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<h2 className="text-2xl font-bold">{t("earnings.title")}</h2>
				<Tabs value={range} onValueChange={(v) => setRange(v as TimeRange)}>
					<TabsList>
						{TIME_RANGES.map((r) => (
							<TabsTrigger key={r} value={r}>
								{t(`range.${r}`)}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<StatCard
					label={t("earnings.totalEarnings")}
					value={formatCurrency(summary.totalGross, "USD", intlLocale)}
					change={formatChange(summary.changePercent, intlLocale)}
					changeType={summary.changePercent >= 0 ? "positive" : "negative"}
					className="glass-card"
				/>
				<StatCard
					label={t("earnings.yourCut")}
					value={formatCurrency(summary.totalArtistCut, "USD", intlLocale)}
					change={t("earnings.retained", { percent: 87 })}
					changeType="positive"
					className="glass-card"
				/>
				<StatCard
					label={t("earnings.platformFee")}
					value={formatCurrency(summary.totalPlatformFee, "USD", intlLocale)}
					change={t("earnings.toEven", { percent: 13 })}
					changeType="neutral"
					className="glass-card"
				/>
				<StatCard
					label={t("earnings.revenueRetained")}
					value={formatPercent(summary.revenueRetainedPercent, 0, intlLocale)}
					change={t("kpi.vsIndustryAvg")}
					changeType="positive"
					className="glass-card"
				/>
			</div>

			{/* Chart Card - with glass-card styling (T033) */}
			<Card className="glass-card">
				<CardHeader>
					<CardTitle>{t("earnings.revenueOverTime")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
								<defs>
									<linearGradient id="colorMusic" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor={CATEGORY_COLORS.music} stopOpacity={0.8} />
										<stop offset="95%" stopColor={CATEGORY_COLORS.music} stopOpacity={0.1} />
									</linearGradient>
									<linearGradient id="colorVideo" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor={CATEGORY_COLORS.video} stopOpacity={0.8} />
										<stop offset="95%" stopColor={CATEGORY_COLORS.video} stopOpacity={0.1} />
									</linearGradient>
									<linearGradient id="colorMerch" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor={CATEGORY_COLORS.merch} stopOpacity={0.8} />
										<stop offset="95%" stopColor={CATEGORY_COLORS.merch} stopOpacity={0.1} />
									</linearGradient>
									<linearGradient id="colorExperience" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor={CATEGORY_COLORS.experience} stopOpacity={0.8} />
										<stop offset="95%" stopColor={CATEGORY_COLORS.experience} stopOpacity={0.1} />
									</linearGradient>
								</defs>
								<XAxis
									dataKey="date"
									stroke="hsl(var(--muted-foreground))"
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									stroke="hsl(var(--muted-foreground))"
									fontSize={12}
									tickLine={false}
									axisLine={false}
									tickFormatter={(value) => formatCurrency(value * 100, "USD", intlLocale)}
								/>
								<Tooltip
									content={<CustomTooltip intlLocale={intlLocale} />}
									cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
								/>
								<Legend
									onClick={(e) => {
										if (e.dataKey) {
											toggleCategory(e.dataKey as keyof CategoryVisibility);
										}
									}}
									wrapperStyle={{ cursor: "pointer" }}
								/>
								{categoryVisibility.music && (
									<Area
										type="monotone"
										dataKey="music"
										name={categoryNames.music}
										stackId="1"
										stroke={CATEGORY_COLORS.music}
										fill="url(#colorMusic)"
									/>
								)}
								{categoryVisibility.video && (
									<Area
										type="monotone"
										dataKey="video"
										name={categoryNames.video}
										stackId="1"
										stroke={CATEGORY_COLORS.video}
										fill="url(#colorVideo)"
									/>
								)}
								{categoryVisibility.merch && (
									<Area
										type="monotone"
										dataKey="merch"
										name={categoryNames.merch}
										stackId="1"
										stroke={CATEGORY_COLORS.merch}
										fill="url(#colorMerch)"
									/>
								)}
								{categoryVisibility.experience && (
									<Area
										type="monotone"
										dataKey="experience"
										name={categoryNames.experience}
										stackId="1"
										stroke={CATEGORY_COLORS.experience}
										fill="url(#colorExperience)"
									/>
								)}
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Category Breakdown */}
			<Card className="glass-card">
				<CardHeader>
					<CardTitle>{t("earnings.categoryBreakdown")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{(["music", "video", "merch", "experience"] as const).map((category) => {
							const amount = summary.byCategory[category];
							const percentage =
								summary.totalGross > 0 ? Math.round((amount / summary.totalGross) * 100) : 0;
							return (
								<div
									key={category}
									className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
								>
									<div
										className="w-3 h-3 rounded-full"
										style={{ backgroundColor: CATEGORY_COLORS[category] }}
									/>
									<div className="flex-1">
										<p className="text-sm font-medium">{categoryNames[category]}</p>
										<p className="text-lg font-bold">{formatCurrency(amount, "USD", intlLocale)}</p>
									</div>
									<span className="text-sm text-muted-foreground">{percentage}%</span>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</motion.section>
	);
}

function CustomTooltip({
	active,
	payload,
	label,
	intlLocale,
}: {
	active?: boolean;
	payload?: Array<{ dataKey: string; value: number; color: string; name: string }>;
	label?: string;
	intlLocale: string;
}) {
	if (!active || !payload || !payload.length) {
		return null;
	}

	const total = payload.reduce((sum: number, p) => sum + (p.value || 0), 0);

	return (
		<div className="rounded-lg border border-border bg-card p-3 shadow-md">
			<p className="font-medium mb-2">{label}</p>
			<div className="space-y-1">
				{payload.map((p) => (
					<div key={p.dataKey} className="flex items-center justify-between gap-4 text-sm">
						<span className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
							{p.name}
						</span>
						<span className="font-medium">{formatCurrency(p.value * 100, "USD", intlLocale)}</span>
					</div>
				))}
				<div className="border-t border-border pt-1 mt-1 flex justify-between font-medium">
					<span>Total</span>
					<span>{formatCurrency(total * 100, "USD", intlLocale)}</span>
				</div>
			</div>
		</div>
	);
}

function EarningsAnalyticsSkeleton() {
	return (
		<section data-testid="earnings-section" className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-10 w-48" />
			</div>

			<div className="grid gap-4 md:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="rounded-2xl border border-border bg-card p-6">
						<div className="space-y-3">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-4 w-20" />
						</div>
					</div>
				))}
			</div>

			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-40" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-[300px] w-full" />
				</CardContent>
			</Card>
		</section>
	);
}
