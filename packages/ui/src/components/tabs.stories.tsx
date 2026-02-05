import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs.js";

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="tab1" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="tab1">Tab 1</TabsTrigger>
				<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				<TabsTrigger value="tab3">Tab 3</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<p className="text-muted-foreground">Content for Tab 1</p>
			</TabsContent>
			<TabsContent value="tab2">
				<p className="text-muted-foreground">Content for Tab 2</p>
			</TabsContent>
			<TabsContent value="tab3">
				<p className="text-muted-foreground">Content for Tab 3</p>
			</TabsContent>
		</Tabs>
	),
};

export const TimeRangeSelector: Story = {
	render: () => (
		<Tabs defaultValue="30d">
			<TabsList>
				<TabsTrigger value="7d">7d</TabsTrigger>
				<TabsTrigger value="30d">30d</TabsTrigger>
				<TabsTrigger value="90d">90d</TabsTrigger>
				<TabsTrigger value="1y">1y</TabsTrigger>
			</TabsList>
		</Tabs>
	),
};

export const CategoryFilter: Story = {
	render: () => (
		<Tabs defaultValue="all">
			<TabsList>
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="music">Music</TabsTrigger>
				<TabsTrigger value="videos">Videos</TabsTrigger>
				<TabsTrigger value="merch">Merch</TabsTrigger>
				<TabsTrigger value="experiences">Experiences</TabsTrigger>
			</TabsList>
		</Tabs>
	),
};

export const WithContent: Story = {
	render: () => (
		<Tabs defaultValue="overview" className="w-[500px]">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="reports">Reports</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<div className="rounded-lg border border-border p-4">
					<h3 className="font-semibold mb-2">Overview</h3>
					<p className="text-sm text-muted-foreground">
						View your dashboard summary and key metrics at a glance.
					</p>
				</div>
			</TabsContent>
			<TabsContent value="analytics">
				<div className="rounded-lg border border-border p-4">
					<h3 className="font-semibold mb-2">Analytics</h3>
					<p className="text-sm text-muted-foreground">
						Dive deep into your performance data and trends.
					</p>
				</div>
			</TabsContent>
			<TabsContent value="reports">
				<div className="rounded-lg border border-border p-4">
					<h3 className="font-semibold mb-2">Reports</h3>
					<p className="text-sm text-muted-foreground">Generate and download detailed reports.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const Disabled: Story = {
	render: () => (
		<Tabs defaultValue="active">
			<TabsList>
				<TabsTrigger value="active">Active</TabsTrigger>
				<TabsTrigger value="disabled" disabled>
					Disabled
				</TabsTrigger>
				<TabsTrigger value="another">Another</TabsTrigger>
			</TabsList>
		</Tabs>
	),
};
