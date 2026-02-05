import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartContainer } from "./chart-container.js";

const meta = {
	title: "Components/ChartContainer",
	component: ChartContainer,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		isLoading: {
			control: "boolean",
		},
		isEmpty: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Revenue Over Time",
		description: "Track your earnings across all categories",
		children: (
			<div className="h-[300px] w-full flex items-center justify-center bg-secondary/20 rounded-lg">
				<span className="text-muted-foreground">Chart would render here</span>
			</div>
		),
	},
};

export const Loading: Story = {
	args: {
		title: "Revenue Over Time",
		description: "Track your earnings across all categories",
		isLoading: true,
		children: null,
	},
};

export const Empty: Story = {
	args: {
		title: "Revenue Over Time",
		description: "Track your earnings across all categories",
		isEmpty: true,
		children: null,
	},
};

export const EmptyCustomMessage: Story = {
	args: {
		title: "Fan Growth",
		isEmpty: true,
		emptyMessage: "Start engaging with fans to see growth data",
		children: null,
	},
};

export const WithoutDescription: Story = {
	args: {
		title: "Category Breakdown",
		children: (
			<div className="h-[300px] w-full flex items-center justify-center bg-secondary/20 rounded-lg">
				<span className="text-muted-foreground">Pie chart would render here</span>
			</div>
		),
	},
};

export const MockBarChart: Story = {
	args: {
		title: "Monthly Earnings",
		description: "Your earnings for the past 6 months",
		children: (
			<div className="flex h-[300px] w-full items-end justify-around gap-4 p-4">
				<div className="flex flex-col items-center gap-2">
					<div className="w-12 bg-primary rounded-t" style={{ height: "40%" }} />
					<span className="text-xs text-muted-foreground">Jan</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="w-12 bg-primary rounded-t" style={{ height: "60%" }} />
					<span className="text-xs text-muted-foreground">Feb</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="w-12 bg-primary rounded-t" style={{ height: "80%" }} />
					<span className="text-xs text-muted-foreground">Mar</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="w-12 bg-primary rounded-t" style={{ height: "50%" }} />
					<span className="text-xs text-muted-foreground">Apr</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="w-12 bg-primary rounded-t" style={{ height: "70%" }} />
					<span className="text-xs text-muted-foreground">May</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="w-12 bg-primary rounded-t" style={{ height: "90%" }} />
					<span className="text-xs text-muted-foreground">Jun</span>
				</div>
			</div>
		),
	},
};
