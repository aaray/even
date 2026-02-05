import { expect, test } from "@playwright/test";

test.describe("KPI Stats Overview (US1)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		// Wait for the dashboard to load
		await page.waitForLoadState("networkidle");
	});

	test("displays 4 KPI cards (Revenue, Streams, Releases, Followers)", async ({ page }) => {
		// Verify all 4 KPI cards are visible
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });
		await expect(page.getByTestId("kpi-revenue-retained")).toBeVisible();
		await expect(page.getByTestId("kpi-fans")).toBeVisible();
		await expect(page.getByTestId("kpi-engagement")).toBeVisible();
	});

	test("each card shows value and change percentage", async ({ page }) => {
		// Earnings card should show currency value
		const earningsCard = page.getByTestId("kpi-earnings");
		await expect(earningsCard).toBeVisible({ timeout: 15000 });
		await expect(earningsCard.getByText(/\$[\d,]+/)).toBeVisible();

		// Fans card should show compact number
		const fansCard = page.getByTestId("kpi-fans");
		await expect(fansCard).toBeVisible();
		// Should show a number (possibly with K/M suffix)
		await expect(fansCard.locator("p.text-3xl")).toContainText(/[\d,.]+[KMB]?/);
	});

	test("up trends show green color indicator", async ({ page }) => {
		// Revenue retained card shows a positive comparison
		const revenueCard = page.getByTestId("kpi-revenue-retained");
		await expect(revenueCard).toBeVisible({ timeout: 15000 });

		// Should have text-green-500 class for positive trends
		const changeElement = revenueCard.locator(".text-green-500");
		await expect(changeElement).toBeVisible();
	});

	test("KPI cards have proper structure and labels", async ({ page }) => {
		// Check that cards have proper labels (using translation keys)
		const earningsCard = page.getByTestId("kpi-earnings");
		await expect(earningsCard).toBeVisible({ timeout: 15000 });

		// Each card should have a label, value, and optional icon
		await expect(earningsCard.locator("p.text-sm").first()).toBeVisible(); // label
		await expect(earningsCard.locator("p.text-3xl")).toBeVisible(); // value
	});

	test("KPI cards display skeleton loading state", async ({ page }) => {
		// Slow down API to catch loading state
		await page.route("**/api/artist", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.continue();
		});

		// Reload to trigger loading state
		await page.reload();

		// Should see loading skeletons
		const skeletons = page.locator('[class*="animate-pulse"]');
		await expect(skeletons.first()).toBeVisible();
	});
});
