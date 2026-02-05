import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"../../apps/web/src/**/*.{js,ts,jsx,tsx}",
		"../../apps/storybook/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Semantic colors
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},
				info: {
					DEFAULT: "hsl(var(--info))",
					foreground: "hsl(var(--info-foreground))",
				},
				// EVEN brand colors
				even: {
					surface: "hsl(var(--card))",
					elevated: "hsl(var(--elevated))",
					primary: "hsl(var(--foreground))",
					muted: "hsl(var(--muted-foreground))",
					music: "hsl(var(--even-music))",
					video: "hsl(var(--even-video))",
					merch: "hsl(var(--even-merch))",
					experience: "hsl(var(--even-experience))",
				},
				// Legacy category colors (for backwards compatibility)
				category: {
					music: "hsl(var(--even-music))",
					video: "hsl(var(--even-video))",
					merch: "hsl(var(--even-merch))",
					experience: "hsl(var(--even-experience))",
				},
			},
			spacing: {
				// EVEN spacing aliases
				"even-xs": "0.25rem", // 4px
				"even-sm": "0.5rem", // 8px
				"even-md": "1rem", // 16px
				"even-lg": "1.5rem", // 24px
				"even-xl": "2rem", // 32px
				"even-2xl": "3rem", // 48px
				"even-3xl": "4rem", // 64px
			},
			borderRadius: {
				none: "0",
				sm: "calc(var(--radius) - 4px)",
				DEFAULT: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				lg: "var(--radius)",
				xl: "calc(var(--radius) + 4px)",
				"2xl": "calc(var(--radius) + 8px)",
				full: "9999px",
			},
			boxShadow: {
				"even-sm": "var(--shadow-sm)",
				"even-md": "var(--shadow-md)",
				"even-lg": "var(--shadow-lg)",
				"even-xl": "var(--shadow-xl)",
				"even-glow": "var(--shadow-glow)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.5rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.75rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
				"5xl": ["3rem", { lineHeight: "1.1" }],
			},
			keyframes: {
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"fade-out": {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				"slide-in-from-right": {
					from: { transform: "translateX(100%)" },
					to: { transform: "translateX(0)" },
				},
				"slide-out-to-right": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(100%)" },
				},
				spin: {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.2s ease-out",
				"fade-out": "fade-out 0.2s ease-out",
				"slide-in-from-right": "slide-in-from-right 0.3s ease-out",
				"slide-out-to-right": "slide-out-to-right 0.3s ease-out",
				spin: "spin 1s linear infinite",
			},
			backgroundImage: {
				"gradient-warm": "linear-gradient(135deg, hsl(3 85% 52%) 0%, hsl(30 90% 55%) 100%)",
				"gradient-cool": "linear-gradient(135deg, hsl(200 80% 50%) 0%, hsl(280 65% 60%) 100%)",
			},
		},
	},
	plugins: [],
};

export default config;
