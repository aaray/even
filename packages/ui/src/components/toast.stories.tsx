import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "./button.js";
import {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./toast.js";

const meta = {
	title: "Components/Toast",
	component: Toast,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<ToastProvider>
				<Story />
				<ToastViewport />
			</ToastProvider>
		),
	],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Show Toast</Button>
				<Toast open={open} onOpenChange={setOpen}>
					<div className="grid gap-1">
						<ToastTitle>Notification</ToastTitle>
						<ToastDescription>This is a default toast message.</ToastDescription>
					</div>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const Success: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Show Success Toast</Button>
				<Toast open={open} onOpenChange={setOpen} variant="success">
					<div className="grid gap-1">
						<ToastTitle>Success!</ToastTitle>
						<ToastDescription>Your changes have been saved.</ToastDescription>
					</div>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const Destructive: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button variant="destructive" onClick={() => setOpen(true)}>
					Show Error Toast
				</Button>
				<Toast open={open} onOpenChange={setOpen} variant="destructive">
					<div className="grid gap-1">
						<ToastTitle>Error</ToastTitle>
						<ToastDescription>Something went wrong. Please try again.</ToastDescription>
					</div>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const WithAction: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
				<Toast open={open} onOpenChange={setOpen}>
					<div className="grid gap-1">
						<ToastTitle>Update Sent!</ToastTitle>
						<ToastDescription>Your message has been sent to 12,500 fans.</ToastDescription>
					</div>
					<ToastAction altText="View">View</ToastAction>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const UpdateSent: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Send Update</Button>
				<Toast open={open} onOpenChange={setOpen}>
					<div className="grid gap-1">
						<ToastTitle>Update Sent!</ToastTitle>
						<ToastDescription>Your message has been sent to 12,500 fans.</ToastDescription>
					</div>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const ValidationError: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button variant="outline" onClick={() => setOpen(true)}>
					Show Validation Error
				</Button>
				<Toast open={open} onOpenChange={setOpen} variant="destructive">
					<div className="grid gap-1">
						<ToastTitle>Validation Error</ToastTitle>
						<ToastDescription>Please fill in both subject and message fields.</ToastDescription>
					</div>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const ProductCreated: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Create Product</Button>
				<Toast open={open} onOpenChange={setOpen} variant="success">
					<div className="grid gap-1">
						<ToastTitle>Product Created</ToastTitle>
						<ToastDescription>"Midnight Dreams" has been added to your catalog.</ToastDescription>
					</div>
					<ToastAction altText="View product">View</ToastAction>
					<ToastClose />
				</Toast>
			</>
		);
	},
};

export const MultipleToasts: Story = {
	render: () => {
		const [toasts, setToasts] = useState<number[]>([]);
		const addToast = () => {
			const id = Date.now();
			setToasts((prev) => [...prev, id]);
		};
		const removeToast = (id: number) => {
			setToasts((prev) => prev.filter((t) => t !== id));
		};
		return (
			<>
				<Button onClick={addToast}>Add Toast</Button>
				{toasts.map((id, index) => (
					<Toast key={id} open onOpenChange={() => removeToast(id)}>
						<div className="grid gap-1">
							<ToastTitle>Notification {index + 1}</ToastTitle>
							<ToastDescription>This is toast message #{index + 1}.</ToastDescription>
						</div>
						<ToastClose />
					</Toast>
				))}
			</>
		);
	},
};
