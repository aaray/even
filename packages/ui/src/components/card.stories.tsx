import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.js";

/**
 * Card component for grouping related content.
 *
 * ## Usage
 *
 * ```tsx
 * import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@even/ui";
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * ```
 *
 * ## Features
 * - Compound component pattern (Card, CardHeader, CardTitle, etc.)
 * - Multiple variants: default, elevated, outline, ghost
 * - Consistent spacing and typography
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Proper heading hierarchy within cards
 */
const meta = {
	title: "Components/Card",
	component: Card,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A versatile card component for grouping related content with header, content, and footer sections.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "elevated", "outline", "ghost"],
			description: "Visual style variant of the card",
			table: {
				defaultValue: { summary: "default" },
			},
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card description goes here</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content with some text.</p>
			</CardContent>
		</Card>
	),
};

export const WithFooter: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Account Settings</CardTitle>
				<CardDescription>Make changes to your account here.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Your account is active and in good standing.</p>
			</CardContent>
			<CardFooter className="gap-2">
				<Button variant="outline">Cancel</Button>
				<Button>Save</Button>
			</CardFooter>
		</Card>
	),
};

export const Simple: Story = {
	render: () => (
		<Card className="w-[350px] p-6">
			<p>A simple card with just content and padding.</p>
		</Card>
	),
};

export const Elevated: Story = {
	render: () => (
		<Card variant="elevated" className="w-[350px]">
			<CardHeader>
				<CardTitle>Elevated Card</CardTitle>
				<CardDescription>Uses elevated background with shadow</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This card has more visual prominence.</p>
			</CardContent>
		</Card>
	),
};

export const Outline: Story = {
	render: () => (
		<Card variant="outline" className="w-[350px]">
			<CardHeader>
				<CardTitle>Outline Card</CardTitle>
				<CardDescription>Transparent background with border</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Useful for subtle sections or nested cards.</p>
			</CardContent>
		</Card>
	),
};

export const Ghost: Story = {
	render: () => (
		<Card variant="ghost" className="w-[350px]">
			<CardHeader>
				<CardTitle>Ghost Card</CardTitle>
				<CardDescription>No background or border</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Minimal styling for content grouping.</p>
			</CardContent>
		</Card>
	),
};

export const VariantComparison: Story = {
	render: () => (
		<div className="flex gap-4 flex-wrap">
			<Card className="w-[250px]">
				<CardHeader>
					<CardTitle>Default</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Standard card style</p>
				</CardContent>
			</Card>
			<Card variant="elevated" className="w-[250px]">
				<CardHeader>
					<CardTitle>Elevated</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">With shadow</p>
				</CardContent>
			</Card>
			<Card variant="outline" className="w-[250px]">
				<CardHeader>
					<CardTitle>Outline</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Transparent bg</p>
				</CardContent>
			</Card>
			<Card variant="ghost" className="w-[250px]">
				<CardHeader>
					<CardTitle>Ghost</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">No border</p>
				</CardContent>
			</Card>
		</div>
	),
};
