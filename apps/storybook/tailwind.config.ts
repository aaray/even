import type { Config } from "tailwindcss";
import uiConfig from "@even/ui/tailwind.config";

const config: Config = {
	presets: [uiConfig],
	content: ["../../packages/ui/src/**/*.{ts,tsx}"],
};

export default config;
