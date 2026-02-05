import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "./stat-card.js";

const meta = {
	title: "Components/StatCard",
	component: StatCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		changeType: {
			control: "select",
			options: ["positive", "negative", "neutral"],
		},
	},
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Total Revenue",
		value: "$45,231",
	},
};

export const WithPositiveChange: Story = {
	args: {
		label: "Total Revenue",
		value: "$45,231",
		change: "+12.5% from last month",
		changeType: "positive",
	},
};

export const WithNegativeChange: Story = {
	args: {
		label: "Expenses",
		value: "$12,543",
		change: "-3.2% from last month",
		changeType: "negative",
	},
};

export const WithIcon: Story = {
	args: {
		label: "Total Fans",
		value: "12,847",
		icon: (
			<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
		),
	},
};

export const FullExample: Story = {
	args: {
		label: "Revenue Retained",
		value: "87%",
		change: "vs. industry avg 70%",
		changeType: "positive",
		icon: (
			<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
		),
	},
};
