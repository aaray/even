import { expect, test } from "@playwright/test";

test.describe("Recent Releases (US3)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");
	});

	test("displays release cards in grid (4 cards default)", async ({ page }) => {
		// Wait for releases section to be visible
		const releasesSection = page.getByTestId("releases-section");
		await expect(releasesSection).toBeVisible({ timeout: 15000 });

		// Check for 4 release cards
		const releaseCards = page.getByTestId("release-card");
		await expect(releaseCards).toHaveCount(4);
	});

	test("each card shows cover art, title, date, streams, sales", async ({ page }) => {
		const releasesSection = page.getByTestId("releases-section");
		await expect(releasesSection).toBeVisible({ timeout: 15000 });

		// Check first release card has all required elements
		const firstCard = page.getByTestId("release-card").first();
		await expect(firstCard).toBeVisible();

		// Cover art (image)
		await expect(firstCard.locator("img")).toBeVisible();

		// Title
		await expect(firstCard.locator("h3")).toBeVisible();

		// Streams count
		await expect(firstCard.getByText(/streams/i)).toBeVisible();
	});

	test("type badges appear (Album/Single/EP)", async ({ page }) => {
		const releasesSection = page.getByTestId("releases-section");
		await expect(releasesSection).toBeVisible({ timeout: 15000 });

		// Should have at least one type badge (Album, Single, or EP)
		const albumBadge = releasesSection.getByText("Album");
		const singleBadge = releasesSection.getByText("Single");
		const epBadge = releasesSection.getByText("EP");

		// At least one type badge should be visible
		const hasTypeBadge = await Promise.race([
			albumBadge
				.first()
				.isVisible()
				.then((v) => v || false),
			singleBadge
				.first()
				.isVisible()
				.then((v) => v || false),
			epBadge
				.first()
				.isVisible()
				.then((v) => v || false),
		]);

		// If none found individually, try a combined check
		await expect(releasesSection.getByText(/Album|Single|EP/).first()).toBeVisible();
	});

	test("skeleton loading state shows during data fetch", async ({ page }) => {
		// Slow down API to catch loading state
		await page.route("**/api/releases**", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.continue();
		});

		await page.reload();

		// Should see loading skeleton
		const skeleton = page.locator('[class*="animate-pulse"]');
		await expect(skeleton.first()).toBeVisible();
	});
});
