import type { ADRStatus } from "@even/shared";

interface ADRStatusBadgeProps {
	status: ADRStatus;
	className?: string;
}

const statusStyles: Record<ADRStatus, { bg: string; text: string; label: string }> = {
	proposed: {
		bg: "bg-yellow-500/20",
		text: "text-yellow-400",
		label: "Proposed",
	},
	accepted: {
		bg: "bg-green-500/20",
		text: "text-green-400",
		label: "Accepted",
	},
	deprecated: {
		bg: "bg-orange-500/20",
		text: "text-orange-400",
		label: "Deprecated",
	},
	superseded: {
		bg: "bg-red-500/20",
		text: "text-red-400",
		label: "Superseded",
	},
};

/**
 * Displays the status of an ADR as a colored badge.
 */
export function ADRStatusBadge({ status, className = "" }: ADRStatusBadgeProps) {
	const style = statusStyles[status];

	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${className}`}
			data-testid="adr-status"
		>
			{style.label}
		</span>
	);
}

export default ADRStatusBadge;
