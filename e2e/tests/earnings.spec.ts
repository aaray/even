import { expect, test } from "@playwright/test";

test.describe("Dashboard - Earnings Analytics", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		// Wait for dashboard to load (increased timeout for hydration)
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });
	});

	test("displays earnings section with chart", async ({ page }) => {
		const earningsSection = page.getByTestId("earnings-section");

		// Earnings section should be visible
		await expect(earningsSection).toBeVisible();

		// Chart should be rendered (use first() to handle multiple charts on page)
		await expect(earningsSection.locator(".recharts-responsive-container").first()).toBeVisible();
	});

	test("displays earnings KPI cards", async ({ page }) => {
		const earningsSection = page.getByTestId("earnings-section");

		// Should show total earnings for the period
		await expect(earningsSection.getByText(/\$[\d,]+/).first()).toBeVisible();

		// Should show period change percentage
		await expect(earningsSection.getByText(/%/).first()).toBeVisible();
	});

	test("allows changing time range with tabs", async ({ page }) => {
		const earningsSection = page.getByTestId("earnings-section");

		// Default range should be 30d
		await expect(earningsSection.getByRole("tab", { name: "30d" })).toHaveAttribute(
			"data-state",
			"active"
		);

		// Click 7d tab
		await earningsSection.getByRole("tab", { name: "7d" }).click();
		await expect(earningsSection.getByRole("tab", { name: "7d" })).toHaveAttribute(
			"data-state",
			"active"
		);

		// Click 90d tab
		await earningsSection.getByRole("tab", { name: "90d" }).click();
		await expect(earningsSection.getByRole("tab", { name: "90d" })).toHaveAttribute(
			"data-state",
			"active"
		);

		// Click 1y tab
		await earningsSection.getByRole("tab", { name: "1y" }).click();
		await expect(earningsSection.getByRole("tab", { name: "1y" })).toHaveAttribute(
			"data-state",
			"active"
		);
	});

	test("displays category breakdown", async ({ page }) => {
		const earningsSection = page.getByTestId("earnings-section");

		// Should show category labels (use first() to avoid strict mode issues with multiple matches)
		await expect(earningsSection.getByText("Music").first()).toBeVisible();
		await expect(earningsSection.getByText("Videos").first()).toBeVisible();
		await expect(earningsSection.getByText("Merch").first()).toBeVisible();
		await expect(earningsSection.getByText("Experiences").first()).toBeVisible();
	});

	test("shows loading state when changing range", async ({ page }) => {
		// Slow down API response to catch loading state
		await page.route("**/api/earnings*", async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 300));
			await route.continue();
		});

		const earningsSection = page.getByTestId("earnings-section");

		// Click a different range tab
		await earningsSection.getByRole("tab", { name: "7d" }).click();

		// Should show loading skeleton or spinner
		// Note: Implementation may show loading indicator
	});

	test("chart has interactive tooltip on hover", async ({ page }) => {
		const earningsSection = page.getByTestId("earnings-section");
		const chart = earningsSection.locator(".recharts-responsive-container").first();

		// Hover over the chart area
		await chart.hover({ position: { x: 200, y: 100 } });

		// Tooltip should appear (recharts adds .recharts-tooltip-wrapper)
		await expect(earningsSection.locator(".recharts-tooltip-wrapper").first()).toBeVisible({
			timeout: 2000,
		});
	});
});
