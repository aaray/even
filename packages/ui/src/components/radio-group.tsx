"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";
import { cn } from "../lib/utils.js";

const RadioGroup = forwardRef<
	ElementRef<typeof RadioGroupPrimitive.Root>,
	ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
	<RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-3", className)} {...props} />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
	ElementRef<typeof RadioGroupPrimitive.Item>,
	ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
	<RadioGroupPrimitive.Item
		ref={ref}
		className={cn(
			"aspect-square h-5 w-5 rounded-full border border-input bg-background",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"data-[state=checked]:border-primary",
			className
		)}
		{...props}
	>
		<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
			<div className="h-2.5 w-2.5 rounded-full bg-primary" />
		</RadioGroupPrimitive.Indicator>
	</RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
