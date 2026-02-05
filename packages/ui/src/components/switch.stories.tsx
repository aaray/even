import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch.js";
import { Label } from "./typography.js";

/**
 * Switch component for toggling between two states.
 *
 * ## Usage
 *
 * ```tsx
 * import { Switch } from "@even/ui";
 *
 * <Switch id="notifications" />
 * <Label htmlFor="notifications">Enable notifications</Label>
 * ```
 *
 * ## Features
 * - Built on Radix UI Switch primitive
 * - Smooth toggle animation
 * - On/off states
 *
 * ## Accessibility
 * - Keyboard: Space to toggle
 * - Always pair with a label
 */
const meta = {
	title: "Components/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A toggle switch component built on Radix UI primitives for binary choices.",
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
			description: "Disables the switch",
		},
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Switch id="airplane" />
			<Label htmlFor="airplane">Airplane Mode</Label>
		</div>
	),
};

export const Checked: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Switch id="checked" defaultChecked />
			<Label htmlFor="checked">Notifications enabled</Label>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Switch id="disabled-off" disabled />
				<Label htmlFor="disabled-off" className="opacity-50">
					Disabled (off)
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<Switch id="disabled-on" disabled defaultChecked />
				<Label htmlFor="disabled-on" className="opacity-50">
					Disabled (on)
				</Label>
			</div>
		</div>
	),
};

export const WithDescription: Story = {
	render: () => (
		<div className="flex items-start justify-between gap-4 w-[350px]">
			<div>
				<Label htmlFor="marketing">Marketing emails</Label>
				<p className="text-sm text-muted-foreground">
					Receive emails about new products and features.
				</p>
			</div>
			<Switch id="marketing" />
		</div>
	),
};

export const SettingsPanel: Story = {
	render: () => (
		<div className="space-y-6 w-[350px]">
			<h3 className="text-lg font-semibold">Notification Settings</h3>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="push">Push notifications</Label>
						<p className="text-xs text-muted-foreground">Mobile and desktop</p>
					</div>
					<Switch id="push" defaultChecked />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="email-notif">Email notifications</Label>
						<p className="text-xs text-muted-foreground">Daily digest</p>
					</div>
					<Switch id="email-notif" defaultChecked />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="sms">SMS notifications</Label>
						<p className="text-xs text-muted-foreground">Important alerts only</p>
					</div>
					<Switch id="sms" />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="slack">Slack notifications</Label>
						<p className="text-xs text-muted-foreground">Integration required</p>
					</div>
					<Switch id="slack" disabled />
				</div>
			</div>
		</div>
	),
};
