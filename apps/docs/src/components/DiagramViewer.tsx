"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface DiagramViewerProps {
	/** Mermaid diagram source code */
	diagram: string;
	/** Optional title for the diagram */
	title?: string;
	/** Map of node IDs to page paths for drill-down navigation */
	nodeLinks?: Record<string, string>;
	/** Custom class name */
	className?: string;
}

/**
 * DiagramViewer renders Mermaid diagrams with interactive features:
 * - Zoom in/out with buttons or scroll wheel
 * - Pan by dragging
 * - Click on nodes to navigate to detail pages
 */
export function DiagramViewer({
	diagram,
	title,
	nodeLinks = {},
	className = "",
}: DiagramViewerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgContainerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const router = useRouter();

	// Initialize Mermaid and render diagram
	useEffect(() => {
		const renderDiagram = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const mermaid = (await import("mermaid")).default;

				mermaid.initialize({
					startOnLoad: false,
					theme: "dark",
					themeVariables: {
						primaryColor: "#a855f7",
						primaryTextColor: "#fff",
						primaryBorderColor: "#7c3aed",
						lineColor: "#6b7280",
						secondaryColor: "#1f2937",
						tertiaryColor: "#111827",
					},
					flowchart: {
						htmlLabels: true,
						curve: "basis",
					},
					securityLevel: "loose",
				});

				// Generate unique ID for this diagram
				const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

				const { svg } = await mermaid.render(id, diagram);

				if (svgContainerRef.current) {
					svgContainerRef.current.innerHTML = svg;

					// Add click handlers for node navigation
					if (Object.keys(nodeLinks).length > 0) {
						const nodes =
							svgContainerRef.current.querySelectorAll(".node, .cluster");
						for (const node of nodes) {
							const nodeId = node.id || node.getAttribute("data-id");
							if (nodeId && nodeLinks[nodeId]) {
								node.setAttribute("style", "cursor: pointer;");
								node.addEventListener("click", () => {
									router.push(nodeLinks[nodeId]);
								});
							}
						}
					}
				}

				setIsLoading(false);
			} catch (err) {
				console.error("Mermaid rendering error:", err);
				setError(err instanceof Error ? err.message : "Failed to render diagram");
				setIsLoading(false);
			}
		};

		renderDiagram();
	}, [diagram, nodeLinks, router]);

	// Zoom handlers
	const handleZoomIn = useCallback(() => {
		setScale((prev) => Math.min(prev + 0.25, 3));
	}, []);

	const handleZoomOut = useCallback(() => {
		setScale((prev) => Math.max(prev - 0.25, 0.25));
	}, []);

	const handleResetZoom = useCallback(() => {
		setScale(1);
		setPosition({ x: 0, y: 0 });
	}, []);

	// Wheel zoom
	const handleWheel = useCallback((e: React.WheelEvent) => {
		if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.1 : 0.1;
			setScale((prev) => Math.max(0.25, Math.min(3, prev + delta)));
		}
	}, []);

	// Pan handlers
	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (e.button === 0) {
				setIsDragging(true);
				setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
			}
		},
		[position],
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (isDragging) {
				setPosition({
					x: e.clientX - dragStart.x,
					y: e.clientY - dragStart.y,
				});
			}
		},
		[isDragging, dragStart],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	return (
		<div className={`diagram-viewer ${className}`}>
			{title && (
				<h4 className="text-lg font-semibold mb-2 text-zinc-200">{title}</h4>
			)}

			{/* Zoom controls */}
			<div className="flex items-center gap-2 mb-2">
				<button
					type="button"
					onClick={handleZoomOut}
					className="px-2 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700"
					aria-label="Zoom out"
				>
					−
				</button>
				<span className="text-sm text-zinc-400 min-w-[4rem] text-center">
					{Math.round(scale * 100)}%
				</span>
				<button
					type="button"
					onClick={handleZoomIn}
					className="px-2 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700"
					aria-label="Zoom in"
				>
					+
				</button>
				<button
					type="button"
					onClick={handleResetZoom}
					className="px-2 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700"
					aria-label="Reset zoom"
				>
					Reset
				</button>
			</div>

			{/* Diagram container */}
			<div
				ref={containerRef}
				className="relative overflow-hidden border border-zinc-800 rounded-lg bg-zinc-950 min-h-[300px]"
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				style={{ cursor: isDragging ? "grabbing" : "grab" }}
			>
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-full h-full p-4">
							{/* Skeleton placeholder */}
							<div className="w-full h-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded animate-pulse bg-[length:200%_100%] animate-shimmer">
								<div className="flex flex-col items-center justify-center h-full gap-2">
									<div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
									<span className="text-sm text-zinc-400">Loading diagram...</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{error && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center p-4">
							<p className="text-red-400 mb-2">Failed to render diagram</p>
							<p className="text-sm text-zinc-500">{error}</p>
						</div>
					</div>
				)}

				<div
					ref={svgContainerRef}
					className="p-4"
					style={{
						transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
						transformOrigin: "center center",
						transition: isDragging ? "none" : "transform 0.1s ease-out",
					}}
				/>
			</div>

			{Object.keys(nodeLinks).length > 0 && (
				<p className="text-xs text-zinc-500 mt-2">
					Click on components to view details
				</p>
			)}
		</div>
	);
}

export default DiagramViewer;
