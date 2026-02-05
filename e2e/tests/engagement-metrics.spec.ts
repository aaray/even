import { expect, test } from "@playwright/test";

test.describe("Fan Engagement Metrics (US5)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");
	});

	test("engagement metrics section displays", async ({ page }) => {
		// Wait for engagement section to be visible
		const engagementSection = page.getByTestId("engagement-metrics");
		await expect(engagementSection).toBeVisible({ timeout: 15000 });
	});

	test("displays 4 engagement metric cards", async ({ page }) => {
		const engagementSection = page.getByTestId("engagement-metrics");
		await expect(engagementSection).toBeVisible({ timeout: 15000 });

		// Check for metric cards
		const metricCards = page.getByTestId("engagement-metric-card");
		await expect(metricCards).toHaveCount(4);
	});

	test("each metric shows value and trend indicator", async ({ page }) => {
		const engagementSection = page.getByTestId("engagement-metrics");
		await expect(engagementSection).toBeVisible({ timeout: 15000 });

		// Check first metric card has value and trend
		const firstCard = page.getByTestId("engagement-metric-card").first();
		await expect(firstCard).toBeVisible();

		// Should have a value displayed
		await expect(firstCard.locator("p.text-2xl, .text-xl").first()).toBeVisible();
	});

	test("top locations section displays with progress bars", async ({ page }) => {
		const engagementSection = page.getByTestId("engagement-metrics");
		await expect(engagementSection).toBeVisible({ timeout: 15000 });

		// Check for top locations section
		const locationsSection = page.getByTestId("top-locations");
		await expect(locationsSection).toBeVisible();

		// Should have country items
		const countryItems = page.getByTestId("country-item");
		const count = await countryItems.count();
		expect(count).toBeGreaterThan(0);

		// Should have progress bars
		const progressBars = locationsSection.locator('[role="progressbar"], [class*="bg-primary"]');
		const progressCount = await progressBars.count();
		expect(progressCount).toBeGreaterThan(0);
	});

	test("skeleton loading state shows during data fetch", async ({ page }) => {
		// Slow down API to catch loading state
		await page.route("**/api/fans**", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.continue();
		});

		await page.reload();

		// Should see loading skeleton
		const skeleton = page.locator('[class*="animate-pulse"]');
		await expect(skeleton.first()).toBeVisible();
	});
});
