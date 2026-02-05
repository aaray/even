/**
 * EVEN Design System - Color Tokens
 *
 * These tokens reference CSS variables defined in globals.css.
 * Use these for TypeScript autocomplete and type safety.
 */

export const colors = {
	// Background colors
	background: "hsl(var(--background))",
	surface: "hsl(var(--card))",
	elevated: "hsl(var(--elevated))",
	overlay: "hsl(var(--overlay))",

	// Foreground colors
	foreground: "hsl(var(--foreground))",
	foregroundMuted: "hsl(var(--muted-foreground))",

	// Brand colors
	primary: "hsl(var(--primary))",
	primaryForeground: "hsl(var(--primary-foreground))",
	secondary: "hsl(var(--secondary))",
	secondaryForeground: "hsl(var(--secondary-foreground))",
	accent: "hsl(var(--accent))",
	accentForeground: "hsl(var(--accent-foreground))",

	// Semantic colors
	success: "hsl(var(--success))",
	successForeground: "hsl(var(--success-foreground))",
	warning: "hsl(var(--warning))",
	warningForeground: "hsl(var(--warning-foreground))",
	error: "hsl(var(--destructive))",
	errorForeground: "hsl(var(--destructive-foreground))",
	info: "hsl(var(--info))",
	infoForeground: "hsl(var(--info-foreground))",

	// UI colors
	border: "hsl(var(--border))",
	input: "hsl(var(--input))",
	ring: "hsl(var(--ring))",
	card: "hsl(var(--card))",
	cardForeground: "hsl(var(--card-foreground))",

	// EVEN Category colors
	music: "hsl(var(--even-music))",
	video: "hsl(var(--even-video))",
	merch: "hsl(var(--even-merch))",
	experience: "hsl(var(--even-experience))",
} as const;

export type ColorToken = keyof typeof colors;
