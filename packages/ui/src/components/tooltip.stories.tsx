import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip.js";

const meta = {
	title: "Components/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>This is a tooltip</p>
			</TooltipContent>
		</Tooltip>
	),
};

export const TopPosition: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Top tooltip</Button>
			</TooltipTrigger>
			<TooltipContent side="top">
				<p>Appears above the trigger</p>
			</TooltipContent>
		</Tooltip>
	),
};

export const BottomPosition: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Bottom tooltip</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom">
				<p>Appears below the trigger</p>
			</TooltipContent>
		</Tooltip>
	),
};

export const LeftPosition: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Left tooltip</Button>
			</TooltipTrigger>
			<TooltipContent side="left">
				<p>Appears to the left</p>
			</TooltipContent>
		</Tooltip>
	),
};

export const RightPosition: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Right tooltip</Button>
			</TooltipTrigger>
			<TooltipContent side="right">
				<p>Appears to the right</p>
			</TooltipContent>
		</Tooltip>
	),
};

export const WithRichContent: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="secondary">Revenue Info</Button>
			</TooltipTrigger>
			<TooltipContent className="max-w-[200px]">
				<div className="space-y-1">
					<p className="font-medium">Revenue Breakdown</p>
					<p className="text-xs text-muted-foreground">
						Your earnings are split 87% to you, 13% to EVEN platform fees.
					</p>
				</div>
			</TooltipContent>
		</Tooltip>
	),
};

export const IconTrigger: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M12 16v-4" />
						<path d="M12 8h.01" />
					</svg>
				</button>
			</TooltipTrigger>
			<TooltipContent>
				<p>More information</p>
			</TooltipContent>
		</Tooltip>
	),
};
