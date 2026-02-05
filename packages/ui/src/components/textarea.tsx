"use client";

import { type TextareaHTMLAttributes, forwardRef, useCallback, useEffect, useRef } from "react";
import { cn } from "../lib/utils.js";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean;
	success?: boolean;
	autoResize?: boolean;
	showCount?: boolean;
	maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{ className, error, success, autoResize, showCount, maxLength, onChange, ...props },
		ref
	) => {
		const textareaRef = useRef<HTMLTextAreaElement | null>(null);

		const handleResize = useCallback(() => {
			const textarea = textareaRef.current;
			if (textarea && autoResize) {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			}
		}, [autoResize]);

		useEffect(() => {
			handleResize();
		}, [handleResize, props.value, props.defaultValue]);

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			handleResize();
			onChange?.(e);
		};

		const setRefs = (element: HTMLTextAreaElement | null) => {
			textareaRef.current = element;
			if (typeof ref === "function") {
				ref(element);
			} else if (ref) {
				ref.current = element;
			}
		};

		const currentLength = typeof props.value === "string" ? props.value.length : 0;

		return (
			<div className="relative">
				<textarea
					ref={setRefs}
					className={cn(
						"flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
						"placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
						"disabled:cursor-not-allowed disabled:opacity-50",
						"resize-none",
						error && "border-destructive focus-visible:ring-destructive",
						success && "border-success focus-visible:ring-success",
						showCount && "pb-6",
						className
					)}
					maxLength={maxLength}
					onChange={handleChange}
					aria-invalid={error ? "true" : undefined}
					{...props}
				/>
				{showCount && maxLength && (
					<span
						className={cn(
							"absolute bottom-2 right-3 text-xs text-muted-foreground",
							currentLength >= maxLength && "text-destructive"
						)}
					>
						{currentLength}/{maxLength}
					</span>
				)}
			</div>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
