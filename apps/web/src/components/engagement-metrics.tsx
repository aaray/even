"use client";

import { type TimeRange, useFans } from "@/hooks/use-api";
import { formatCompactNumber } from "@even/shared";
import { Card, CardContent, Skeleton } from "@even/ui";
import { motion } from "framer-motion";
import { Activity, Clock, Headphones, MapPin, TrendingDown, TrendingUp, Users } from "lucide-react";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

interface EngagementMetricsProps {
	range?: TimeRange;
}

export function EngagementMetrics({ range = "30d" }: EngagementMetricsProps) {
	const { data, isLoading } = useFans(range);

	if (isLoading) return <EngagementMetricsSkeleton />;

	const summary = data?.summary;
	const topLocations = data?.topLocations ?? [];

	const metrics = [
		{
			label: "Total Followers",
			value: formatCompactNumber(summary?.totalFans ?? 0),
			change: summary?.changePercent ?? 0,
			icon: Users,
		},
		{
			label: "Monthly Listeners",
			value: formatCompactNumber(summary?.monthlyListeners ?? 0),
			change: summary?.monthlyListenersChange ?? 0,
			icon: Headphones,
		},
		{
			label: "Engagement Rate",
			value: `${(summary?.engagementRate ?? 0).toFixed(1)}%`,
			change: summary?.engagementRateChange ?? 0,
			icon: Activity,
		},
		{
			label: "Avg. Stream Time",
			value: `${(summary?.avgStreamTime ?? 0).toFixed(1)}m`,
			change: summary?.avgStreamTimeChange ?? 0,
			icon: Clock,
		},
	];

	return (
		<motion.section
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="space-y-6"
			data-testid="engagement-metrics"
		>
			<motion.h2 variants={itemVariants} className="text-2xl font-bold">
				Fan Engagement
			</motion.h2>

			{/* Metric Cards */}
			<motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{metrics.map((metric) => (
					<motion.div key={metric.label} variants={itemVariants}>
						<MetricCard {...metric} />
					</motion.div>
				))}
			</motion.div>

			{/* Top Locations */}
			<motion.div variants={itemVariants}>
				<TopLocations locations={topLocations} />
			</motion.div>
		</motion.section>
	);
}

interface MetricCardProps {
	label: string;
	value: string;
	change: number;
	icon: React.ElementType;
}

function MetricCard({ label, value, change, icon: Icon }: MetricCardProps) {
	const isPositive = change >= 0;
	const TrendIcon = isPositive ? TrendingUp : TrendingDown;

	return (
		<Card className="glass-card" data-testid="engagement-metric-card">
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<p className="text-sm text-muted-foreground">{label}</p>
						<p className="text-2xl font-bold">{value}</p>
					</div>
					<div className="p-2 rounded-lg bg-primary/10">
						<Icon className="h-5 w-5 text-primary" />
					</div>
				</div>
				<div className="mt-3 flex items-center gap-1">
					<TrendIcon className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"}`} />
					<span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
						{isPositive ? "+" : ""}
						{change.toFixed(1)}%
					</span>
					<span className="text-xs text-muted-foreground ml-1">vs last period</span>
				</div>
			</CardContent>
		</Card>
	);
}

interface TopLocationsProps {
	locations: Array<{
		location: string;
		fanCount: number;
		percentage: number;
	}>;
}

function TopLocations({ locations }: TopLocationsProps) {
	if (locations.length === 0) {
		return (
			<Card className="glass-card" data-testid="top-locations">
				<CardContent className="p-4">
					<div className="flex items-center gap-2 mb-4">
						<MapPin className="h-5 w-5 text-primary" />
						<h3 className="font-semibold">Top Locations</h3>
					</div>
					<p className="text-sm text-muted-foreground">No location data available</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="glass-card" data-testid="top-locations">
			<CardContent className="p-4">
				<div className="flex items-center gap-2 mb-4">
					<MapPin className="h-5 w-5 text-primary" />
					<h3 className="font-semibold">Top Locations</h3>
				</div>
				<div className="space-y-3">
					{locations.map((location) => (
						<div key={location.location} data-testid="country-item">
							<div className="flex items-center justify-between mb-1">
								<span className="text-sm">{location.location}</span>
								<span className="text-sm text-muted-foreground">
									{formatCompactNumber(location.fanCount)} ({location.percentage}%)
								</span>
							</div>
							<div className="h-2 rounded-full bg-muted overflow-hidden">
								<div
									className="h-full bg-primary rounded-full transition-all duration-500"
									style={{ width: `${location.percentage}%` }}
									role="progressbar"
									aria-valuenow={location.percentage}
									aria-valuemin={0}
									aria-valuemax={100}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

function EngagementMetricsSkeleton() {
	return (
		<section className="space-y-6" data-testid="engagement-metrics">
			<Skeleton className="h-8 w-48" />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i} className="glass-card">
						<CardContent className="p-4 animate-pulse">
							<div className="flex items-start justify-between">
								<div className="space-y-2">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-8 w-16" />
								</div>
								<Skeleton className="h-10 w-10 rounded-lg" />
							</div>
							<div className="mt-3 flex items-center gap-2">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-3 w-20" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<Card className="glass-card">
				<CardContent className="p-4 animate-pulse">
					<Skeleton className="h-6 w-32 mb-4" />
					<div className="space-y-3">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i}>
								<div className="flex justify-between mb-1">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-16" />
								</div>
								<Skeleton className="h-2 w-full rounded-full" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
