import type { ReactNode } from "react";
import { cn } from "../lib/utils.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card.js";
import { Skeleton } from "./skeleton.js";

export interface ChartContainerProps {
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
	isLoading?: boolean;
	isEmpty?: boolean;
	emptyMessage?: string;
}

export function ChartContainer({
	title,
	description,
	children,
	className,
	isLoading = false,
	isEmpty = false,
	emptyMessage = "No data available",
}: ChartContainerProps) {
	return (
		<Card className={cn("card-elevated", className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				{isLoading ? <ChartSkeleton /> : isEmpty ? <ChartEmpty message={emptyMessage} /> : children}
			</CardContent>
		</Card>
	);
}

function ChartSkeleton() {
	return (
		<div className="flex h-[300px] w-full items-end justify-around gap-2 p-4">
			<Skeleton className="h-[40%] w-12" />
			<Skeleton className="h-[60%] w-12" />
			<Skeleton className="h-[80%] w-12" />
			<Skeleton className="h-[50%] w-12" />
			<Skeleton className="h-[70%] w-12" />
			<Skeleton className="h-[45%] w-12" />
			<Skeleton className="h-[90%] w-12" />
			<Skeleton className="h-[55%] w-12" />
		</div>
	);
}

function ChartEmpty({ message }: { message: string }) {
	return (
		<div className="flex h-[300px] w-full items-center justify-center">
			<p className="text-muted-foreground">{message}</p>
		</div>
	);
}
