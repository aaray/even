import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input.js";

/**
 * Input component for text entry in forms.
 *
 * ## Usage
 *
 * ```tsx
 * import { Input } from "@even/ui";
 *
 * <Input type="email" placeholder="you@example.com" />
 * <Input error placeholder="Invalid input" />
 * <Input success defaultValue="valid@email.com" />
 * ```
 *
 * ## Features
 * - All standard HTML input types supported
 * - Error and success validation states
 * - Focus ring indicator
 * - File input styling
 *
 * ## Accessibility
 * - `aria-invalid` attribute for error state
 * - Use with `<label>` for proper labeling
 * - Use `aria-describedby` to link with helper text
 */
const meta = {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A styled input component supporting validation states and all standard HTML input types.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["text", "email", "password", "number", "search", "tel", "url"],
			description: "The type of input",
			table: {
				defaultValue: { summary: "text" },
			},
		},
		disabled: {
			control: "boolean",
			description: "Disables the input",
		},
		error: {
			control: "boolean",
			description: "Shows error styling (red border and focus ring)",
			table: {
				defaultValue: { summary: "false" },
			},
		},
		success: {
			control: "boolean",
			description: "Shows success styling (green border and focus ring)",
			table: {
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter text...",
	},
};

export const WithLabel: Story = {
	render: () => (
		<div className="space-y-2 w-[300px]">
			<label htmlFor="email" className="text-sm font-medium">
				Email Address
			</label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</div>
	),
};

export const Password: Story = {
	args: {
		type: "password",
		placeholder: "Enter password...",
	},
};

export const Search: Story = {
	args: {
		type: "search",
		placeholder: "Search...",
	},
};

export const Number: Story = {
	args: {
		type: "number",
		placeholder: "0",
	},
};

export const Disabled: Story = {
	args: {
		placeholder: "Disabled input",
		disabled: true,
	},
};

export const WithValue: Story = {
	args: {
		defaultValue: "Hello World",
	},
};

export const WithHelperText: Story = {
	render: () => (
		<div className="space-y-2 w-[300px]">
			<label htmlFor="username" className="text-sm font-medium">
				Username
			</label>
			<Input id="username" placeholder="johndoe" />
			<p className="text-xs text-muted-foreground">This will be your public display name.</p>
		</div>
	),
};

export const Error: Story = {
	args: {
		error: true,
		placeholder: "Invalid input",
	},
};

export const Success: Story = {
	args: {
		success: true,
		defaultValue: "valid@email.com",
	},
};

export const WithErrorMessage: Story = {
	render: () => (
		<div className="space-y-2 w-[300px]">
			<label htmlFor="email-error" className="text-sm font-medium">
				Email Address
			</label>
			<Input
				id="email-error"
				type="email"
				placeholder="you@example.com"
				error
				defaultValue="invalid-email"
			/>
			<p className="text-xs text-destructive">Please enter a valid email address.</p>
		</div>
	),
};

export const WithSuccessMessage: Story = {
	render: () => (
		<div className="space-y-2 w-[300px]">
			<label htmlFor="email-success" className="text-sm font-medium">
				Email Address
			</label>
			<Input
				id="email-success"
				type="email"
				placeholder="you@example.com"
				success
				defaultValue="valid@example.com"
			/>
			<p className="text-xs text-success">Email address is available!</p>
		</div>
	),
};

export const RequiredField: Story = {
	render: () => (
		<div className="space-y-2 w-[300px]">
			<label htmlFor="required" className="text-sm font-medium">
				Subject <span className="text-destructive">*</span>
			</label>
			<Input id="required" placeholder="Enter subject..." required />
		</div>
	),
};

export const FormExample: Story = {
	render: () => (
		<form className="space-y-4 w-[350px]">
			<div className="space-y-2">
				<label htmlFor="name" className="text-sm font-medium">
					Name
				</label>
				<Input id="name" placeholder="Your name" />
			</div>
			<div className="space-y-2">
				<label htmlFor="form-email" className="text-sm font-medium">
					Email
				</label>
				<Input id="form-email" type="email" placeholder="you@example.com" />
			</div>
			<div className="space-y-2">
				<label htmlFor="message" className="text-sm font-medium">
					Message
				</label>
				<Input id="message" placeholder="Your message..." />
			</div>
		</form>
	),
};
