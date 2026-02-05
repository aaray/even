import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
	title: "Foundation/Tailwind Utilities",
	parameters: {
		layout: "padded",
	},
};

export default meta;

// Color Utilities Story
export const ColorUtilities: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Background Colors</h2>
				<p className="text-muted-foreground mb-6">Use bg-* utilities for background colors.</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-background" />
						<p className="text-sm text-muted-foreground">bg-background</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-card" />
						<p className="text-sm text-muted-foreground">bg-card</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-even-surface" />
						<p className="text-sm text-muted-foreground">bg-even-surface</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-even-elevated" />
						<p className="text-sm text-muted-foreground">bg-even-elevated</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-primary" />
						<p className="text-sm text-muted-foreground">bg-primary</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-secondary" />
						<p className="text-sm text-muted-foreground">bg-secondary</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-muted" />
						<p className="text-sm text-muted-foreground">bg-muted</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-accent" />
						<p className="text-sm text-muted-foreground">bg-accent</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Semantic Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-success" />
						<p className="text-sm text-muted-foreground">bg-success</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-warning" />
						<p className="text-sm text-muted-foreground">bg-warning</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-info" />
						<p className="text-sm text-muted-foreground">bg-info</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-destructive" />
						<p className="text-sm text-muted-foreground">bg-destructive</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">EVEN Category Colors</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-even-music" />
						<p className="text-sm text-muted-foreground">bg-even-music</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-even-video" />
						<p className="text-sm text-muted-foreground">bg-even-video</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-even-merch" />
						<p className="text-sm text-muted-foreground">bg-even-merch</p>
					</div>
					<div className="space-y-2">
						<div className="w-full h-16 rounded-lg border border-border bg-even-experience" />
						<p className="text-sm text-muted-foreground">bg-even-experience</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Text Colors</h2>
				<div className="space-y-2">
					<p className="text-foreground">text-foreground - Primary text</p>
					<p className="text-muted-foreground">text-muted-foreground - Secondary text</p>
					<p className="text-even-primary">text-even-primary - EVEN primary text</p>
					<p className="text-even-muted">text-even-muted - EVEN muted text</p>
					<p className="text-primary">text-primary - Brand accent</p>
					<p className="text-success">text-success - Success text</p>
					<p className="text-warning">text-warning - Warning text</p>
					<p className="text-info">text-info - Info text</p>
					<p className="text-destructive">text-destructive - Error text</p>
				</div>
			</section>
		</div>
	),
};

// Spacing Utilities Story
export const SpacingUtilities: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Gap Utilities</h2>
				<p className="text-muted-foreground mb-6">Use gap-even-* utilities for consistent spacing in flex/grid layouts.</p>

				<div className="space-y-6">
					<div>
						<p className="text-sm text-muted-foreground mb-2">gap-even-xs (4px)</p>
						<div className="flex gap-even-xs bg-card p-4 rounded-lg">
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">gap-even-sm (8px)</p>
						<div className="flex gap-even-sm bg-card p-4 rounded-lg">
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">gap-even-md (16px)</p>
						<div className="flex gap-even-md bg-card p-4 rounded-lg">
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">gap-even-lg (24px)</p>
						<div className="flex gap-even-lg bg-card p-4 rounded-lg">
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">gap-even-xl (32px)</p>
						<div className="flex gap-even-xl bg-card p-4 rounded-lg">
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Padding Utilities</h2>
				<p className="text-muted-foreground mb-6">Use p-even-* utilities for consistent padding.</p>

				<div className="space-y-4">
					<div>
						<p className="text-sm text-muted-foreground mb-2">p-even-xs (4px)</p>
						<div className="p-even-xs bg-card rounded-lg inline-block">
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">p-even-sm (8px)</p>
						<div className="p-even-sm bg-card rounded-lg inline-block">
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">p-even-md (16px)</p>
						<div className="p-even-md bg-card rounded-lg inline-block">
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>

					<div>
						<p className="text-sm text-muted-foreground mb-2">p-even-lg (24px)</p>
						<div className="p-even-lg bg-card rounded-lg inline-block">
							<div className="w-12 h-12 bg-primary rounded" />
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Margin Utilities</h2>
				<p className="text-muted-foreground mb-6">Use m-even-* utilities for consistent margins.</p>

				<div className="bg-card p-4 rounded-lg">
					<div className="mb-even-xs bg-primary h-8 rounded" />
					<p className="text-xs text-muted-foreground">mb-even-xs</p>
					<div className="mb-even-sm bg-primary h-8 rounded" />
					<p className="text-xs text-muted-foreground">mb-even-sm</p>
					<div className="mb-even-md bg-primary h-8 rounded" />
					<p className="text-xs text-muted-foreground">mb-even-md</p>
					<div className="mb-even-lg bg-primary h-8 rounded" />
					<p className="text-xs text-muted-foreground">mb-even-lg</p>
					<div className="bg-primary h-8 rounded" />
				</div>
			</section>
		</div>
	),
};

// Shadow Utilities Story
export const ShadowUtilities: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Shadow Utilities</h2>
				<p className="text-muted-foreground mb-6">Use shadow-even-* utilities for consistent elevation.</p>

				<div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8">
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-sm mx-auto" />
						<p className="text-sm text-muted-foreground mt-4">shadow-even-sm</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-md mx-auto" />
						<p className="text-sm text-muted-foreground mt-4">shadow-even-md</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-lg mx-auto" />
						<p className="text-sm text-muted-foreground mt-4">shadow-even-lg</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-xl mx-auto" />
						<p className="text-sm text-muted-foreground mt-4">shadow-even-xl</p>
					</div>
					<div className="text-center">
						<div className="w-24 h-24 bg-card rounded-lg shadow-even-glow mx-auto" />
						<p className="text-sm text-muted-foreground mt-4">shadow-even-glow</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Card Examples with Shadows</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-card rounded-lg p-6 shadow-even-sm">
						<h3 className="font-semibold text-foreground mb-2">Subtle Card</h3>
						<p className="text-muted-foreground text-sm">Uses shadow-even-sm for subtle depth</p>
					</div>
					<div className="bg-card rounded-lg p-6 shadow-even-md">
						<h3 className="font-semibold text-foreground mb-2">Standard Card</h3>
						<p className="text-muted-foreground text-sm">Uses shadow-even-md for normal elevation</p>
					</div>
					<div className="bg-card rounded-lg p-6 shadow-even-glow">
						<h3 className="font-semibold text-foreground mb-2">Highlighted Card</h3>
						<p className="text-muted-foreground text-sm">Uses shadow-even-glow for emphasis</p>
					</div>
				</div>
			</section>
		</div>
	),
};

// Border Radius Utilities Story
export const BorderRadiusUtilities: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Border Radius Utilities</h2>
				<p className="text-muted-foreground mb-6">Use rounded-* utilities for consistent corner radius.</p>

				<div className="flex flex-wrap gap-6">
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-none" />
						<p className="text-sm text-muted-foreground mt-2">rounded-none</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-sm" />
						<p className="text-sm text-muted-foreground mt-2">rounded-sm</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded" />
						<p className="text-sm text-muted-foreground mt-2">rounded</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-md" />
						<p className="text-sm text-muted-foreground mt-2">rounded-md</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-lg" />
						<p className="text-sm text-muted-foreground mt-2">rounded-lg</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-xl" />
						<p className="text-sm text-muted-foreground mt-2">rounded-xl</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-2xl" />
						<p className="text-sm text-muted-foreground mt-2">rounded-2xl</p>
					</div>
					<div className="text-center">
						<div className="w-20 h-20 bg-card border border-border rounded-full" />
						<p className="text-sm text-muted-foreground mt-2">rounded-full</p>
					</div>
				</div>
			</section>
		</div>
	),
};

// Animation Utilities Story
export const AnimationUtilities: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Animation Utilities</h2>
				<p className="text-muted-foreground mb-6">Built-in animation utilities for common transitions.</p>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="w-16 h-16 bg-primary rounded-lg mx-auto animate-spin" />
						<p className="text-sm text-muted-foreground mt-4">animate-spin</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-primary rounded-lg mx-auto animate-fade-in" />
						<p className="text-sm text-muted-foreground mt-4">animate-fade-in</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-primary rounded-lg mx-auto animate-slide-in-from-right" />
						<p className="text-sm text-muted-foreground mt-4">animate-slide-in-from-right</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Gradient Backgrounds</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="h-32 rounded-lg bg-gradient-warm" />
					<p className="text-sm text-muted-foreground">bg-gradient-warm</p>
					<div className="h-32 rounded-lg bg-gradient-cool" />
					<p className="text-sm text-muted-foreground">bg-gradient-cool</p>
				</div>
			</section>
		</div>
	),
};

// Composite Example Story
export const CompositeExample: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Composite Example</h2>
				<p className="text-muted-foreground mb-6">
					Combining multiple EVEN utilities to build real UI patterns.
				</p>

				{/* Artist Card Example */}
				<div className="max-w-sm bg-card rounded-xl p-even-md shadow-even-md hover:shadow-even-lg transition-shadow">
					<div className="flex gap-even-md items-center mb-even-md">
						<div className="w-16 h-16 rounded-full bg-gradient-warm" />
						<div>
							<h3 className="font-semibold text-foreground">Artist Name</h3>
							<p className="text-even-muted text-sm">@artisthandle</p>
						</div>
					</div>
					<div className="flex gap-even-sm">
						<span className="px-3 py-1 bg-even-music text-white text-xs rounded-full">Music</span>
						<span className="px-3 py-1 bg-even-merch text-white text-xs rounded-full">Merch</span>
					</div>
					<div className="mt-even-md pt-even-md border-t border-border">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Total Earnings</span>
							<span className="text-foreground font-semibold">$12,450</span>
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-bold text-foreground mb-4">Stats Grid</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-even-md">
					<div className="bg-card rounded-lg p-even-md shadow-even-sm">
						<p className="text-even-muted text-sm">Streams</p>
						<p className="text-2xl font-bold text-foreground">1.2M</p>
						<p className="text-success text-sm">+12%</p>
					</div>
					<div className="bg-card rounded-lg p-even-md shadow-even-sm">
						<p className="text-even-muted text-sm">Revenue</p>
						<p className="text-2xl font-bold text-foreground">$8.5K</p>
						<p className="text-success text-sm">+8%</p>
					</div>
					<div className="bg-card rounded-lg p-even-md shadow-even-sm">
						<p className="text-even-muted text-sm">Fans</p>
						<p className="text-2xl font-bold text-foreground">45K</p>
						<p className="text-warning text-sm">-2%</p>
					</div>
					<div className="bg-card rounded-lg p-even-md shadow-even-sm">
						<p className="text-even-muted text-sm">Products</p>
						<p className="text-2xl font-bold text-foreground">24</p>
						<p className="text-info text-sm">New</p>
					</div>
				</div>
			</section>
		</div>
	),
};
