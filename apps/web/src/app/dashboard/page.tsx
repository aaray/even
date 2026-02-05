"use client";

import { ArtistHeader } from "@/components/artist-header";
import { EarningsAnalytics } from "@/components/earnings-analytics";
import { EngagementMetrics } from "@/components/engagement-metrics";
import { FanActivityFeed } from "@/components/fan-activity-feed";
import { FansSection } from "@/components/fans-section";
import { KpiCards } from "@/components/kpi-cards";
import { ProductsGrid } from "@/components/products-grid";
import { ReleasesSection } from "@/components/releases-section";
import { useArtist } from "@/hooks/use-api";
import { Button } from "@even/ui";

export default function DashboardPage() {
	const { data: artist, isLoading, isError, refetch } = useArtist();

	if (isError) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
					<p className="text-muted-foreground text-lg">Failed to load dashboard data</p>
					<Button onClick={() => refetch()}>Retry</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 space-y-8">
			<ArtistHeader artist={artist} isLoading={isLoading} />
			<KpiCards artist={artist} isLoading={isLoading} />

			{/* Analytics + Activity Row */}
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<EarningsAnalytics />
				</div>
				<div>
					<FanActivityFeed />
				</div>
			</div>

			<ReleasesSection />
			<EngagementMetrics />
			<ProductsGrid />
			<FansSection />
		</div>
	);
}
