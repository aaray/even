import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Caption, Label } from "./typography.js";
import { Textarea } from "./textarea.js";

/**
 * Textarea component for multi-line text input.
 *
 * ## Usage
 *
 * ```tsx
 * import { Textarea } from "@even/ui";
 *
 * <Textarea placeholder="Enter your message..." />
 * <Textarea autoResize showCount maxLength={500} />
 * ```
 *
 * ## Features
 * - Auto-resize based on content
 * - Character count display
 * - Error and success states
 *
 * ## Accessibility
 * - `aria-invalid` for error state
 * - Use with label for proper accessibility
 */
const meta = {
	title: "Components/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A multi-line text input with auto-resize and character count features.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		error: {
			control: "boolean",
			description: "Shows error styling",
		},
		success: {
			control: "boolean",
			description: "Shows success styling",
		},
		autoResize: {
			control: "boolean",
			description: "Automatically resize based on content",
		},
		showCount: {
			control: "boolean",
			description: "Show character count",
		},
		maxLength: {
			control: "number",
			description: "Maximum character length",
		},
		disabled: {
			control: "boolean",
			description: "Disables the textarea",
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-[350px]">
			<Textarea placeholder="Type your message here..." />
		</div>
	),
};

export const WithLabel: Story = {
	render: () => (
		<div className="space-y-2 w-[350px]">
			<Label htmlFor="message">Message</Label>
			<Textarea id="message" placeholder="Enter your message..." />
		</div>
	),
};

export const WithCharacterCount: Story = {
	render: function CharacterCountStory() {
		const [value, setValue] = useState("");
		return (
			<div className="space-y-2 w-[350px]">
				<Label htmlFor="bio">Bio</Label>
				<Textarea
					id="bio"
					placeholder="Tell us about yourself..."
					showCount
					maxLength={200}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
		);
	},
};

export const AutoResize: Story = {
	render: () => (
		<div className="space-y-2 w-[350px]">
			<Label htmlFor="notes">Notes</Label>
			<Textarea
				id="notes"
				placeholder="Start typing... The textarea will grow as you type."
				autoResize
			/>
			<Caption>This textarea grows automatically based on content.</Caption>
		</div>
	),
};

export const Error: Story = {
	render: () => (
		<div className="space-y-2 w-[350px]">
			<Label htmlFor="error-textarea">Description</Label>
			<Textarea
				id="error-textarea"
				placeholder="Enter description..."
				error
				defaultValue="Too short"
			/>
			<Caption variant="error">Description must be at least 50 characters.</Caption>
		</div>
	),
};

export const Success: Story = {
	render: () => (
		<div className="space-y-2 w-[350px]">
			<Label htmlFor="success-textarea">Feedback</Label>
			<Textarea
				id="success-textarea"
				placeholder="Enter feedback..."
				success
				defaultValue="This is great feedback that meets all the requirements!"
			/>
			<Caption variant="success">Looks good!</Caption>
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<div className="space-y-2 w-[350px]">
			<Label htmlFor="disabled-textarea">Disabled</Label>
			<Textarea
				id="disabled-textarea"
				placeholder="This textarea is disabled"
				disabled
				defaultValue="You cannot edit this content."
			/>
		</div>
	),
};

export const FormExample: Story = {
	render: function FormExampleStory() {
		const [bio, setBio] = useState("");
		return (
			<form className="space-y-4 w-[400px]">
				<div className="space-y-2">
					<Label htmlFor="artist-name">Artist Name</Label>
					<input
						id="artist-name"
						type="text"
						className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
						placeholder="Your artist name"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="artist-bio">Bio</Label>
					<Textarea
						id="artist-bio"
						placeholder="Tell fans about yourself, your music, and your journey..."
						autoResize
						showCount
						maxLength={500}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
					<Caption>This will appear on your public profile.</Caption>
				</div>
			</form>
		);
	},
};
