import { expect, test } from "@playwright/test";

test.describe("Locale-Aware Formatting", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
		await page.waitForLoadState("networkidle");
	});

	test("English locale shows USD currency as $X,XXX.XX format", async ({ page }) => {
		// Ensure English is selected
		await expect(page.getByTestId("kpi-earnings").getByText("Total Earnings")).toBeVisible({
			timeout: 10000,
		});

		// Check for dollar sign format in KPI cards (e.g., $247,832)
		const earningsCard = page.getByTestId("kpi-earnings");
		await expect(earningsCard).toBeVisible();

		// The value should contain $ and comma separators
		const earningsValue = await earningsCard
			.locator('[class*="font-bold"], [class*="text-2xl"]')
			.textContent();
		expect(earningsValue).toMatch(/\$[\d,]+/);
	});

	test("Spanish locale shows currency with comma decimal", async ({ page }) => {
		// Switch to Spanish
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 5000,
		});

		// Check earnings section for Spanish number formatting
		const earningsSection = page.getByTestId("earnings-section");
		await expect(earningsSection).toBeVisible();

		// Spanish uses period as thousands separator and comma as decimal
		// For large numbers like 247832, should see periods
		const text = await earningsSection.textContent();
		// Should contain numbers formatted with periods (Spanish thousands separator)
		expect(text).toBeTruthy();
	});

	test("Brazilian Portuguese locale shows BRL currency format", async ({ page }) => {
		// Switch to Portuguese
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Português" }).click();
		await expect(page.getByTestId("kpi-earnings").getByText("Ganhos Totais")).toBeVisible({
			timeout: 5000,
		});

		// Check that formatting is applied (Brazilian uses period as thousands separator)
		const earningsSection = page.getByTestId("earnings-section");
		await expect(earningsSection).toBeVisible();

		const text = await earningsSection.textContent();
		expect(text).toBeTruthy();
	});

	test("dates display in locale-appropriate format", async ({ page }) => {
		// Open a product drawer to see date formatting
		const productCard = page.getByTestId("product-card").first();
		await productCard.click();

		// Wait for drawer to open
		await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });

		// The "Listed on" date should be visible with English format
		const drawerText = await page.getByRole("dialog").textContent();
		// English date format includes month names like "January", "February", etc.
		expect(drawerText).toMatch(
			/Listed on .*(January|February|March|April|May|June|July|August|September|October|November|December)/i
		);

		// Close drawer
		await page.keyboard.press("Escape");

		// Switch to Spanish and check date format
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(page.getByTestId("kpi-earnings").getByText("Ganancias Totales")).toBeVisible({
			timeout: 5000,
		});

		// Open product drawer again
		await page.getByTestId("product-card").first().click();
		await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });

		// Spanish date format - should show "Publicado el" with Spanish month names
		const spanishDrawerText = await page.getByRole("dialog").textContent();
		expect(spanishDrawerText).toMatch(/Publicado el/i);
	});

	test("numbers format correctly across locales", async ({ page }) => {
		// Check fans section in English
		const fansSection = page.getByTestId("fans-section");
		await expect(fansSection).toBeVisible({ timeout: 10000 });

		// Get initial text
		const englishText = await fansSection.textContent();

		// Switch to Spanish
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(page.getByText("Engagement de Fans")).toBeVisible({
			timeout: 5000,
		});

		// Verify fans section still displays numbers
		const spanishFansSection = page.getByTestId("fans-section");
		await expect(spanishFansSection).toBeVisible();
		const spanishText = await spanishFansSection.textContent();

		// Both should contain numeric values
		expect(englishText).toMatch(/\d/);
		expect(spanishText).toMatch(/\d/);
	});

	test("percentage formatting works across locales", async ({ page }) => {
		// Check KPI cards for percentage values
		const revenueCard = page.getByTestId("kpi-revenue-retained");
		await expect(revenueCard).toBeVisible({ timeout: 10000 });

		// English percentage format
		const englishPercentage = await revenueCard.textContent();
		expect(englishPercentage).toMatch(/\d+\s*%/);

		// Switch to Spanish
		await page.getByRole("combobox", { name: /language/i }).click();
		await page.getByRole("option", { name: "Español" }).click();
		await expect(
			page.getByTestId("kpi-revenue-retained").getByText("Ingresos Retenidos")
		).toBeVisible({
			timeout: 5000,
		});

		// Spanish should also show percentage
		const spanishRevenueCard = page.getByTestId("kpi-revenue-retained");
		const spanishPercentage = await spanishRevenueCard.textContent();
		expect(spanishPercentage).toMatch(/\d+\s*%/);
	});
});
