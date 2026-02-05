import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet.js";

const meta = {
	title: "Components/Sheet",
	component: Sheet,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Sheet</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Sheet Title</SheetTitle>
					<SheetDescription>This is a description of the sheet content.</SheetDescription>
				</SheetHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						Sheet content goes here. This is a slide-out panel that can contain any content.
					</p>
				</div>
			</SheetContent>
		</Sheet>
	),
};

export const LeftSide: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Left Sheet</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Navigation</SheetTitle>
					<SheetDescription>Browse through menu options.</SheetDescription>
				</SheetHeader>
				<nav className="mt-4 space-y-2">
					<a href="#" className="block py-2 px-3 rounded-lg hover:bg-secondary">
						Dashboard
					</a>
					<a href="#" className="block py-2 px-3 rounded-lg hover:bg-secondary">
						Products
					</a>
					<a href="#" className="block py-2 px-3 rounded-lg hover:bg-secondary">
						Earnings
					</a>
					<a href="#" className="block py-2 px-3 rounded-lg hover:bg-secondary">
						Fans
					</a>
				</nav>
			</SheetContent>
		</Sheet>
	),
};

export const ProductDetail: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">View Product</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md">
				<SheetHeader>
					<SheetTitle>Midnight Dreams - Album</SheetTitle>
					<SheetDescription>Released on January 15, 2024</SheetDescription>
				</SheetHeader>
				<div className="mt-6 space-y-6">
					<div className="aspect-square rounded-lg bg-secondary/20 flex items-center justify-center">
						<span className="text-muted-foreground">Album Art</span>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-lg bg-secondary/50 p-4">
							<p className="text-sm text-muted-foreground">Total Earnings</p>
							<p className="text-2xl font-bold">$12,450</p>
						</div>
						<div className="rounded-lg bg-secondary/50 p-4">
							<p className="text-sm text-muted-foreground">Units Sold</p>
							<p className="text-2xl font-bold">1,245</p>
						</div>
					</div>
					<div className="space-y-3">
						<h4 className="font-semibold">Details</h4>
						<div className="flex justify-between py-2 border-b border-border">
							<span className="text-muted-foreground">Release Type</span>
							<span className="font-medium">Album</span>
						</div>
						<div className="flex justify-between py-2 border-b border-border">
							<span className="text-muted-foreground">Track Count</span>
							<span className="font-medium">12</span>
						</div>
						<div className="flex justify-between py-2">
							<span className="text-muted-foreground">Streams</span>
							<span className="font-medium">2.4M</span>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	),
};

export const WithFooter: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Sheet with Footer</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Confirm Action</SheetTitle>
					<SheetDescription>Are you sure you want to proceed with this action?</SheetDescription>
				</SheetHeader>
				<div className="py-6">
					<p className="text-sm text-muted-foreground">
						This action cannot be undone. Please review before confirming.
					</p>
				</div>
				<SheetFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Confirm</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

export const TopSheet: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Top Sheet</Button>
			</SheetTrigger>
			<SheetContent side="top">
				<SheetHeader>
					<SheetTitle>Notification</SheetTitle>
					<SheetDescription>You have a new message from your fans!</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
};

export const BottomSheet: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Bottom Sheet</Button>
			</SheetTrigger>
			<SheetContent side="bottom">
				<SheetHeader>
					<SheetTitle>Quick Actions</SheetTitle>
					<SheetDescription>Choose an action to perform.</SheetDescription>
				</SheetHeader>
				<div className="grid grid-cols-3 gap-4 py-4">
					<Button variant="secondary" className="flex flex-col h-auto py-4">
						<span>Share</span>
					</Button>
					<Button variant="secondary" className="flex flex-col h-auto py-4">
						<span>Edit</span>
					</Button>
					<Button variant="secondary" className="flex flex-col h-auto py-4">
						<span>Delete</span>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	),
};
