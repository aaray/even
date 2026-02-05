"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";

interface DeprecationBannerProps {
	/**
	 * The date when this content was deprecated
	 */
	since?: string;

	/**
	 * Optional link to the replacement content
	 */
	replacementUrl?: string;

	/**
	 * Label for the replacement link
	 */
	replacementLabel?: string;

	/**
	 * Additional message to display
	 */
	message?: string;

	/**
	 * Type of deprecation
	 * - 'deprecated': Content is outdated but not replaced
	 * - 'superseded': Content has been replaced by newer content
	 * - 'removed': Feature/API has been removed
	 */
	type?: "deprecated" | "superseded" | "removed";
}

const bannerStyles = {
	deprecated: {
		bg: "bg-yellow-500/10",
		border: "border-yellow-500/30",
		icon: "text-yellow-400",
		title: "text-yellow-300",
	},
	superseded: {
		bg: "bg-orange-500/10",
		border: "border-orange-500/30",
		icon: "text-orange-400",
		title: "text-orange-300",
	},
	removed: {
		bg: "bg-red-500/10",
		border: "border-red-500/30",
		icon: "text-red-400",
		title: "text-red-300",
	},
};

const titles = {
	deprecated: "Deprecated",
	superseded: "Superseded",
	removed: "Removed",
};

export function DeprecationBanner({
	since,
	replacementUrl,
	replacementLabel,
	message,
	type = "deprecated",
}: DeprecationBannerProps) {
	const styles = bannerStyles[type];
	const title = titles[type];

	return (
		<div className={`my-6 rounded-lg border ${styles.border} ${styles.bg} p-4`} role="alert">
			<div className="flex items-start gap-3">
				<AlertTriangle className={`h-5 w-5 ${styles.icon} flex-shrink-0 mt-0.5`} />
				<div className="flex-1">
					<h4 className={`font-semibold ${styles.title}`}>
						{title}
						{since && <span className="font-normal text-zinc-400"> (since {since})</span>}
					</h4>

					{message && <p className="mt-1 text-sm text-zinc-300">{message}</p>}

					{!message && type === "deprecated" && (
						<p className="mt-1 text-sm text-zinc-300">
							This content is outdated and may not reflect current best practices.
						</p>
					)}

					{!message && type === "superseded" && (
						<p className="mt-1 text-sm text-zinc-300">
							This content has been replaced with updated documentation.
						</p>
					)}

					{!message && type === "removed" && (
						<p className="mt-1 text-sm text-zinc-300">
							This feature or API has been removed and is no longer available.
						</p>
					)}

					{replacementUrl && (
						<a
							href={replacementUrl}
							className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
						>
							{replacementLabel || "View replacement"}
							<ArrowRight className="h-4 w-4" />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
