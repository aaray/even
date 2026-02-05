import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils.js";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
	label: string;
	value: string;
	change?: string;
	changeType?: "positive" | "negative" | "neutral";
	icon?: ReactNode;
}

export function StatCard({
	label,
	value,
	change,
	changeType = "neutral",
	icon,
	className,
	...props
}: StatCardProps) {
	return (
		<div
			role="region"
			aria-label={`${label} statistic`}
			className={cn("rounded-2xl border border-border bg-card p-6 card-elevated", className)}
			{...props}
		>
			<div className="flex items-start justify-between">
				<div className="space-y-1">
					<p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
						{label}
					</p>
					<p className="text-3xl font-bold tracking-tight">{value}</p>
				</div>
				{icon && <div className="rounded-lg bg-secondary p-2 text-muted-foreground">{icon}</div>}
			</div>
			{change && (
				<p
					className={cn("mt-2 text-sm font-medium", {
						"text-green-500": changeType === "positive",
						"text-red-500": changeType === "negative",
						"text-muted-foreground": changeType === "neutral",
					})}
				>
					{change}
				</p>
			)}
		</div>
	);
}
