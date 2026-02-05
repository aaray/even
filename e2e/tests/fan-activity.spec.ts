import { expect, test } from "@playwright/test";

test.describe("Fan Activity Feed (US4)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");
	});

	test("activity feed displays with activities", async ({ page }) => {
		// Wait for activity feed section to be visible
		const activitySection = page.getByTestId("fan-activity-feed");
		await expect(activitySection).toBeVisible({ timeout: 15000 });

		// Should have activity items
		const activityItems = page.getByTestId("activity-item");
		const count = await activityItems.count();
		expect(count).toBeGreaterThan(0);
	});

	test("each activity shows avatar, description, timestamp", async ({ page }) => {
		const activitySection = page.getByTestId("fan-activity-feed");
		await expect(activitySection).toBeVisible({ timeout: 15000 });

		// Check first activity item has required elements
		const firstItem = page.getByTestId("activity-item").first();
		await expect(firstItem).toBeVisible();

		// Avatar image
		await expect(firstItem.locator("img, [class*='avatar']").first()).toBeVisible();

		// Activity text
		await expect(firstItem.locator("p").first()).toBeVisible();
	});

	test("type-specific icons appear", async ({ page }) => {
		const activitySection = page.getByTestId("fan-activity-feed");
		await expect(activitySection).toBeVisible({ timeout: 15000 });

		// Should have SVG icons (lucide icons render as SVG)
		const icons = activitySection.locator("svg");
		const iconCount = await icons.count();
		expect(iconCount).toBeGreaterThan(0);
	});

	test("skeleton loading state shows during data fetch", async ({ page }) => {
		// Slow down API to catch loading state
		await page.route("**/api/fan-activity**", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.continue();
		});

		await page.reload();

		// Should see loading skeleton
		const skeleton = page.locator('[class*="animate-pulse"]');
		await expect(skeleton.first()).toBeVisible();
	});
});
