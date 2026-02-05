import Image from "next/image";

interface Callout {
	x: number; // percentage from left
	y: number; // percentage from top
	label: string;
	description?: string;
}

interface AnnotatedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	callouts?: Callout[];
	caption?: string;
}

/**
 * Displays an image with numbered callout annotations.
 * Useful for annotating screenshots in user manuals.
 */
export function AnnotatedImage({
	src,
	alt,
	width = 800,
	height = 450,
	callouts = [],
	caption,
}: AnnotatedImageProps) {
	return (
		<figure className="my-6">
			<div className="relative border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className="w-full h-auto"
				/>
				{callouts.map((callout, index) => (
					<div
						key={`${callout.label}-${index}`}
						className="absolute group"
						style={{
							left: `${callout.x}%`,
							top: `${callout.y}%`,
							transform: "translate(-50%, -50%)",
						}}
					>
						<span className="flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg cursor-help">
							{index + 1}
						</span>
						{callout.description && (
							<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 text-zinc-200 text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
								<strong>{callout.label}:</strong> {callout.description}
								<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
							</div>
						)}
					</div>
				))}
			</div>
			{(caption || callouts.length > 0) && (
				<figcaption className="mt-3 text-sm text-zinc-400">
					{caption && <p>{caption}</p>}
					{callouts.length > 0 && (
						<ol className="mt-2 space-y-1 list-decimal list-inside">
							{callouts.map((callout) => (
								<li key={`legend-${callout.label}`}>
									<strong>{callout.label}</strong>
									{callout.description && `: ${callout.description}`}
								</li>
							))}
						</ol>
					)}
				</figcaption>
			)}
		</figure>
	);
}

export default AnnotatedImage;
