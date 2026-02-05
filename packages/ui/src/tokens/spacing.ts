/**
 * EVEN Design System - Spacing Tokens
 *
 * Spacing scale following 4px base unit.
 * Values are in pixels for reference, use rem in CSS.
 */

export const spacing = {
	0: "0",
	0.5: "0.125rem", // 2px
	1: "0.25rem", // 4px
	1.5: "0.375rem", // 6px
	2: "0.5rem", // 8px
	2.5: "0.625rem", // 10px
	3: "0.75rem", // 12px
	3.5: "0.875rem", // 14px
	4: "1rem", // 16px
	5: "1.25rem", // 20px
	6: "1.5rem", // 24px
	7: "1.75rem", // 28px
	8: "2rem", // 32px
	9: "2.25rem", // 36px
	10: "2.5rem", // 40px
	11: "2.75rem", // 44px
	12: "3rem", // 48px
	14: "3.5rem", // 56px
	16: "4rem", // 64px
	20: "5rem", // 80px
	24: "6rem", // 96px
} as const;

// Semantic spacing aliases
export const spacingAliases = {
	none: spacing[0],
	xs: spacing[1], // 4px
	sm: spacing[2], // 8px
	md: spacing[4], // 16px
	lg: spacing[6], // 24px
	xl: spacing[8], // 32px
	"2xl": spacing[12], // 48px
	"3xl": spacing[16], // 64px
} as const;

export const borderRadius = {
	none: "0",
	sm: "0.125rem", // 2px
	md: "0.25rem", // 4px
	DEFAULT: "0.5rem", // 8px
	lg: "0.75rem", // 12px
	xl: "1rem", // 16px
	"2xl": "1.5rem", // 24px
	full: "9999px",
} as const;

export const shadow = {
	none: "none",
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.25)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.25)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
	glow: "0 0 20px rgba(224, 48, 38, 0.15)",
	inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.25)",
} as const;

export const breakpoints = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1440px",
} as const;

export type SpacingKey = keyof typeof spacing;
export type SpacingAlias = keyof typeof spacingAliases;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadow;
export type Breakpoint = keyof typeof breakpoints;
