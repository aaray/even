import { expect, test } from "@playwright/test";

test.describe("Language Switching", () => {
	test.beforeEach(async ({ page }) => {
		// Clear localStorage to start fresh
		await page.goto("/dashboard");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
	});

	test("displays English by default", async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Check for English text in KPI cards (using testid for specificity)
		await expect(page.getByTestId("kpi-earnings").getByText("Total Earnings")).toBeVisible({
			timeout: 10000,
		});
		await expect(
			page.getByTestId("kpi-revenue-retained").getByText("Revenue Retained")
		).toBeVisible();
	});

	test("switches language from English to Spanish", async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Verify English initially
		await expect(page.getByTestId("kpi-earnings").getByText("Total Earnings")).toBeVisible({
			timeout: 10000,
		});

		// Open language selector and switch to Spanish
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();

		// Verify Spanish text appears
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 5000,
		});
		await expect(
			page.getByTestId("kpi-revenue-retained").getByText("Ingresos Retenidos")
		).toBeVisible();
	});

	test("switches language from Spanish to Brazilian Portuguese", async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Switch to Spanish first
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 5000,
		});

		// Switch to Portuguese
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Português" }).click();

		// Verify Portuguese text appears
		await expect(page.getByTestId("kpi-earnings").getByText("Ganhos Totais")).toBeVisible({
			timeout: 5000,
		});
		await expect(
			page.getByTestId("kpi-revenue-retained").getByText("Receita Retida")
		).toBeVisible();
	});

	test("language selector shows current language", async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// By default should show English
		const selector = page.getByRole("combobox", { name: /language/i });
		await expect(selector).toBeVisible({ timeout: 10000 });
		await expect(selector).toContainText("English");

		// Switch to Spanish and verify selector updates
		await selector.click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(selector).toContainText("Español");
	});

	test("language preference persists after page reload", async ({ page }) => {
		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Switch to Spanish
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 10000,
		});

		// Reload page
		await page.reload();
		await page.waitForLoadState("domcontentloaded");

		// Should still be Spanish
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 15000,
		});
		await expect(page.getByRole("combobox", { name: /language/i })).toContainText("Español");
	});

	test("new user sees English by default", async ({ page, context }) => {
		// Clear all storage
		await context.clearCookies();
		await page.goto("/dashboard");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Should display English
		await expect(page.getByTestId("kpi-earnings").getByText("Total Earnings")).toBeVisible({
			timeout: 10000,
		});
	});
});

test.describe("Browser Language Detection", () => {
	test("detects Spanish browser language for new user", async ({ browser }) => {
		const context = await browser.newContext({
			locale: "es-ES",
		});
		const page = await context.newPage();

		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Should display Spanish due to browser locale
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 10000,
		});

		await context.close();
	});

	test("falls back to English for unsupported browser language", async ({ browser }) => {
		const context = await browser.newContext({
			locale: "fr-FR",
		});
		const page = await context.newPage();

		await page.goto("/dashboard");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Should display English as fallback
		await expect(page.getByTestId("kpi-earnings").getByText("Total Earnings")).toBeVisible({
			timeout: 10000,
		});

		await context.close();
	});

	test("stored preference takes priority over browser language", async ({ browser }) => {
		const context = await browser.newContext({
			locale: "es-ES",
		});
		const page = await context.newPage();

		// Set Portuguese preference manually
		await page.goto("/dashboard");
		await page.evaluate(() => localStorage.setItem("even-language", "pt-BR"));
		await page.reload();
		await page.waitForLoadState("domcontentloaded");
		await expect(page.getByTestId("kpi-earnings")).toBeVisible({ timeout: 15000 });

		// Should display Portuguese despite Spanish browser locale
		await expect(page.getByTestId("kpi-earnings").getByText("Ganhos Totais")).toBeVisible({
			timeout: 10000,
		});

		await context.close();
	});
});
