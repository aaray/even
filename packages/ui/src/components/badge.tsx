import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../lib/utils.js";

const badgeVariants = cva(
	"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				secondary: "bg-secondary text-secondary-foreground",
				outline: "border border-border text-foreground",
				destructive: "bg-destructive text-destructive-foreground",
				// Semantic variants
				success: "bg-success text-success-foreground",
				warning: "bg-warning text-warning-foreground",
				info: "bg-info text-info-foreground",
				// EVEN category colors
				music: "bg-even-music text-white",
				video: "bg-even-video text-white",
				merch: "bg-even-merch text-white",
				experience: "bg-even-experience text-white",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
