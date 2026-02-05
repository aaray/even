/**
 * EVEN Design System - Component Prop Interfaces
 *
 * This file documents the public API contracts for all design system components.
 * These interfaces serve as documentation; actual implementations use
 * React.ComponentPropsWithoutRef for proper ref forwarding.
 *
 * Feature: 005-even-design-system
 * Date: 2026-02-05
 */

import type * as React from "react";

// ============================================================================
// Design Tokens
// ============================================================================

export type ColorCategory = "background" | "foreground" | "brand" | "semantic" | "ui";

export interface ColorToken {
	name: string;
	cssVariable: string;
	hslValue: string;
	category: ColorCategory;
	description?: string;
}

export interface SpacingToken {
	name: string;
	value: string;
	pixels: number;
}

export interface TypographyToken {
	name: string;
	fontSize: string;
	fontWeight: number;
	lineHeight: number;
	letterSpacing?: string;
}

// ============================================================================
// Core Components
// ============================================================================

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon" | "pill";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	asChild?: boolean;
	loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	success?: boolean;
}

export type CardVariant = "default" | "elevated" | "outline";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: CardVariant;
}

export type BadgeVariant =
	| "default"
	| "secondary"
	| "outline"
	| "destructive"
	| "success"
	| "warning"
	| "info"
	| "music"
	| "video"
	| "merch"
	| "experience";

export type BadgeSize = "default" | "sm";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: BadgeVariant;
	size?: BadgeSize;
}

// ============================================================================
// Typography Components
// ============================================================================

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	level: HeadingLevel;
	size?: HeadingSize;
}

export type TextSize = "xs" | "sm" | "base" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	size?: TextSize;
	weight?: TextWeight;
	muted?: boolean;
	as?: "p" | "span" | "div";
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	required?: boolean;
}

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
	error?: boolean;
}

// ============================================================================
// Form Components
// ============================================================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean;
	autoResize?: boolean;
	maxLength?: number;
	showCount?: boolean;
}

export interface CheckboxProps {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean | "indeterminate") => void;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	indeterminate?: boolean;
}

export interface RadioGroupProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	orientation?: "horizontal" | "vertical";
}

export interface RadioGroupItemProps {
	value: string;
	disabled?: boolean;
	id?: string;
}

export interface SwitchProps {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	label?: string;
	labelPosition?: "left" | "right";
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	error?: string;
}

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	required?: boolean;
}

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

// ============================================================================
// Navigation Components
// ============================================================================

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
	logo?: React.ReactNode;
	sticky?: boolean;
}

export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {}
export interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
	collapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	collapsible?: boolean;
}

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	collapsible?: boolean;
	defaultOpen?: boolean;
}

export interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
	icon?: React.ReactNode;
	active?: boolean;
	asChild?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
	separator?: React.ReactNode;
}

export interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {}
export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	asChild?: boolean;
}

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

// ============================================================================
// Feedback Components
// ============================================================================

export type AlertVariant = "default" | "info" | "success" | "warning" | "error";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: AlertVariant;
	title?: string;
	icon?: React.ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface PopoverProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	modal?: boolean;
}

export interface PopoverTriggerProps {
	asChild?: boolean;
}

export type PopoverAlign = "start" | "center" | "end";
export type PopoverSide = "top" | "right" | "bottom" | "left";

export interface PopoverContentProps {
	align?: PopoverAlign;
	side?: PopoverSide;
	sideOffset?: number;
	alignOffset?: number;
}

// ============================================================================
// Layout Components
// ============================================================================

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: ContainerSize;
	padding?: boolean;
}

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
	orientation?: DividerOrientation;
	decorative?: boolean;
	className?: string;
}

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: ScrollAreaOrientation;
}

// ============================================================================
// Utility Components
// ============================================================================

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "primary";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: SpinnerSize;
	variant?: SpinnerVariant;
}

export type ProgressVariant = "default" | "success" | "warning" | "error";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
	value?: number;
	max?: number;
	variant?: ProgressVariant;
	size?: ProgressSize;
	showLabel?: boolean;
	className?: string;
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}
