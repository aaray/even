import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton.js";

const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "h-4 w-[200px]",
	},
};

export const Circle: Story = {
	args: {
		className: "h-12 w-12 rounded-full",
	},
};

export const Card: Story = {
	render: () => (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	),
};

export const ProfileLoading: Story = {
	render: () => (
		<div className="space-y-4 w-[300px]">
			<div className="flex items-center gap-4">
				<Skeleton className="h-16 w-16 rounded-full" />
				<div className="space-y-2 flex-1">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-4 w-full" />
				</div>
			</div>
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
		</div>
	),
};

export const KPICardsLoading: Story = {
	render: () => (
		<div className="grid grid-cols-2 gap-4 w-[500px]">
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className="rounded-2xl border border-border bg-card p-6">
					<div className="flex items-start justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-8 w-28" />
						</div>
						<Skeleton className="h-10 w-10 rounded-lg" />
					</div>
				</div>
			))}
		</div>
	),
};
