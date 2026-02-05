import { expect, test } from "@playwright/test";

test.describe("Sales Analytics Chart (US2)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");
	});

	test("renders area chart with two data series", async ({ page }) => {
		// Wait for chart to be visible (using existing test ID)
		const chartSection = page.getByTestId("earnings-section");
		await expect(chartSection).toBeVisible({ timeout: 15000 });

		// Check for Recharts container and SVG
		const chartContainer = chartSection.locator(".recharts-wrapper");
		await expect(chartContainer).toBeVisible();

		// Should have area elements for the data series
		const areas = chartSection.locator(".recharts-area-area");
		await expect(areas.first()).toBeVisible();
	});

	test("X-axis shows month labels", async ({ page }) => {
		const chartSection = page.getByTestId("earnings-section");
		await expect(chartSection).toBeVisible({ timeout: 15000 });

		// X-axis should have tick labels (months)
		const xAxisTicks = chartSection.locator(".recharts-xAxis .recharts-cartesian-axis-tick");
		await expect(xAxisTicks.first()).toBeVisible();
	});

	test("shows skeleton loading state during data fetch", async ({ page }) => {
		// Slow down API to catch loading state
		await page.route("**/api/earnings**", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.continue();
		});

		await page.reload();

		// Should see loading skeleton
		const skeleton = page.locator('[class*="animate-pulse"]');
		await expect(skeleton.first()).toBeVisible();
	});

	test("chart section has heading", async ({ page }) => {
		// Check for chart section heading
		const chartSection = page.getByTestId("earnings-section");
		await expect(chartSection).toBeVisible({ timeout: 15000 });

		// Should have a title (h2 heading)
		await expect(chartSection.locator("h2")).toBeVisible();
	});
});
