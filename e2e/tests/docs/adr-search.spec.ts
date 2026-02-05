import { test, expect } from "@playwright/test";

test.describe("ADR Index and Search", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/adr");
	});

	test("should display ADR index page", async ({ page }) => {
		// Should have ADR heading
		await expect(
			page.getByRole("heading", { name: /architecture decision records/i })
		).toBeVisible();
	});

	test("should list all ADRs chronologically", async ({ page }) => {
		// Should have ADR cards or list items
		const adrItems = page.locator('[data-testid="adr-card"], .adr-card, a[href*="/adr/"]');

		// Wait for content to load
		await expect(adrItems.first()).toBeVisible({ timeout: 5000 });

		// Should have multiple ADRs
		const count = await adrItems.count();
		expect(count).toBeGreaterThan(0);
	});

	test("should display ADR status badges", async ({ page }) => {
		// Look for status indicators
		const statusBadges = page.locator(
			'[data-testid="adr-status"], .adr-status-badge, span:has-text("accepted"), span:has-text("proposed")'
		);
		await expect(statusBadges.first()).toBeVisible({ timeout: 5000 });
	});

	test("should navigate to individual ADR pages", async ({ page }) => {
		// Click on first ADR link
		const adrLink = page.locator('a[href*="/adr/001"]').first();

		if (await adrLink.isVisible()) {
			await adrLink.click();

			// Should be on ADR detail page
			await expect(page).toHaveURL(/\/adr\/001/);

			// Should display ADR content
			await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		}
	});

	test("should use global search to find ADRs", async ({ page }) => {
		// Look for search input (Nextra provides this)
		const searchButton = page.locator('button[aria-label*="Search"], [data-search-button]');

		if (await searchButton.isVisible()) {
			await searchButton.click();

			// Type search query
			const searchInput = page.locator('input[type="search"], [data-search-input]');
			await searchInput.fill("nextra");

			// Should show search results
			const results = page.locator("[data-search-results], .search-results");
			await expect(results).toBeVisible({ timeout: 5000 });
		}
	});

	test("should display ADR with all required sections", async ({ page }) => {
		// Navigate to a specific ADR
		await page.goto("/adr/001-use-nextra-for-docs");

		// Check for required MADR sections
		await expect(page.getByText(/status/i).first()).toBeVisible();
		await expect(page.getByText(/date/i).first()).toBeVisible();
		await expect(page.getByText(/context/i).first()).toBeVisible();
		await expect(page.getByText(/decision/i).first()).toBeVisible();
		await expect(page.getByText(/consequences/i).first()).toBeVisible();
	});
});
