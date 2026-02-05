import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge.js";

const meta = {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"outline",
				"destructive",
				"success",
				"warning",
				"info",
				"music",
				"video",
				"merch",
				"experience",
			],
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Badge",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
};

export const Music: Story = {
	args: {
		variant: "music",
		children: "Music",
	},
};

export const Video: Story = {
	args: {
		variant: "video",
		children: "Video",
	},
};

export const Merch: Story = {
	args: {
		variant: "merch",
		children: "Merch",
	},
};

export const Experience: Story = {
	args: {
		variant: "experience",
		children: "Experience",
	},
};

export const AllCategories: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="music">Music</Badge>
			<Badge variant="video">Video</Badge>
			<Badge variant="merch">Merch</Badge>
			<Badge variant="experience">Experience</Badge>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="default">Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="destructive">Destructive</Badge>
		</div>
	),
};

export const Success: Story = {
	args: {
		variant: "success",
		children: "Success",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		children: "Warning",
	},
};

export const Info: Story = {
	args: {
		variant: "info",
		children: "Info",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Error",
	},
};

export const SemanticVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="success">Active</Badge>
			<Badge variant="warning">Pending</Badge>
			<Badge variant="info">New</Badge>
			<Badge variant="destructive">Failed</Badge>
		</div>
	),
};

export const StatusExamples: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Badge variant="success">Published</Badge>
				<span className="text-sm text-muted-foreground">Your track is live</span>
			</div>
			<div className="flex items-center gap-2">
				<Badge variant="warning">Processing</Badge>
				<span className="text-sm text-muted-foreground">Uploading to platforms</span>
			</div>
			<div className="flex items-center gap-2">
				<Badge variant="info">Draft</Badge>
				<span className="text-sm text-muted-foreground">Not yet submitted</span>
			</div>
			<div className="flex items-center gap-2">
				<Badge variant="destructive">Rejected</Badge>
				<span className="text-sm text-muted-foreground">See feedback below</span>
			</div>
		</div>
	),
};
