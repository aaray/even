import { expect, test } from "@playwright/test";

test.describe("Dashboard - Artist Overview", () => {
	test("displays artist header with name and avatar", async ({ page }) => {
		await page.goto("/dashboard");

		// Wait for data to load (skeletons to disappear)
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15000 });

		// Verify artist name is displayed in greeting (shows first name)
		await expect(page.getByText(/Nova/)).toBeVisible({ timeout: 10000 });
	});

	test("displays 4 KPI stat cards", async ({ page }) => {
		await page.goto("/dashboard");

		// Wait for KPI cards to load (increased timeout for hydration)
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });
		await expect(page.getByTestId("kpi-revenue-retained")).toBeVisible();
		await expect(page.getByTestId("kpi-fans")).toBeVisible();
		await expect(page.getByTestId("kpi-engagement")).toBeVisible();
	});

	test("displays correct earnings value format", async ({ page }) => {
		await page.goto("/dashboard");

		// Check earnings KPI card shows formatted currency
		const earningsCard = page.getByTestId("kpi-earnings");
		await expect(earningsCard).toBeVisible({ timeout: 15000 });
		await expect(earningsCard.getByText(/\$[\d,]+/)).toBeVisible();
	});

	test("displays revenue retained percentage", async ({ page }) => {
		await page.goto("/dashboard");

		const revenueCard = page.getByTestId("kpi-revenue-retained");
		await expect(revenueCard).toBeVisible({ timeout: 15000 });
		// Use first() to get specific element if multiple match
		await expect(revenueCard.getByText(/^\d+%$/).first()).toBeVisible();
	});

	test("shows loading state before data loads", async ({ page }) => {
		// Slow down the API response to catch loading state
		await page.route("**/api/artist", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			await route.continue();
		});

		await page.goto("/dashboard");

		// Should see loading skeletons initially
		const skeletons = page.locator('[class*="animate-pulse"]');
		await expect(skeletons.first()).toBeVisible();
	});

	test("handles API errors gracefully", async ({ page }) => {
		// Mock a failed API response
		await page.route("**/api/artist", (route) => {
			route.fulfill({
				status: 500,
				contentType: "application/json",
				body: JSON.stringify({
					error: {
						code: "INTERNAL_ERROR",
						message: "Server error",
					},
				}),
			});
		});

		await page.goto("/dashboard");
		await page.waitForLoadState("networkidle");

		// Should show error state with retry button
		await expect(page.getByText(/error|failed|retry/i).first()).toBeVisible({ timeout: 15000 });
	});
});
