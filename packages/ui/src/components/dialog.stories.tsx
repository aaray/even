import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog.js";
import { Input } from "./input.js";

const meta = {
	title: "Components/Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Open Dialog</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Dialog Title</DialogTitle>
					<DialogDescription>
						This is a description of the dialog content. Make changes and click save when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">Dialog content goes here.</p>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const SendUpdate: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Send Update</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Send Update to Fans</DialogTitle>
					<DialogDescription>
						Send a message to all 12,500 of your fans. This will be sent via email.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<label htmlFor="subject" className="text-sm font-medium">
							Subject <span className="text-destructive">*</span>
						</label>
						<Input id="subject" placeholder="e.g., New Album Announcement!" />
					</div>
					<div className="space-y-2">
						<label htmlFor="message" className="text-sm font-medium">
							Message <span className="text-destructive">*</span>
						</label>
						<textarea
							id="message"
							className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							placeholder="Write your message to fans..."
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Send Update</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const ConfirmDelete: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">Delete Product</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your product and remove its
						data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button variant="destructive">Delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const EditProfile: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<label htmlFor="display-name" className="text-sm font-medium">
							Display Name
						</label>
						<Input id="display-name" defaultValue="Aria Nova" />
					</div>
					<div className="space-y-2">
						<label htmlFor="bio" className="text-sm font-medium">
							Bio
						</label>
						<textarea
							id="bio"
							className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							defaultValue="Indie pop artist blending electronic beats with soulful melodies."
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="location" className="text-sm font-medium">
							Location
						</label>
						<Input id="location" defaultValue="Los Angeles, CA" />
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button>Save Changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

export const WithForm: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add New Product</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Add New Product</DialogTitle>
					<DialogDescription>Create a new product to sell to your fans.</DialogDescription>
				</DialogHeader>
				<form className="space-y-4 py-4">
					<div className="space-y-2">
						<label htmlFor="product-title" className="text-sm font-medium">
							Title <span className="text-destructive">*</span>
						</label>
						<Input id="product-title" placeholder="Product title" />
					</div>
					<div className="space-y-2">
						<label htmlFor="price" className="text-sm font-medium">
							Price <span className="text-destructive">*</span>
						</label>
						<Input id="price" type="number" placeholder="9.99" />
					</div>
					<div className="space-y-2">
						<label htmlFor="description" className="text-sm font-medium">
							Description
						</label>
						<textarea
							id="description"
							className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							placeholder="Describe your product..."
						/>
					</div>
				</form>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button type="submit">Create Product</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};
