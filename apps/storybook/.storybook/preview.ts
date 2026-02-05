import type { Preview } from "@storybook/react-vite";
import "@even/ui/globals.css";

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: [
					"Foundation",
					["Design Tokens", "Tailwind Utilities", "Accessibility"],
					"Components",
					["Button", "Input", "Badge", "Card", "Typography", "Avatar", "Tabs", "*"],
					"Layout",
					["Dialog", "Sheet", "Select", "*"],
					"Feedback",
					["Toast", "Toaster", "Tooltip", "Skeleton", "*"],
					"Data Display",
					["StatCard", "ChartContainer", "*"],
				],
			},
		},
		a11y: {
			config: {
				rules: [
					{
						id: "color-contrast",
						enabled: true,
					},
				],
			},
		},
		backgrounds: {
			default: "dark",
			options: {
				dark: {
					name: "dark",
					value: "hsl(0 0% 7%)",
				},
				card: {
					name: "card",
					value: "hsl(0 0% 10%)",
				},
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				mobile: {
					name: "Mobile",
					styles: { width: "375px", height: "667px" },
				},
				tablet: {
					name: "Tablet",
					styles: { width: "768px", height: "1024px" },
				},
				desktop: {
					name: "Desktop",
					styles: { width: "1280px", height: "800px" },
				},
				wide: {
					name: "Wide",
					styles: { width: "1440px", height: "900px" },
				},
			},
		},
	},
	initialGlobals: {
		backgrounds: {
			value: "dark",
		},
	},
};

export default preview;
