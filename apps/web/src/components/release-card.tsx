"use client";

import { useLanguage } from "@/i18n/provider";
import { formatCompactNumber, formatCurrency, formatDate } from "@even/shared";
import type { Release } from "@even/shared";
import { Badge } from "@even/ui";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Type badge colors (T044)
const typeBadgeColors: Record<Release["type"], string> = {
	Album: "bg-purple-500/20 text-purple-300 border-purple-500/30",
	Single: "bg-blue-500/20 text-blue-300 border-blue-500/30",
	EP: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

interface ReleaseCardProps {
	release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
	const { intlLocale } = useLanguage();

	return (
		<div
			data-testid="release-card"
			className="group relative glass-card overflow-hidden cursor-pointer"
		>
			{/* Cover Art with hover zoom (T042) */}
			<div className="relative aspect-square overflow-hidden">
				<img
					src={release.coverArt}
					alt={release.title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
				/>
				{/* Hover Overlay with play button (T043) */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<motion.button
						initial={{ scale: 0 }}
						whileHover={{ scale: 1.1 }}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
						aria-label={`Play ${release.title}`}
					>
						<Play className="h-6 w-6 text-primary-foreground ml-1" />
					</motion.button>
				</div>
				{/* Featured Badge (T045) */}
				{release.featured && (
					<Badge className="absolute top-2 left-2 bg-gradient-warm text-white border-0">
						Featured
					</Badge>
				)}
			</div>

			{/* Content */}
			<div className="p-4 space-y-2">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-semibold truncate">{release.title}</h3>
					{/* Type badge (T044) */}
					<Badge variant="outline" className={typeBadgeColors[release.type]}>
						{release.type}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">
					{formatDate(release.releaseDate, "medium", intlLocale)}
				</p>
				<div className="flex items-center justify-between text-sm">
					<span>{formatCompactNumber(release.streams, intlLocale)} streams</span>
					<span className="text-primary font-medium">
						{formatCurrency(release.sales, "USD", intlLocale)}
					</span>
				</div>
			</div>
		</div>
	);
}
