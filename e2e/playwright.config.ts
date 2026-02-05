import { defineConfig, devices } from "@playwright/test";

// Determine which app to test based on TEST_APP env var
const testApp = process.env.TEST_APP || "web";
const baseURLs: Record<string, string> = {
	web: "http://localhost:3000",
	docs: "http://localhost:3001",
};

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: baseURLs[testApp],
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	webServer:
		testApp === "docs"
			? [
					{
						command: "bun run --cwd ../apps/docs dev",
						url: "http://localhost:3001",
						reuseExistingServer: !process.env.CI,
						timeout: 120 * 1000,
					},
				]
			: [
					{
						command: "bun run --cwd ../apps/api dev",
						url: "http://localhost:4000/health",
						reuseExistingServer: !process.env.CI,
						timeout: 120 * 1000,
					},
					{
						command: "bun run --cwd ../apps/web dev",
						url: "http://localhost:3000",
						reuseExistingServer: !process.env.CI,
						timeout: 120 * 1000,
					},
				],
});
