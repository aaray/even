import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Progress } from "./progress.js";

/**
 * Progress component for showing completion status.
 *
 * ## Usage
 *
 * ```tsx
 * import { Progress } from "@even/ui";
 *
 * <Progress value={60} />
 * ```
 *
 * ## Features
 * - Built on Radix UI Progress primitive
 * - Animated indicator
 * - Custom indicator styling
 *
 * ## Accessibility
 * - Proper ARIA attributes for screen readers
 */
const meta = {
	title: "Feedback/Progress",
	component: Progress,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A progress bar component for displaying completion status or loading progress.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: { type: "range", min: 0, max: 100, step: 1 },
			description: "Progress value from 0-100",
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 60,
	},
	render: (args) => (
		<div className="w-[400px]">
			<Progress {...args} />
		</div>
	),
};

export const Values: Story = {
	render: () => (
		<div className="space-y-4 w-[400px]">
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>0%</span>
					<span className="text-muted-foreground">Not started</span>
				</div>
				<Progress value={0} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>25%</span>
					<span className="text-muted-foreground">Started</span>
				</div>
				<Progress value={25} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>50%</span>
					<span className="text-muted-foreground">Halfway</span>
				</div>
				<Progress value={50} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>75%</span>
					<span className="text-muted-foreground">Almost done</span>
				</div>
				<Progress value={75} />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>100%</span>
					<span className="text-muted-foreground">Complete</span>
				</div>
				<Progress value={100} />
			</div>
		</div>
	),
};

export const Animated: Story = {
	render: function AnimatedProgress() {
		const [progress, setProgress] = useState(0);

		useEffect(() => {
			const timer = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) return 0;
					return prev + 10;
				});
			}, 500);
			return () => clearInterval(timer);
		}, []);

		return (
			<div className="w-[400px] space-y-2">
				<Progress value={progress} />
				<p className="text-sm text-muted-foreground text-center">{progress}% complete</p>
			</div>
		);
	},
};

export const CustomColors: Story = {
	render: () => (
		<div className="space-y-4 w-[400px]">
			<div className="space-y-2">
				<span className="text-sm">Default (Primary)</span>
				<Progress value={60} />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Success</span>
				<Progress value={80} indicatorClassName="bg-success" />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Warning</span>
				<Progress value={45} indicatorClassName="bg-warning" />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Info</span>
				<Progress value={70} indicatorClassName="bg-info" />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Destructive</span>
				<Progress value={25} indicatorClassName="bg-destructive" />
			</div>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="space-y-6 w-[400px]">
			<div className="space-y-2">
				<span className="text-sm">Small (h-1)</span>
				<Progress value={60} className="h-1" />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Default (h-2)</span>
				<Progress value={60} />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Medium (h-3)</span>
				<Progress value={60} className="h-3" />
			</div>
			<div className="space-y-2">
				<span className="text-sm">Large (h-4)</span>
				<Progress value={60} className="h-4" />
			</div>
		</div>
	),
};

export const UploadProgress: Story = {
	render: function UploadProgress() {
		const [progress, setProgress] = useState(0);
		const [status, setStatus] = useState<"idle" | "uploading" | "complete">("idle");

		const startUpload = () => {
			setStatus("uploading");
			setProgress(0);
			const timer = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						clearInterval(timer);
						setStatus("complete");
						return 100;
					}
					return prev + Math.random() * 15;
				});
			}, 300);
		};

		return (
			<div className="w-[400px] space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">
						{status === "idle" && "Ready to upload"}
						{status === "uploading" && "Uploading..."}
						{status === "complete" && "Upload complete!"}
					</span>
					<span className="text-sm text-muted-foreground">
						{Math.round(Math.min(progress, 100))}%
					</span>
				</div>
				<Progress
					value={Math.min(progress, 100)}
					indicatorClassName={status === "complete" ? "bg-success" : undefined}
				/>
				{status === "idle" && (
					<button
						onClick={startUpload}
						className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
					>
						Start Upload
					</button>
				)}
				{status === "complete" && (
					<button
						onClick={() => {
							setStatus("idle");
							setProgress(0);
						}}
						className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
					>
						Upload Another
					</button>
				)}
			</div>
		);
	},
};
