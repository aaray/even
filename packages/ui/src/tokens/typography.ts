/**
 * EVEN Design System - Typography Tokens
 *
 * Typography scale following Tailwind conventions with Inter font family.
 */

export const fontFamily = {
	sans: "var(--font-sans)",
	mono: "var(--font-mono)",
} as const;

export const fontSize = {
	xs: "0.75rem", // 12px
	sm: "0.875rem", // 14px
	base: "1rem", // 16px
	lg: "1.125rem", // 18px
	xl: "1.25rem", // 20px
	"2xl": "1.5rem", // 24px
	"3xl": "1.875rem", // 30px
	"4xl": "2.25rem", // 36px
	"5xl": "3rem", // 48px
} as const;

export const fontWeight = {
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
} as const;

export const lineHeight = {
	tight: 1.1,
	snug: 1.2,
	normal: 1.5,
	relaxed: 1.625,
} as const;

export const typography = {
	h1: {
		fontSize: fontSize["5xl"],
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight.tight,
	},
	h2: {
		fontSize: fontSize["4xl"],
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight.tight,
	},
	h3: {
		fontSize: fontSize["3xl"],
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight.snug,
	},
	h4: {
		fontSize: fontSize["2xl"],
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight.snug,
	},
	h5: {
		fontSize: fontSize.xl,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight.snug,
	},
	h6: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.normal,
	},
	body: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.normal,
		lineHeight: lineHeight.normal,
	},
	bodySmall: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.normal,
		lineHeight: lineHeight.normal,
	},
	caption: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.normal,
		lineHeight: lineHeight.normal,
	},
	label: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.normal,
	},
} as const;

export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type TypographyVariant = keyof typeof typography;
