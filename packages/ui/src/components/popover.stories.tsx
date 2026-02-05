import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";
import { Input } from "./input.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { Label } from "./typography.js";

/**
 * Popover component for displaying floating content.
 *
 * ## Usage
 *
 * ```tsx
 * import { Popover, PopoverTrigger, PopoverContent } from "@even/ui";
 *
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>Content goes here</PopoverContent>
 * </Popover>
 * ```
 *
 * ## Features
 * - Built on Radix UI Popover primitive
 * - Customizable alignment and offset
 * - Focus management
 *
 * ## Accessibility
 * - Keyboard: Escape to close
 * - Focus trapped inside when open
 */
const meta = {
	title: "Feedback/Popover",
	component: Popover,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A floating popover component for displaying additional content or actions.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Open Popover</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="space-y-2">
					<h4 className="font-medium leading-none">Dimensions</h4>
					<p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
				</div>
			</PopoverContent>
		</Popover>
	),
};

export const WithForm: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Edit Dimensions</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Dimensions</h4>
						<p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="width">Width</Label>
							<Input id="width" defaultValue="100%" className="col-span-2 h-8" />
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxWidth">Max. width</Label>
							<Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="height">Height</Label>
							<Input id="height" defaultValue="25px" className="col-span-2 h-8" />
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	),
};

export const Alignments: Story = {
	render: () => (
		<div className="flex gap-4">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Align Start</Button>
				</PopoverTrigger>
				<PopoverContent align="start">
					<p className="text-sm">Aligned to start</p>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Align Center</Button>
				</PopoverTrigger>
				<PopoverContent align="center">
					<p className="text-sm">Aligned to center (default)</p>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Align End</Button>
				</PopoverTrigger>
				<PopoverContent align="end">
					<p className="text-sm">Aligned to end</p>
				</PopoverContent>
			</Popover>
		</div>
	),
};

export const Sides: Story = {
	render: () => (
		<div className="flex gap-4">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Top</Button>
				</PopoverTrigger>
				<PopoverContent side="top">
					<p className="text-sm">Opens above</p>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Bottom</Button>
				</PopoverTrigger>
				<PopoverContent side="bottom">
					<p className="text-sm">Opens below (default)</p>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Left</Button>
				</PopoverTrigger>
				<PopoverContent side="left">
					<p className="text-sm">Opens left</p>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">Right</Button>
				</PopoverTrigger>
				<PopoverContent side="right">
					<p className="text-sm">Opens right</p>
				</PopoverContent>
			</Popover>
		</div>
	),
};

export const ProfilePopover: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<div className="w-8 h-8 rounded-full bg-gradient-warm" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-60" align="end">
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-gradient-warm" />
						<div>
							<p className="font-medium">Artist Name</p>
							<p className="text-sm text-muted-foreground">@artisthandle</p>
						</div>
					</div>
					<div className="border-t border-border pt-4 space-y-2">
						<Button variant="ghost" className="w-full justify-start">
							Profile
						</Button>
						<Button variant="ghost" className="w-full justify-start">
							Settings
						</Button>
						<Button variant="ghost" className="w-full justify-start text-destructive">
							Sign out
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	),
};
