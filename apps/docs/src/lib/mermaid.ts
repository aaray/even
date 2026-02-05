/**
 * Mermaid initialization utilities for the documentation site.
 * Provides consistent theming and configuration for all diagrams.
 */

import type { MermaidConfig } from "mermaid";

/**
 * Default Mermaid configuration for EVEN documentation.
 * Uses dark theme with purple accent colors to match the brand.
 */
export const defaultMermaidConfig: MermaidConfig = {
	startOnLoad: false,
	theme: "dark",
	themeVariables: {
		// Primary colors (purple brand)
		primaryColor: "#a855f7",
		primaryTextColor: "#ffffff",
		primaryBorderColor: "#7c3aed",

		// Secondary colors
		secondaryColor: "#1f2937",
		secondaryTextColor: "#e5e7eb",
		secondaryBorderColor: "#374151",

		// Tertiary colors
		tertiaryColor: "#111827",
		tertiaryTextColor: "#9ca3af",
		tertiaryBorderColor: "#1f2937",

		// Line and arrow colors
		lineColor: "#6b7280",

		// Note colors
		noteBkgColor: "#1e1b4b",
		noteTextColor: "#c4b5fd",
		noteBorderColor: "#4c1d95",

		// Actor colors (sequence diagrams)
		actorBkg: "#a855f7",
		actorTextColor: "#ffffff",
		actorBorder: "#7c3aed",
		actorLineColor: "#6b7280",

		// Signal colors
		signalColor: "#e5e7eb",
		signalTextColor: "#e5e7eb",

		// Label colors
		labelBoxBkgColor: "#1f2937",
		labelBoxBorderColor: "#374151",
		labelTextColor: "#e5e7eb",

		// Loop colors
		loopTextColor: "#e5e7eb",

		// Activation colors
		activationBkgColor: "#374151",
		activationBorderColor: "#6b7280",

		// Sequence numbers
		sequenceNumberColor: "#ffffff",

		// Pie chart colors
		pie1: "#a855f7",
		pie2: "#3b82f6",
		pie3: "#22c55e",
		pie4: "#f97316",
		pie5: "#ec4899",
		pie6: "#06b6d4",
		pie7: "#eab308",
		pie8: "#ef4444",
		pieStrokeColor: "#1f2937",
		pieStrokeWidth: "2px",
		pieTitleTextSize: "16px",
		pieTitleTextColor: "#e5e7eb",
		pieLegendTextSize: "12px",
		pieLegendTextColor: "#9ca3af",

		// Flowchart specific
		nodeTextColor: "#e5e7eb",

		// Fonts
		fontFamily:
			'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	},
	flowchart: {
		htmlLabels: true,
		curve: "basis",
		padding: 15,
		nodeSpacing: 50,
		rankSpacing: 50,
		diagramPadding: 8,
	},
	sequence: {
		diagramMarginX: 50,
		diagramMarginY: 10,
		actorMargin: 50,
		width: 150,
		height: 65,
		boxMargin: 10,
		boxTextMargin: 5,
		noteMargin: 10,
		messageMargin: 35,
		mirrorActors: true,
		bottomMarginAdj: 1,
		useMaxWidth: true,
		rightAngles: false,
		showSequenceNumbers: false,
	},
	securityLevel: "loose",
	logLevel: "error",
};

/**
 * Initialize Mermaid with the default configuration.
 * Call this once when the app loads.
 */
export async function initializeMermaid(): Promise<void> {
	const mermaid = (await import("mermaid")).default;
	mermaid.initialize(defaultMermaidConfig);
}

/**
 * Render a Mermaid diagram and return the SVG string.
 * @param source - The Mermaid diagram source code
 * @param id - Optional unique ID for the diagram
 * @returns The rendered SVG string
 */
export async function renderDiagram(source: string, id?: string): Promise<string> {
	const mermaid = (await import("mermaid")).default;
	const diagramId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;
	const { svg } = await mermaid.render(diagramId, source);
	return svg;
}

/**
 * Validate a Mermaid diagram source without rendering.
 * Useful for checking syntax before committing.
 * @param source - The Mermaid diagram source code
 * @returns True if valid, throws error if invalid
 */
export async function validateDiagram(source: string): Promise<boolean> {
	const mermaid = (await import("mermaid")).default;
	await mermaid.parse(source);
	return true;
}
