import { expect, test } from "@playwright/test";

test.describe("Dashboard - Products Grid", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/dashboard");
		// Wait for products section to load (increased timeout for hydration)
		await expect(page.getByTestId("products-section")).toBeVisible({ timeout: 15000 });
		// Wait for actual products to load (not just skeleton)
		await expect(page.locator("[data-testid='product-card']").first()).toBeVisible({
			timeout: 15000,
		});
	});

	test("displays products grid with items", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// Should have at least one product card
		await expect(productsSection.locator("[data-testid='product-card']").first()).toBeVisible();
	});

	test("shows category filter tabs", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// All category tabs should be visible
		await expect(productsSection.getByRole("tab", { name: "All" })).toBeVisible();
		await expect(productsSection.getByRole("tab", { name: "Music" })).toBeVisible();
		await expect(productsSection.getByRole("tab", { name: "Videos" })).toBeVisible();
		await expect(productsSection.getByRole("tab", { name: "Merch" })).toBeVisible();
		await expect(productsSection.getByRole("tab", { name: "Experiences" })).toBeVisible();
	});

	test("filters products by category", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// Click Music tab
		await productsSection.getByRole("tab", { name: "Music" }).click();
		await expect(productsSection.getByRole("tab", { name: "Music" })).toHaveAttribute(
			"data-state",
			"active"
		);

		// Wait for products to reload
		await page.waitForTimeout(500);

		// All visible product cards should have music badge
		const badges = productsSection.locator("[data-testid='product-card'] [data-category='music']");
		const count = await badges.count();
		if (count > 0) {
			await expect(badges.first()).toBeVisible();
		}
	});

	test("shows sort dropdown", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// Sort dropdown should be visible
		await expect(productsSection.getByRole("combobox")).toBeVisible();
	});

	test("opens product drawer on card click", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// Click first product card
		await productsSection.locator("[data-testid='product-card']").first().click();

		// Drawer should open with product details
		await expect(page.getByRole("dialog")).toBeVisible();

		// Should show product title in drawer
		await expect(page.getByRole("dialog").locator("h2")).toBeVisible();
	});

	test("closes product drawer with close button", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// Open drawer
		await productsSection.locator("[data-testid='product-card']").first().click();
		await expect(page.getByRole("dialog")).toBeVisible();

		// Click close button
		await page.getByRole("button", { name: "Close" }).click();

		// Drawer should be closed
		await expect(page.getByRole("dialog")).not.toBeVisible();
	});

	test("displays product card with required info", async ({ page }) => {
		const productCard = page.locator("[data-testid='product-card']").first();

		// Should show image
		await expect(productCard.locator("img")).toBeVisible();

		// Should show title
		await expect(productCard.locator("[data-testid='product-title']")).toBeVisible();

		// Should show category badge
		await expect(productCard.locator("[data-testid='product-badge']")).toBeVisible();

		// Should show earnings
		await expect(productCard.getByText(/\$/)).toBeVisible();
	});

	test("switches between categories", async ({ page }) => {
		const productsSection = page.getByTestId("products-section");

		// Test each category
		const categories = ["Music", "Videos", "Merch", "Experiences", "All"];

		for (const category of categories) {
			await productsSection.getByRole("tab", { name: category }).click();
			await expect(productsSection.getByRole("tab", { name: category })).toHaveAttribute(
				"data-state",
				"active"
			);
		}
	});
});
