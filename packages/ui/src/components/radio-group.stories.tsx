import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./radio-group.js";
import { Label } from "./typography.js";

/**
 * RadioGroup component for selecting one option from a list.
 *
 * ## Usage
 *
 * ```tsx
 * import { RadioGroup, RadioGroupItem } from "@even/ui";
 *
 * <RadioGroup defaultValue="option-1">
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="option-1" id="option-1" />
 *     <Label htmlFor="option-1">Option 1</Label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="option-2" id="option-2" />
 *     <Label htmlFor="option-2">Option 2</Label>
 *   </div>
 * </RadioGroup>
 * ```
 *
 * ## Features
 * - Built on Radix UI RadioGroup primitive
 * - Single selection from multiple options
 * - Keyboard navigation with arrow keys
 *
 * ## Accessibility
 * - Use arrow keys to navigate between options
 * - Space to select the focused option
 */
const meta = {
	title: "Components/RadioGroup",
	component: RadioGroup,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A radio group component built on Radix UI primitives for single selection.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<RadioGroup defaultValue="option-1">
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option-1" id="option-1" />
				<Label htmlFor="option-1">Option 1</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option-2" id="option-2" />
				<Label htmlFor="option-2">Option 2</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option-3" id="option-3" />
				<Label htmlFor="option-3">Option 3</Label>
			</div>
		</RadioGroup>
	),
};

export const Horizontal: Story = {
	render: () => (
		<RadioGroup defaultValue="sm" className="flex gap-6">
			<div className="flex items-center gap-2">
				<RadioGroupItem value="sm" id="sm" />
				<Label htmlFor="sm">Small</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="md" id="md" />
				<Label htmlFor="md">Medium</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="lg" id="lg" />
				<Label htmlFor="lg">Large</Label>
			</div>
		</RadioGroup>
	),
};

export const WithDescription: Story = {
	render: () => (
		<RadioGroup defaultValue="free">
			<div className="flex gap-2">
				<RadioGroupItem value="free" id="free" className="mt-1" />
				<div>
					<Label htmlFor="free">Free</Label>
					<p className="text-sm text-muted-foreground">Basic features for getting started</p>
				</div>
			</div>
			<div className="flex gap-2">
				<RadioGroupItem value="pro" id="pro" className="mt-1" />
				<div>
					<Label htmlFor="pro">Pro</Label>
					<p className="text-sm text-muted-foreground">Advanced features for professionals</p>
				</div>
			</div>
			<div className="flex gap-2">
				<RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
				<div>
					<Label htmlFor="enterprise">Enterprise</Label>
					<p className="text-sm text-muted-foreground">Custom solutions for large teams</p>
				</div>
			</div>
		</RadioGroup>
	),
};

export const Disabled: Story = {
	render: () => (
		<RadioGroup defaultValue="option-1">
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option-1" id="disabled-1" />
				<Label htmlFor="disabled-1">Available</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option-2" id="disabled-2" disabled />
				<Label htmlFor="disabled-2" className="opacity-50">
					Unavailable
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<RadioGroupItem value="option-3" id="disabled-3" />
				<Label htmlFor="disabled-3">Available</Label>
			</div>
		</RadioGroup>
	),
};

export const PaymentMethod: Story = {
	render: () => (
		<div className="space-y-4 w-[300px]">
			<p className="text-sm font-medium">Payment Method</p>
			<RadioGroup defaultValue="card">
				<div className="flex items-center gap-3 p-3 border border-border rounded-lg">
					<RadioGroupItem value="card" id="card" />
					<div className="flex-1">
						<Label htmlFor="card">Credit Card</Label>
						<p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
					</div>
				</div>
				<div className="flex items-center gap-3 p-3 border border-border rounded-lg">
					<RadioGroupItem value="paypal" id="paypal" />
					<div className="flex-1">
						<Label htmlFor="paypal">PayPal</Label>
						<p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
					</div>
				</div>
				<div className="flex items-center gap-3 p-3 border border-border rounded-lg">
					<RadioGroupItem value="crypto" id="crypto" />
					<div className="flex-1">
						<Label htmlFor="crypto">Cryptocurrency</Label>
						<p className="text-xs text-muted-foreground">BTC, ETH, USDC</p>
					</div>
				</div>
			</RadioGroup>
		</div>
	),
};
