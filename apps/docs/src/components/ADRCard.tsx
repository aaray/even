import Link from "next/link";
import { ADRStatusBadge } from "./ADRStatusBadge";
import type { ADRStatus } from "@even/shared";

interface ADRCardProps {
	number: number;
	title: string;
	description: string;
	status: ADRStatus;
	date: string;
	href: string;
	tags?: string[];
}

/**
 * Card component for displaying ADR summary in the index.
 */
export function ADRCard({
	number,
	title,
	description,
	status,
	date,
	href,
	tags = [],
}: ADRCardProps) {
	const formattedNumber = number.toString().padStart(3, "0");

	return (
		<Link
			href={href}
			className="block p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-purple-500/50 transition-colors group"
			data-testid="adr-card"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<span className="text-zinc-500 font-mono text-sm">ADR-{formattedNumber}</span>
						<ADRStatusBadge status={status} />
					</div>
					<h3 className="font-semibold text-zinc-100 group-hover:text-purple-400 transition-colors truncate">
						{title}
					</h3>
					<p className="text-sm text-zinc-400 mt-1 line-clamp-2">{description}</p>
					{tags.length > 0 && (
						<div className="flex flex-wrap gap-1 mt-2">
							{tags.map((tag) => (
								<span key={tag} className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded">
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
				<time className="text-xs text-zinc-500 whitespace-nowrap">{date}</time>
			</div>
		</Link>
	);
}

export default ADRCard;
