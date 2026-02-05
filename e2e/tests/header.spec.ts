import { expect, test } from "@playwright/test";

test.describe("Dashboard Header (US6)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");
	});

	test("header displays with artist info", async ({ page }) => {
		// Wait for header to be visible
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });
	});

	test("personalized greeting is displayed", async ({ page }) => {
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });

		// Should show greeting text (Welcome back, Hello, or similar)
		const greeting = header.locator("h1, h2").first();
		await expect(greeting).toBeVisible();
	});

	test("search input is visible", async ({ page }) => {
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });

		// Should have search input
		const searchInput = header.getByPlaceholder(/search/i);
		await expect(searchInput).toBeVisible();
	});

	test("notification bell is visible", async ({ page }) => {
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });

		// Should have notification button
		const notificationButton = header.getByRole("button", { name: /notification/i });
		await expect(notificationButton).toBeVisible();
	});

	test("avatar displays with fallback for missing image", async ({ page }) => {
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });

		// Should have avatar (img or fallback div)
		const avatar = header.locator(
			'img[alt*="avatar" i], img[alt*="artist" i], [class*="avatar" i]'
		);
		await expect(avatar.first()).toBeVisible();
	});

	test("skeleton loading state shows during data fetch", async ({ page }) => {
		// Slow down API to catch loading state
		await page.route("**/api/artist**", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.continue();
		});

		await page.reload();

		// Should see loading skeleton
		const skeleton = page.locator('[class*="animate-pulse"]');
		await expect(skeleton.first()).toBeVisible();
	});
});
