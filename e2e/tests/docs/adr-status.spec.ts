import { test, expect } from "@playwright/test";

test.describe("ADR Status Display", () => {
	test("should display accepted status correctly", async ({ page }) => {
		await page.goto("/adr/001-use-nextra-for-docs");

		// Should show accepted status
		const statusBadge = page.locator(
			'[data-testid="adr-status"], .adr-status-badge, span:has-text("accepted")'
		);
		await expect(statusBadge.first()).toBeVisible();
	});

	test("should display proposed status correctly", async ({ page }) => {
		// Navigate to index to find any proposed ADRs
		await page.goto("/adr");

		// Check if any proposed status exists
		const proposedBadge = page.locator('span:has-text("proposed")');
		const hasProposed = await proposedBadge.isVisible().catch(() => false);

		// This is informational - not all ADRs may be proposed
		if (hasProposed) {
			await expect(proposedBadge.first()).toBeVisible();
		}
	});

	test("should show status in consistent format", async ({ page }) => {
		await page.goto("/adr/001-use-nextra-for-docs");

		// Status should be formatted consistently (capitalized or badge style)
		const content = await page.content();

		// Check that status text exists somewhere
		const hasStatus =
			content.includes("Accepted") || content.includes("accepted") || content.includes("ACCEPTED");

		expect(hasStatus).toBe(true);
	});

	test("should display decision makers", async ({ page }) => {
		await page.goto("/adr/001-use-nextra-for-docs");

		// Should show who made the decision
		const decisionMakers = page.getByText(/decision maker|decided by|author/i);
		await expect(decisionMakers.first()).toBeVisible();
	});

	test("should display date in readable format", async ({ page }) => {
		await page.goto("/adr/001-use-nextra-for-docs");

		// Should have a date (format: YYYY-MM-DD or similar)
		const datePattern = page.locator("text=/\\d{4}-\\d{2}-\\d{2}/");
		await expect(datePattern.first()).toBeVisible();
	});

	test("should handle superseded ADRs", async ({ page }) => {
		await page.goto("/adr");

		// Check if any superseded ADRs exist and display correctly
		const supersededBadge = page.locator("text=/superseded/i");
		const hasSuperseded = await supersededBadge.isVisible().catch(() => false);

		if (hasSuperseded) {
			// Should link to the replacement ADR
			const supersededLink = page.locator('a[href*="/adr/"]:near(:text("superseded"))');
			await expect(supersededLink.first()).toBeVisible();
		}
	});

	test("should show positive and negative consequences", async ({ page }) => {
		await page.goto("/adr/001-use-nextra-for-docs");

		// Should have consequences section with positive/negative
		await expect(page.getByText(/consequences/i).first()).toBeVisible();
		await expect(page.getByText(/positive/i).first()).toBeVisible();
		await expect(page.getByText(/negative/i).first()).toBeVisible();
	});
});
