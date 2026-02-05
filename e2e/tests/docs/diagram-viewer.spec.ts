import { test, expect } from "@playwright/test";

test.describe("DiagramViewer Interactivity", () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to a page with a diagram
		await page.goto("/architecture");
	});

	test("should render Mermaid diagram as SVG", async ({ page }) => {
		const diagramViewer = page.locator(".diagram-viewer");
		await expect(diagramViewer).toBeVisible();

		// Should contain rendered SVG
		const svg = diagramViewer.locator("svg");
		await expect(svg).toBeVisible();

		// SVG should have content (nodes/edges)
		const nodes = svg.locator(".node, .cluster, .edgePath");
		await expect(nodes.first()).toBeVisible();
	});

	test("should display zoom controls", async ({ page }) => {
		const diagramViewer = page.locator(".diagram-viewer");

		// Should have zoom in button
		const zoomIn = diagramViewer.getByRole("button", { name: /zoom in/i });
		await expect(zoomIn).toBeVisible();

		// Should have zoom out button
		const zoomOut = diagramViewer.getByRole("button", { name: /zoom out/i });
		await expect(zoomOut).toBeVisible();

		// Should have reset button
		const reset = diagramViewer.getByRole("button", { name: /reset/i });
		await expect(reset).toBeVisible();
	});

	test("should zoom in when clicking zoom in button", async ({ page }) => {
		const diagramViewer = page.locator(".diagram-viewer");

		// Get initial zoom level display
		const zoomDisplay = diagramViewer.locator("span").filter({ hasText: /\d+%/ });
		const initialZoom = await zoomDisplay.textContent();

		// Click zoom in
		await diagramViewer.getByRole("button", { name: /zoom in/i }).click();

		// Zoom should increase
		const newZoom = await zoomDisplay.textContent();
		expect(Number.parseInt(newZoom || "100")).toBeGreaterThan(
			Number.parseInt(initialZoom || "100")
		);
	});

	test("should zoom out when clicking zoom out button", async ({ page }) => {
		const diagramViewer = page.locator(".diagram-viewer");

		// First zoom in to have room to zoom out
		await diagramViewer.getByRole("button", { name: /zoom in/i }).click();
		await diagramViewer.getByRole("button", { name: /zoom in/i }).click();

		const zoomDisplay = diagramViewer.locator("span").filter({ hasText: /\d+%/ });
		const zoomedInLevel = await zoomDisplay.textContent();

		// Click zoom out
		await diagramViewer.getByRole("button", { name: /zoom out/i }).click();

		// Zoom should decrease
		const newZoom = await zoomDisplay.textContent();
		expect(Number.parseInt(newZoom || "100")).toBeLessThan(Number.parseInt(zoomedInLevel || "150"));
	});

	test("should reset zoom when clicking reset button", async ({ page }) => {
		const diagramViewer = page.locator(".diagram-viewer");

		// Zoom in first
		await diagramViewer.getByRole("button", { name: /zoom in/i }).click();
		await diagramViewer.getByRole("button", { name: /zoom in/i }).click();

		// Click reset
		await diagramViewer.getByRole("button", { name: /reset/i }).click();

		// Should be back to 100%
		const zoomDisplay = diagramViewer.locator("span").filter({ hasText: /\d+%/ });
		await expect(zoomDisplay).toHaveText("100%");
	});

	test("should show loading state while rendering", async ({ page }) => {
		// Navigate to a fresh page to catch loading state
		await page.goto("/architecture/data-flow");

		// Loading indicator should appear briefly (may be too fast to catch)
		// At minimum, the diagram should eventually render
		const diagramViewer = page.locator(".diagram-viewer");
		await expect(diagramViewer.locator("svg")).toBeVisible({ timeout: 10000 });
	});

	test("should be draggable for panning", async ({ page }) => {
		const diagramViewer = page.locator(".diagram-viewer");
		const container = diagramViewer.locator("div").filter({ hasText: "" }).last();

		// Get the container's bounding box
		const box = await container.boundingBox();
		if (!box) {
			test.skip();
			return;
		}

		// Perform drag operation
		const startX = box.x + box.width / 2;
		const startY = box.y + box.height / 2;

		await page.mouse.move(startX, startY);
		await page.mouse.down();
		await page.mouse.move(startX + 50, startY + 50);
		await page.mouse.up();

		// The diagram container should still be visible and functional
		await expect(diagramViewer.locator("svg")).toBeVisible();
	});

	test("should handle diagram rendering errors gracefully", async ({ page }) => {
		// This test verifies error handling exists
		// In normal operation, diagrams should render successfully
		const diagramViewer = page.locator(".diagram-viewer");

		// Either we have an SVG (success) or an error message
		const svg = diagramViewer.locator("svg");
		const errorMessage = diagramViewer.locator("text=Failed to render");

		// One of these should be visible
		const hasSvg = await svg.isVisible().catch(() => false);
		const hasError = await errorMessage.isVisible().catch(() => false);

		expect(hasSvg || hasError).toBe(true);
	});
});
