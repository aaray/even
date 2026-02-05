import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "./alert.js";

/**
 * Alert component for displaying important messages.
 *
 * ## Usage
 *
 * ```tsx
 * import { Alert, AlertTitle, AlertDescription } from "@even/ui";
 *
 * <Alert variant="info">
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You can add components to your app using the cli.</AlertDescription>
 * </Alert>
 * ```
 *
 * ## Features
 * - Multiple variants: default, info, success, warning, destructive
 * - Supports icons
 * - Compound component pattern
 *
 * ## Accessibility
 * - Uses role="alert" for screen readers
 */
const meta = {
	title: "Feedback/Alert",
	component: Alert,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "An alert component for displaying important messages with semantic variants.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "info", "success", "warning", "destructive"],
			description: "Visual style variant of the alert",
			table: {
				defaultValue: { summary: "default" },
			},
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Alert className="w-[450px]">
			<AlertTitle>Default Alert</AlertTitle>
			<AlertDescription>
				This is a default alert message. Use it for general information.
			</AlertDescription>
		</Alert>
	),
};

export const Info: Story = {
	render: () => (
		<Alert variant="info" className="w-[450px]">
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
			<AlertTitle>Information</AlertTitle>
			<AlertDescription>
				Your profile is 80% complete. Add more details to increase visibility.
			</AlertDescription>
		</Alert>
	),
};

export const Success: Story = {
	render: () => (
		<Alert variant="success" className="w-[450px]">
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
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</svg>
			<AlertTitle>Success!</AlertTitle>
			<AlertDescription>
				Your track has been successfully uploaded and is now being processed.
			</AlertDescription>
		</Alert>
	),
};

export const Warning: Story = {
	render: () => (
		<Alert variant="warning" className="w-[450px]">
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
				<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
				<path d="M12 9v4" />
				<path d="M12 17h.01" />
			</svg>
			<AlertTitle>Warning</AlertTitle>
			<AlertDescription>
				Your subscription will expire in 3 days. Renew now to avoid interruption.
			</AlertDescription>
		</Alert>
	),
};

export const Destructive: Story = {
	render: () => (
		<Alert variant="destructive" className="w-[450px]">
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
				<path d="m15 9-6 6" />
				<path d="m9 9 6 6" />
			</svg>
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Failed to save changes. Please check your connection and try again.
			</AlertDescription>
		</Alert>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4 w-[450px]">
			<Alert>
				<AlertTitle>Default</AlertTitle>
				<AlertDescription>General information message.</AlertDescription>
			</Alert>
			<Alert variant="info">
				<AlertTitle>Info</AlertTitle>
				<AlertDescription>Informational message for the user.</AlertDescription>
			</Alert>
			<Alert variant="success">
				<AlertTitle>Success</AlertTitle>
				<AlertDescription>Operation completed successfully.</AlertDescription>
			</Alert>
			<Alert variant="warning">
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>Action may have unintended consequences.</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Something went wrong.</AlertDescription>
			</Alert>
		</div>
	),
};
