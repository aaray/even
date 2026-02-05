import { test, expect } from "@playwright/test";

test.describe("Architecture Documentation Navigation", () => {
	test.beforeEach(async ({ page }) => {
		// Ensure we're testing the docs site
		await page.goto("/");
	});

	test("should display architecture section in navigation", async ({
		page,
	}) => {
		// Check that the Architecture link exists in navigation
		const archLink = page.getByRole("link", { name: /architecture/i });
		await expect(archLink).toBeVisible();
	});

	test("should navigate to architecture overview page", async ({ page }) => {
		// Click on Architecture in navigation
		await page.getByRole("link", { name: /architecture/i }).first().click();

		// Should be on architecture page
		await expect(page).toHaveURL(/\/architecture/);

		// Should see the page title
		await expect(
			page.getByRole("heading", { name: /architecture/i }),
		).toBeVisible();
	});

	test("should display system architecture diagram on overview page", async ({
		page,
	}) => {
		await page.goto("/architecture");

		// Should have a diagram viewer component
		const diagramViewer = page.locator(".diagram-viewer");
		await expect(diagramViewer).toBeVisible();

		// Diagram should contain SVG content
		const svg = diagramViewer.locator("svg");
		await expect(svg).toBeVisible();
	});

	test("should navigate from overview to component details", async ({
		page,
	}) => {
		await page.goto("/architecture");

		// Click on Components link in sidebar or content
		await page.getByRole("link", { name: /components/i }).first().click();

		// Should be on components page
		await expect(page).toHaveURL(/\/architecture\/components/);

		// Should see component documentation
		await expect(
			page.getByRole("heading", { name: /components/i }),
		).toBeVisible();
	});

	test("should navigate to individual component pages", async ({ page }) => {
		await page.goto("/architecture/components");

		// Click on Web App component link
		const webAppLink = page.getByRole("link", { name: /web app/i });
		if (await webAppLink.isVisible()) {
			await webAppLink.click();
			await expect(page).toHaveURL(/\/architecture\/components\/web-app/);
		}
	});

	test("should display data flow diagrams", async ({ page }) => {
		await page.goto("/architecture/data-flow");

		// Should have sequence diagrams visible
		const diagramViewer = page.locator(".diagram-viewer");
		await expect(diagramViewer.first()).toBeVisible();
	});

	test("should have breadcrumb navigation", async ({ page }) => {
		await page.goto("/architecture/components/web-app");

		// Should show breadcrumb trail
		const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
		await expect(breadcrumb).toBeVisible();

		// Should have links back to parent pages
		await expect(breadcrumb.getByRole("link", { name: /docs/i })).toBeVisible();
		await expect(
			breadcrumb.getByRole("link", { name: /architecture/i }),
		).toBeVisible();
	});
});
