"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface BreadcrumbItem {
	label: string;
	href: string;
}

const pathLabels: Record<string, string> = {
	architecture: "Architecture",
	components: "Components",
	"data-flow": "Data Flow",
	deployment: "Deployment",
	adr: "ADRs",
	manuals: "User Manuals",
	products: "Products",
	earnings: "Earnings",
	api: "API",
	endpoints: "Endpoints",
};

/**
 * Breadcrumbs component for navigation context.
 * Automatically generates breadcrumb trail from current path.
 */
export function Breadcrumbs() {
	const router = useRouter();

	const breadcrumbs = useMemo(() => {
		const pathParts = router.asPath.split("/").filter(Boolean);
		const items: BreadcrumbItem[] = [{ label: "Docs", href: "/" }];

		let currentPath = "";
		for (const part of pathParts) {
			// Skip hash and query strings
			if (part.startsWith("#") || part.startsWith("?")) {
				continue;
			}

			currentPath += `/${part}`;
			const label = pathLabels[part] || formatLabel(part);
			items.push({ label, href: currentPath });
		}

		return items;
	}, [router.asPath]);

	if (breadcrumbs.length <= 1) {
		return null;
	}

	return (
		<nav aria-label="Breadcrumb" className="mb-4">
			<ol className="flex items-center gap-2 text-sm text-zinc-400">
				{breadcrumbs.map((item, index) => (
					<li key={item.href} className="flex items-center gap-2">
						{index > 0 && (
							<span className="text-zinc-600" aria-hidden="true">
								/
							</span>
						)}
						{index === breadcrumbs.length - 1 ? (
							<span className="text-zinc-200" aria-current="page">
								{item.label}
							</span>
						) : (
							<Link
								href={item.href}
								className="hover:text-purple-400 transition-colors"
							>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}

/**
 * Format a path segment as a human-readable label.
 * Handles kebab-case, numbers, and common abbreviations.
 */
function formatLabel(segment: string): string {
	// Handle ADR numbers (e.g., "001-use-nextra")
	const adrMatch = segment.match(/^(\d{3})-(.+)$/);
	if (adrMatch) {
		return `ADR-${adrMatch[1]}`;
	}

	// Handle kebab-case
	return segment
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export default Breadcrumbs;
