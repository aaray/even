import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
	title: "Foundation/Design Tokens",
	parameters: {
		layout: "padded",
	},
};

export default meta;

// Color Tokens Story
const ColorSwatch = ({ name, variable, className }: { name: string; variable: string; className?: string }) => (
	<div className="flex items-center gap-4">
		<div className={`w-16 h-16 rounded-lg border border-border ${className}`} />
		<div>
			<p className="font-medium text-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{variable}</p>
		</div>
	</div>
);

export const Colors: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Background Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorSwatch name="Background" variable="--background" className="bg-background" />
					<ColorSwatch name="Surface/Card" variable="--card" className="bg-card" />
					<ColorSwatch name="Elevated" variable="--elevated" className="bg-[hsl(var(--elevated))]" />
					<ColorSwatch name="Muted" variable="--muted" className="bg-muted" />
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Foreground Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorSwatch name="Foreground" variable="--foreground" className="bg-foreground" />
					<ColorSwatch name="Muted Foreground" variable="--muted-foreground" className="bg-muted-foreground" />
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Brand Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorSwatch name="Primary" variable="--primary" className="bg-primary" />
					<ColorSwatch name="Secondary" variable="--secondary" className="bg-secondary" />
					<ColorSwatch name="Accent" variable="--accent" className="bg-accent" />
					<ColorSwatch name="Destructive" variable="--destructive" className="bg-destructive" />
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Semantic Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorSwatch name="Success" variable="--success" className="bg-success" />
					<ColorSwatch name="Warning" variable="--warning" className="bg-warning" />
					<ColorSwatch name="Info" variable="--info" className="bg-info" />
					<ColorSwatch name="Error" variable="--destructive" className="bg-destructive" />
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">EVEN Category Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorSwatch name="Music" variable="--even-music" className="bg-even-music" />
					<ColorSwatch name="Video" variable="--even-video" className="bg-even-video" />
					<ColorSwatch name="Merch" variable="--even-merch" className="bg-even-merch" />
					<ColorSwatch name="Experience" variable="--even-experience" className="bg-even-experience" />
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">UI Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<ColorSwatch name="Border" variable="--border" className="bg-border" />
					<ColorSwatch name="Input" variable="--input" className="bg-input" />
					<ColorSwatch name="Ring" variable="--ring" className="bg-ring" />
				</div>
			</section>
		</div>
	),
};

// Spacing Scale Story
const SpacingSwatch = ({ name, size, pixels }: { name: string; size: string; pixels: string }) => (
	<div className="flex items-center gap-4">
		<div className="w-32 bg-primary rounded" style={{ height: size }} />
		<div>
			<p className="font-medium text-foreground">{name}</p>
			<p className="text-sm text-muted-foreground">{pixels}</p>
		</div>
	</div>
);

export const Spacing: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Spacing Scale</h2>
				<p className="text-muted-foreground mb-6">Based on 4px base unit. Use for margins, padding, and gaps.</p>
				<div className="space-y-2">
					<SpacingSwatch name="0" size="0" pixels="0px" />
					<SpacingSwatch name="1" size="0.25rem" pixels="4px" />
					<SpacingSwatch name="2" size="0.5rem" pixels="8px" />
					<SpacingSwatch name="3" size="0.75rem" pixels="12px" />
					<SpacingSwatch name="4" size="1rem" pixels="16px" />
					<SpacingSwatch name="5" size="1.25rem" pixels="20px" />
					<SpacingSwatch name="6" size="1.5rem" pixels="24px" />
					<SpacingSwatch name="8" size="2rem" pixels="32px" />
					<SpacingSwatch name="10" size="2.5rem" pixels="40px" />
					<SpacingSwatch name="12" size="3rem" pixels="48px" />
					<SpacingSwatch name="16" size="4rem" pixels="64px" />
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">EVEN Spacing Aliases</h2>
				<p className="text-muted-foreground mb-6">Semantic spacing names for common use cases.</p>
				<div className="space-y-2">
					<SpacingSwatch name="even-xs" size="0.25rem" pixels="4px" />
					<SpacingSwatch name="even-sm" size="0.5rem" pixels="8px" />
					<SpacingSwatch name="even-md" size="1rem" pixels="16px" />
					<SpacingSwatch name="even-lg" size="1.5rem" pixels="24px" />
					<SpacingSwatch name="even-xl" size="2rem" pixels="32px" />
					<SpacingSwatch name="even-2xl" size="3rem" pixels="48px" />
					<SpacingSwatch name="even-3xl" size="4rem" pixels="64px" />
				</div>
			</section>
		</div>
	),
};

// Typography Scale Story
export const Typography: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Typography Scale</h2>
				<p className="text-muted-foreground mb-6">Using Inter font family with adjusted weights.</p>

				<div className="space-y-6">
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-5xl / 48px / Bold</p>
						<p className="text-5xl font-bold text-foreground">Heading 1</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-4xl / 36px / Bold</p>
						<p className="text-4xl font-bold text-foreground">Heading 2</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-3xl / 30px / Bold</p>
						<p className="text-3xl font-bold text-foreground">Heading 3</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-2xl / 24px / Semibold</p>
						<p className="text-2xl font-semibold text-foreground">Heading 4</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-xl / 20px / Semibold</p>
						<p className="text-xl font-semibold text-foreground">Heading 5</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-lg / 18px / Medium</p>
						<p className="text-lg font-medium text-foreground">Heading 6</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Body Text</h2>
				<div className="space-y-4">
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-base / 16px / Normal</p>
						<p className="text-base text-foreground">
							Body text - The quick brown fox jumps over the lazy dog. This is the default size for
							paragraph text.
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-sm / 14px / Normal</p>
						<p className="text-sm text-foreground">
							Small body text - The quick brown fox jumps over the lazy dog. Use for secondary content.
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">text-xs / 12px / Normal</p>
						<p className="text-xs text-foreground">
							Caption text - The quick brown fox jumps over the lazy dog. Use for labels and captions.
						</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Font Weights</h2>
				<div className="space-y-2">
					<p className="text-lg font-normal text-foreground">Normal (400) - Regular text</p>
					<p className="text-lg font-medium text-foreground">Medium (500) - Emphasized text</p>
					<p className="text-lg font-semibold text-foreground">Semibold (600) - Strong emphasis</p>
					<p className="text-lg font-bold text-foreground">Bold (700) - Headings and CTAs</p>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Text Colors</h2>
				<div className="space-y-2">
					<p className="text-foreground">Foreground - Primary text color</p>
					<p className="text-muted-foreground">Muted Foreground - Secondary text color</p>
					<p className="text-primary">Primary - Brand accent text</p>
					<p className="text-destructive">Destructive - Error/warning text</p>
				</div>
			</section>
		</div>
	),
};

// Border Radius Story
export const BorderRadius: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Border Radius Scale</h2>
				<div className="flex flex-wrap gap-4">
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-none" />
						<p className="text-sm text-muted-foreground mt-2">none</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-sm" />
						<p className="text-sm text-muted-foreground mt-2">sm</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-md" />
						<p className="text-sm text-muted-foreground mt-2">md</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-lg" />
						<p className="text-sm text-muted-foreground mt-2">lg</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-xl" />
						<p className="text-sm text-muted-foreground mt-2">xl</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-2xl" />
						<p className="text-sm text-muted-foreground mt-2">2xl</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-full" />
						<p className="text-sm text-muted-foreground mt-2">full</p>
					</div>
				</div>
			</section>
		</div>
	),
};

// Shadows Story
export const Shadows: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Shadow Scale</h2>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8">
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-sm mx-auto" />
						<p className="text-sm text-muted-foreground mt-2">even-sm</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-md mx-auto" />
						<p className="text-sm text-muted-foreground mt-2">even-md</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-lg mx-auto" />
						<p className="text-sm text-muted-foreground mt-2">even-lg</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-xl mx-auto" />
						<p className="text-sm text-muted-foreground mt-2">even-xl</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-glow mx-auto" />
						<p className="text-sm text-muted-foreground mt-2">even-glow</p>
					</div>
				</div>
			</section>
		</div>
	),
};
