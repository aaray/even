"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils.js";

// Heading component
const headingVariants = cva("font-bold tracking-tight text-foreground", {
	variants: {
		level: {
			h1: "text-5xl",
			h2: "text-4xl",
			h3: "text-3xl",
			h4: "text-2xl font-semibold",
			h5: "text-xl font-semibold",
			h6: "text-lg font-medium",
		},
	},
	defaultVariants: {
		level: "h1",
	},
});

export interface HeadingProps
	extends HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof headingVariants> {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, level, as, children, ...props }, ref) => {
		const Component = as || level || "h1";
		return (
			<Component
				ref={ref}
				className={cn(headingVariants({ level: level || as, className }))}
				{...props}
			>
				{children}
			</Component>
		);
	}
);
Heading.displayName = "Heading";

// Text component
const textVariants = cva("", {
	variants: {
		size: {
			lg: "text-lg",
			base: "text-base",
			sm: "text-sm",
			xs: "text-xs",
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
		},
		variant: {
			default: "text-foreground",
			muted: "text-muted-foreground",
			primary: "text-primary",
			success: "text-success",
			warning: "text-warning",
			destructive: "text-destructive",
			info: "text-info",
		},
	},
	defaultVariants: {
		size: "base",
		weight: "normal",
		variant: "default",
	},
});

export interface TextProps
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof textVariants> {
	as?: "p" | "span" | "div";
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
	({ className, size, weight, variant, as = "p", children, ...props }, ref) => {
		const Component = as;
		return (
			<Component
				ref={ref}
				className={cn(textVariants({ size, weight, variant, className }))}
				{...props}
			>
				{children}
			</Component>
		);
	}
);
Text.displayName = "Text";

// Label component
const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			required: {
				true: "after:content-['*'] after:ml-0.5 after:text-destructive",
				false: "",
			},
		},
		defaultVariants: {
			required: false,
		},
	}
);

export interface LabelProps
	extends HTMLAttributes<HTMLLabelElement>,
		VariantProps<typeof labelVariants> {
	htmlFor?: string;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, required, htmlFor, children, ...props }, ref) => {
		return (
			<label
				ref={ref}
				htmlFor={htmlFor}
				className={cn(labelVariants({ required, className }))}
				{...props}
			>
				{children}
			</label>
		);
	}
);
Label.displayName = "Label";

// Caption component
export interface CaptionProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: "default" | "error" | "success";
}

const Caption = forwardRef<HTMLSpanElement, CaptionProps>(
	({ className, variant = "default", children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(
					"text-xs",
					variant === "default" && "text-muted-foreground",
					variant === "error" && "text-destructive",
					variant === "success" && "text-success",
					className
				)}
				{...props}
			>
				{children}
			</span>
		);
	}
);
Caption.displayName = "Caption";

export { Heading, headingVariants, Text, textVariants, Label, labelVariants, Caption };
