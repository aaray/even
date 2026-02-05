import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./select.js";

const meta = {
	title: "Components/Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select option" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="option1">Option 1</SelectItem>
				<SelectItem value="option2">Option 2</SelectItem>
				<SelectItem value="option3">Option 3</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const SortByRevenue: Story = {
	render: () => (
		<Select defaultValue="revenue">
			<SelectTrigger className="w-[140px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="newest">Newest</SelectItem>
				<SelectItem value="revenue">Best Selling</SelectItem>
				<SelectItem value="sales">Most Sales</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const TimeRange: Story = {
	render: () => (
		<Select defaultValue="30d">
			<SelectTrigger className="w-[100px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="7d">7 days</SelectItem>
				<SelectItem value="30d">30 days</SelectItem>
				<SelectItem value="90d">90 days</SelectItem>
				<SelectItem value="1y">1 year</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const WithGroups: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="Select category" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Content</SelectLabel>
					<SelectItem value="music">Music</SelectItem>
					<SelectItem value="video">Videos</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Products</SelectLabel>
					<SelectItem value="merch">Merch</SelectItem>
					<SelectItem value="experience">Experiences</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const Disabled: Story = {
	render: () => (
		<Select disabled>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Disabled" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="option1">Option 1</SelectItem>
			</SelectContent>
		</Select>
	),
};

export const WithDisabledItem: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select plan" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="free">Free</SelectItem>
				<SelectItem value="pro">Pro</SelectItem>
				<SelectItem value="enterprise" disabled>
					Enterprise (Coming Soon)
				</SelectItem>
			</SelectContent>
		</Select>
	),
};
