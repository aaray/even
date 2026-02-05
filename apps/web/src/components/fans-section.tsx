"use client";

import { type TimeRange, useFans } from "@/hooks/use-api";
import { useLanguage } from "@/i18n/provider";
import { formatChange, formatNumber } from "@even/shared";
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
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SendUpdateDialog } from "./send-update-dialog";

const TIME_RANGES: TimeRange[] = ["7d", "30d", "90d", "1y"];

export function FansSection() {
	const t = useTranslations();
	const { intlLocale } = useLanguage();
	const [range, setRange] = useState<TimeRange>("30d");
	const [dialogOpen, setDialogOpen] = useState(false);

	const { data, isLoading, isError, refetch } = useFans(range);

	if (isError) {
		return (
			<section data-testid="fans-section" className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">{t("fans.title")}</h2>
				</div>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12 gap-4">
						<p className="text-muted-foreground">{t("fans.error")}</p>
						<Button onClick={() => refetch()}>{t("common.retry")}</Button>
					</CardContent>
				</Card>
			</section>
		);
	}

	if (isLoading) {
		return <FansSectionSkeleton />;
	}

	if (!data) {
		return null;
	}

	const { summary, topLocations } = data;

	// Transform time series data for chart
	const chartData = data.data.map((point) => ({
		date: new Date(point.date).toLocaleDateString(intlLocale, {
			month: "short",
			day: "numeric",
		}),
		fans: point.totalFans,
		newFans: point.newFans,
	}));

	return (
		<section data-testid="fans-section" className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<h2 className="text-2xl font-bold">{t("fans.title")}</h2>
				<div className="flex items-center gap-4">
					<Tabs value={range} onValueChange={(v) => setRange(v as TimeRange)}>
						<TabsList>
							{TIME_RANGES.map((r) => (
								<TabsTrigger key={r} value={r}>
									{t(`range.${r}`)}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Button onClick={() => setDialogOpen(true)}>{t("fans.sendUpdate")}</Button>
				</div>
			</div>

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<StatCard
					label={t("fans.totalFans")}
					value={formatNumber(summary.totalFans, intlLocale)}
					change={formatChange(summary.changePercent, intlLocale)}
					changeType={summary.changePercent >= 0 ? "positive" : "negative"}
				/>
				<StatCard
					label={t("fans.newFans")}
					value={formatNumber(summary.newFansInPeriod, intlLocale)}
					change={t("fans.inLast", { range: t(`range.${range}`) })}
					changeType="neutral"
				/>
				<StatCard
					label={t("fans.repeatBuyers")}
					value={formatNumber(summary.repeatBuyers, intlLocale)}
					change={t("fans.loyalFans")}
					changeType="positive"
				/>
				<StatCard
					label={t("fans.emailSubscribers")}
					value={formatNumber(summary.emailSubscribers, intlLocale)}
					change={t("fans.reachable")}
					changeType="positive"
				/>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				{/* Fan Growth Chart */}
				<Card>
					<CardHeader>
						<CardTitle>{t("fans.fanGrowth")}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[250px]">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
									<defs>
										<linearGradient id="colorFans" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
											<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
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
										tickFormatter={(value) => formatNumber(value, intlLocale)}
									/>
									<Tooltip
										content={<FanTooltip intlLocale={intlLocale} />}
										cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
									/>
									<Area
										type="monotone"
										dataKey="fans"
										name={t("fans.totalFans")}
										stroke="hsl(var(--primary))"
										fill="url(#colorFans)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Top Locations */}
				<Card>
					<CardHeader>
						<CardTitle>{t("fans.topLocations")}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{topLocations.map((location, index) => (
								<div key={location.location} className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="flex items-center gap-2">
											<span className="w-5 text-muted-foreground">{index + 1}.</span>
											{location.location}
										</span>
										<span className="font-medium">
											{formatNumber(location.fanCount, intlLocale)} ({location.percentage}%)
										</span>
									</div>
									<div className="h-2 rounded-full bg-secondary overflow-hidden">
										<div
											className="h-full bg-primary transition-all"
											style={{ width: `${location.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<SendUpdateDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				totalFans={summary.totalFans}
			/>
		</section>
	);
}

function FanTooltip({
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
						<span className="font-medium">{formatNumber(p.value, intlLocale)}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function FansSectionSkeleton() {
	return (
		<section data-testid="fans-section" className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<Skeleton className="h-8 w-48" />
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-48" />
					<Skeleton className="h-10 w-28" />
				</div>
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

			<div className="grid gap-4 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[250px] w-full" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<div className="flex justify-between">
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-4 w-20" />
									</div>
									<Skeleton className="h-2 w-full" />
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
