import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox.js";
import { Label } from "./typography.js";

/**
 * Checkbox component for selecting one or more options.
 *
 * ## Usage
 *
 * ```tsx
 * import { Checkbox } from "@even/ui";
 *
 * <Checkbox id="terms" />
 * <Label htmlFor="terms">Accept terms</Label>
 * ```
 *
 * ## Features
 * - Built on Radix UI Checkbox primitive
 * - Checked, unchecked, and indeterminate states
 * - Keyboard accessible
 *
 * ## Accessibility
 * - Always pair with a label using `htmlFor`
 * - Keyboard: Space to toggle
 */
const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A checkbox component built on Radix UI primitives with EVEN styling.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		checked: {
			control: "boolean",
			description: "Controlled checked state",
		},
		disabled: {
			control: "boolean",
			description: "Disables the checkbox",
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Checkbox id="default" />
			<Label htmlFor="default">Accept terms and conditions</Label>
		</div>
	),
};

export const Checked: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Checkbox id="checked" defaultChecked />
			<Label htmlFor="checked">Subscribed to newsletter</Label>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Checkbox id="disabled-unchecked" disabled />
				<Label htmlFor="disabled-unchecked" className="opacity-50">
					Disabled unchecked
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="disabled-checked" disabled defaultChecked />
				<Label htmlFor="disabled-checked" className="opacity-50">
					Disabled checked
				</Label>
			</div>
		</div>
	),
};

export const WithDescription: Story = {
	render: () => (
		<div className="flex gap-2">
			<Checkbox id="marketing" className="mt-1" />
			<div>
				<Label htmlFor="marketing">Marketing emails</Label>
				<p className="text-sm text-muted-foreground">
					Receive emails about new features and updates.
				</p>
			</div>
		</div>
	),
};

export const CheckboxGroup: Story = {
	render: () => (
		<div className="space-y-4">
			<p className="text-sm font-medium">Notification preferences</p>
			<div className="space-y-3">
				<div className="flex items-center gap-2">
					<Checkbox id="email-notif" defaultChecked />
					<Label htmlFor="email-notif">Email notifications</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="push-notif" defaultChecked />
					<Label htmlFor="push-notif">Push notifications</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="sms-notif" />
					<Label htmlFor="sms-notif">SMS notifications</Label>
				</div>
			</div>
		</div>
	),
};
