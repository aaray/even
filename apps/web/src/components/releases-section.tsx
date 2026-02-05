"use client";

import { useReleases } from "@/hooks/use-api";
import { Skeleton } from "@even/ui";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ReleaseCard } from "./release-card";

// Animation variants (T048)
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

export function ReleasesSection() {
	const t = useTranslations();
	const { data, isLoading, isError } = useReleases(4);

	// Show skeleton during loading (T049)
	if (isLoading) {
		return <ReleasesSkeleton />;
	}

	// Show empty state if no releases (T050)
	if (isError || !data || data.releases.length === 0) {
		return (
			<section data-testid="releases-section" className="space-y-4">
				<h2 className="text-2xl font-bold">{t("releases.title")}</h2>
				<div className="glass-card p-8 text-center">
					<p className="text-muted-foreground">
						{isError ? t("releases.error") : t("releases.empty")}
					</p>
				</div>
			</section>
		);
	}

	return (
		<motion.section
			data-testid="releases-section"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="space-y-4"
		>
			<motion.div variants={itemVariants} className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">{t("releases.title")}</h2>
				<a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
					{t("releases.viewAll")}
				</a>
			</motion.div>

			{/* Responsive grid layout (T047) */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{data.releases.map((release) => (
					<motion.div key={release.id} variants={itemVariants}>
						<ReleaseCard release={release} />
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}

// Skeleton loading state (T049)
function ReleasesSkeleton() {
	return (
		<section data-testid="releases-section" className="space-y-4">
			<div className="flex items-center justify-between">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-20" />
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="glass-card overflow-hidden">
						<Skeleton className="aspect-square" />
						<div className="p-4 space-y-2">
							<div className="flex items-start justify-between">
								<Skeleton className="h-5 w-3/4" />
								<Skeleton className="h-5 w-12" />
							</div>
							<Skeleton className="h-4 w-1/2" />
							<div className="flex justify-between">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-16" />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
