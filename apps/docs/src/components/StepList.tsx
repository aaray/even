import type { ReactNode } from "react";

interface Step {
	title: string;
	children: ReactNode;
	tip?: string;
	warning?: string;
}

interface StepListProps {
	children: ReactNode;
}

interface StepItemProps extends Step {
	number: number;
}

/**
 * Container for a numbered list of steps.
 */
export function StepList({ children }: StepListProps) {
	return (
		<ol className="space-y-6 my-6 list-none pl-0">
			{children}
		</ol>
	);
}

/**
 * Individual step in a StepList.
 */
export function Step({ number, title, children, tip, warning }: StepItemProps) {
	return (
		<li className="relative pl-12">
			<span className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full font-bold text-sm">
				{number}
			</span>
			<div>
				<h4 className="font-semibold text-zinc-100 mb-2">{title}</h4>
				<div className="text-zinc-300 space-y-2">{children}</div>
				{tip && (
					<div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
						<span className="font-medium text-blue-400">Tip: </span>
						<span className="text-zinc-300">{tip}</span>
					</div>
				)}
				{warning && (
					<div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
						<span className="font-medium text-yellow-400">Warning: </span>
						<span className="text-zinc-300">{warning}</span>
					</div>
				)}
			</div>
		</li>
	);
}

export default StepList;
