import type { Meta, StoryObj } from "@storybook/react-vite";
import { Caption, Heading, Label, Text } from "./typography.js";

const meta: Meta = {
	title: "Components/Typography",
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;

// Heading Stories
export const Headings: StoryObj = {
	render: () => (
		<div className="space-y-4">
			<Heading level="h1">Heading 1 - 48px Bold</Heading>
			<Heading level="h2">Heading 2 - 36px Bold</Heading>
			<Heading level="h3">Heading 3 - 30px Bold</Heading>
			<Heading level="h4">Heading 4 - 24px Semibold</Heading>
			<Heading level="h5">Heading 5 - 20px Semibold</Heading>
			<Heading level="h6">Heading 6 - 18px Medium</Heading>
		</div>
	),
};

export const HeadingWithCustomElement: StoryObj = {
	render: () => (
		<div className="space-y-4">
			<Heading level="h1" as="h2">
				Styled as H1, rendered as H2
			</Heading>
			<Heading level="h3" as="span">
				Styled as H3, rendered as span
			</Heading>
		</div>
	),
};

// Text Stories
export const TextSizes: StoryObj = {
	render: () => (
		<div className="space-y-4">
			<Text size="lg">Large text - 18px</Text>
			<Text size="base">Base text - 16px (default)</Text>
			<Text size="sm">Small text - 14px</Text>
			<Text size="xs">Extra small text - 12px</Text>
		</div>
	),
};

export const TextWeights: StoryObj = {
	render: () => (
		<div className="space-y-2">
			<Text weight="normal">Normal weight (400)</Text>
			<Text weight="medium">Medium weight (500)</Text>
			<Text weight="semibold">Semibold weight (600)</Text>
			<Text weight="bold">Bold weight (700)</Text>
		</div>
	),
};

export const TextVariants: StoryObj = {
	render: () => (
		<div className="space-y-2">
			<Text variant="default">Default text color</Text>
			<Text variant="muted">Muted text color</Text>
			<Text variant="primary">Primary text color</Text>
			<Text variant="success">Success text color</Text>
			<Text variant="warning">Warning text color</Text>
			<Text variant="destructive">Destructive text color</Text>
			<Text variant="info">Info text color</Text>
		</div>
	),
};

export const TextCombinations: StoryObj = {
	render: () => (
		<div className="space-y-4">
			<Text size="lg" weight="bold">
				Large bold heading-like text
			</Text>
			<Text size="sm" variant="muted">
				Small muted secondary text
			</Text>
			<Text weight="medium" variant="primary">
				Medium weight primary accent
			</Text>
			<Text size="xs" weight="semibold" variant="success">
				Extra small semibold success
			</Text>
		</div>
	),
};

// Label Stories
export const Labels: StoryObj = {
	render: () => (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email Address</Label>
				<input
					id="email"
					type="email"
					className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
					placeholder="you@example.com"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="name" required>
					Full Name
				</Label>
				<input
					id="name"
					type="text"
					className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
					placeholder="John Doe"
				/>
			</div>
		</div>
	),
};

// Caption Stories
export const Captions: StoryObj = {
	render: () => (
		<div className="space-y-4">
			<div className="space-y-1">
				<input
					type="text"
					className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
					placeholder="Enter username"
				/>
				<Caption>This will be your public display name.</Caption>
			</div>
			<div className="space-y-1">
				<input
					type="text"
					className="flex h-10 w-full rounded-lg border border-destructive bg-background px-3 py-2 text-sm"
					defaultValue="invalid"
				/>
				<Caption variant="error">Username is already taken.</Caption>
			</div>
			<div className="space-y-1">
				<input
					type="text"
					className="flex h-10 w-full rounded-lg border border-success bg-background px-3 py-2 text-sm"
					defaultValue="available_user"
				/>
				<Caption variant="success">Username is available!</Caption>
			</div>
		</div>
	),
};

// Complete Form Example
export const FormExample: StoryObj = {
	render: () => (
		<form className="space-y-6 max-w-md">
			<Heading level="h3">Create Account</Heading>
			<Text variant="muted" size="sm">
				Fill in the details below to create your artist account.
			</Text>

			<div className="space-y-2">
				<Label htmlFor="form-name" required>
					Artist Name
				</Label>
				<input
					id="form-name"
					type="text"
					className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
					placeholder="Your artist name"
				/>
				<Caption>This is how fans will see you.</Caption>
			</div>

			<div className="space-y-2">
				<Label htmlFor="form-email" required>
					Email
				</Label>
				<input
					id="form-email"
					type="email"
					className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
					placeholder="you@example.com"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="form-bio">Bio</Label>
				<textarea
					id="form-bio"
					className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
					placeholder="Tell fans about yourself..."
				/>
				<Caption>Max 500 characters</Caption>
			</div>
		</form>
	),
};

// Responsive Typography
export const ResponsiveExample: StoryObj = {
	render: () => (
		<div className="space-y-6">
			<Heading level="h1" className="text-3xl md:text-4xl lg:text-5xl">
				Responsive Heading
			</Heading>
			<Text className="text-sm md:text-base lg:text-lg">
				This text scales up at different breakpoints. On mobile it&apos;s small, on tablet it&apos;s
				base size, and on desktop it&apos;s large.
			</Text>
		</div>
	),
};
