import { expect, test } from "@playwright/test";

test.describe("Glass-Morphism Design System (US7)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");
	});

	test("dark background is applied", async ({ page }) => {
		// Check that body has dark background (either via class or computed style)
		const body = page.locator("body");
		const bgColor = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
		// Dark backgrounds typically have RGB values less than 50
		const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (rgbMatch) {
			const [, r, g, b] = rgbMatch.map(Number);
			expect(r).toBeLessThan(100);
			expect(g).toBeLessThan(100);
			expect(b).toBeLessThan(100);
		}
	});

	test("glass-effect cards are visible", async ({ page }) => {
		// Check for glass-card class on cards
		const glassCards = page.locator(".glass-card");
		const count = await glassCards.count();
		expect(count).toBeGreaterThan(0);

		// Verify at least one has backdrop-blur
		const firstCard = glassCards.first();
		const backdropFilter = await firstCard.evaluate((el) => getComputedStyle(el).backdropFilter);
		expect(backdropFilter).toContain("blur");
	});

	test("warm accent colors on interactive elements", async ({ page }) => {
		// Check that primary buttons/badges use warm colors
		const primaryElements = page.locator(".bg-primary, [class*='bg-primary'], .text-primary");
		const count = await primaryElements.count();
		expect(count).toBeGreaterThan(0);
	});

	test("animations trigger on load", async ({ page }) => {
		// Look for Framer Motion animated elements (they have transform/opacity styles)
		await page.waitForTimeout(500); // Wait for animations to start

		// KPI cards should have animated (using individual test IDs)
		const kpiEarnings = page.getByTestId("kpi-earnings");
		await expect(kpiEarnings).toBeVisible({ timeout: 10000 });

		// Check that elements have completed animation (opacity: 1)
		const opacity = await kpiEarnings.evaluate((el) => getComputedStyle(el).opacity);
		expect(Number.parseFloat(opacity)).toBe(1);
	});

	test("responsive layout works at mobile viewport", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.reload();
		await page.waitForLoadState("networkidle");

		// Header should still be visible
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });

		// KPI card should be visible
		const kpiEarnings = page.getByTestId("kpi-earnings");
		await expect(kpiEarnings).toBeVisible({ timeout: 10000 });
	});

	test("responsive layout works at desktop viewport", async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.reload();
		await page.waitForLoadState("networkidle");

		// All sections should be visible
		const header = page.getByTestId("artist-header");
		await expect(header).toBeVisible({ timeout: 15000 });

		const kpiEarnings = page.getByTestId("kpi-earnings");
		await expect(kpiEarnings).toBeVisible({ timeout: 10000 });

		const releasesSection = page.getByTestId("releases-section");
		await expect(releasesSection).toBeVisible();

		const engagementMetrics = page.getByTestId("engagement-metrics");
		await expect(engagementMetrics).toBeVisible();
	});
});
