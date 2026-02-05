import { test, expect } from "@playwright/test";

test.describe("ADR Creation Workflow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/adr");
	});

	test("should display ADR creation guide link", async ({ page }) => {
		const guideLink = page.getByRole("link", { name: /how to create/i });
		await expect(guideLink).toBeVisible();
	});

	test("should navigate to how-to-create page", async ({ page }) => {
		await page.getByRole("link", { name: /how to create/i }).click();
		await expect(page).toHaveURL(/\/adr\/how-to-create/);
		await expect(page.getByRole("heading", { level: 1 })).toContainText("Create");
	});

	test("should display template download link", async ({ page }) => {
		await page.goto("/adr/how-to-create");
		const templateLink = page.getByRole("link", { name: /template/i });
		await expect(templateLink).toBeVisible();
	});

	test("should navigate to diagram guide", async ({ page }) => {
		await page.goto("/adr/diagram-guide");
		await expect(page.getByRole("heading", { level: 1 })).toContainText("Diagram");
	});

	test("should display mermaid examples in diagram guide", async ({ page }) => {
		await page.goto("/adr/diagram-guide");
		// Check for mermaid code blocks
		const codeBlocks = page.locator("pre code");
		await expect(codeBlocks.first()).toBeVisible();
	});

	test("should navigate to status workflow page", async ({ page }) => {
		await page.goto("/adr/status-workflow");
		await expect(page.getByRole("heading", { level: 1 })).toContainText("Status");
	});

	test("should display status transition diagram", async ({ page }) => {
		await page.goto("/adr/status-workflow");
		// Check for status badges or diagram
		const statusSection = page.locator("text=Proposed");
		await expect(statusSection.first()).toBeVisible();
	});

	test("should show all ADR statuses in workflow", async ({ page }) => {
		await page.goto("/adr/status-workflow");

		// Verify all statuses are documented
		await expect(page.locator("text=Proposed").first()).toBeVisible();
		await expect(page.locator("text=Accepted").first()).toBeVisible();
		await expect(page.locator("text=Deprecated").first()).toBeVisible();
		await expect(page.locator("text=Superseded").first()).toBeVisible();
	});
});
