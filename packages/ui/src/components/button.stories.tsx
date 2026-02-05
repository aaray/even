import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.js";

/**
 * Button component for triggering actions and submitting forms.
 *
 * ## Usage
 *
 * ```tsx
 * import { Button } from "@even/ui";
 *
 * <Button variant="default" size="default">
 *   Click me
 * </Button>
 * ```
 *
 * ## Features
 * - Multiple variants: default, secondary, destructive, outline, ghost, link
 * - Multiple sizes: sm, default, lg, icon, pill
 * - Loading state with built-in spinner
 * - Supports `asChild` for custom elements (Radix Slot pattern)
 *
 * ## Accessibility
 * - Keyboard accessible (Tab, Enter, Space)
 * - `aria-busy` attribute during loading state
 * - Visible focus indicator
 */
const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A versatile button component supporting multiple variants, sizes, and states including loading.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
			description: "Visual style variant of the button",
			table: {
				defaultValue: { summary: "default" },
			},
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon", "pill"],
			description: "Size of the button",
			table: {
				defaultValue: { summary: "default" },
			},
		},
		loading: {
			control: "boolean",
			description: "Shows a loading spinner and disables the button",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			control: "boolean",
			description: "Disables the button",
		},
		asChild: {
			control: "boolean",
			description: "Render as a different element using Radix Slot",
			table: {
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Destructive",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Link",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large",
	},
};

export const Pill: Story = {
	args: {
		size: "pill",
		children: "Pill Button",
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled",
		disabled: true,
	},
};

export const Loading: Story = {
	args: {
		children: "Loading",
		loading: true,
	},
};

export const LoadingSecondary: Story = {
	args: {
		variant: "secondary",
		children: "Processing...",
		loading: true,
	},
};

export const LoadingSmall: Story = {
	args: {
		size: "sm",
		children: "Saving",
		loading: true,
	},
};

export const LoadingLarge: Story = {
	args: {
		size: "lg",
		children: "Submitting",
		loading: true,
	},
};
