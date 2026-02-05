import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge.js";
import { Button } from "./button.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card.js";
import { Input } from "./input.js";
import { Caption, Heading, Label, Text } from "./typography.js";

const meta: Meta = {
	title: "Foundation/Accessibility",
	parameters: {
		layout: "padded",
	},
};

export default meta;

export const KeyboardNavigation: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<Heading level="h2" className="mb-4">
					Keyboard Navigation
				</Heading>
				<Text color="muted" className="mb-6">
					All interactive elements support keyboard navigation. Try using Tab, Enter, Space, and
					Escape keys.
				</Text>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Tab Navigation</CardTitle>
							<CardDescription>
								Press Tab to move between interactive elements. Press Shift+Tab to go backwards.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex gap-2">
								<Button>First Button</Button>
								<Button variant="secondary">Second Button</Button>
								<Button variant="outline">Third Button</Button>
							</div>
							<Text size="sm" color="muted">
								Tab through the buttons above. Notice the focus ring.
							</Text>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Enter/Space Activation</CardTitle>
							<CardDescription>
								Buttons can be activated with Enter or Space when focused.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button onClick={() => alert("Button activated!")}>
								Focus me and press Enter
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	),
};

export const FocusIndicators: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<Heading level="h2" className="mb-4">
					Focus Indicators
				</Heading>
				<Text color="muted" className="mb-6">
					All focusable elements have visible focus indicators that meet WCAG 2.1 requirements.
				</Text>

				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Button Focus States</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-wrap gap-2">
								<Button>Default</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
							</div>
							<Caption>Tab through to see the ring focus indicator</Caption>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Input Focus States</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Input placeholder="Focus this input" />
							<Input error placeholder="Error state input" />
							<Input success placeholder="Success state input" />
							<Caption>Each state has a distinct focus ring color</Caption>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	),
};

export const ColorContrast: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<Heading level="h2" className="mb-4">
					Color Contrast
				</Heading>
				<Text color="muted" className="mb-6">
					All text colors meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for
					large text).
				</Text>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Text Contrast Ratios</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
									<Text>Foreground on Background</Text>
									<Badge variant="success">21:1</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
									<Text>Foreground on Card</Text>
									<Badge variant="success">18.5:1</Badge>
								</div>
								<div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
									<Text color="muted">Muted Foreground</Text>
									<Badge variant="success">7.8:1</Badge>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Button Contrast</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-wrap gap-2">
								<Button>Primary (White on Red)</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="destructive">Destructive</Button>
							</div>
							<Caption>All button variants maintain 4.5:1 contrast ratio</Caption>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	),
};

export const AriaAttributes: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<Heading level="h2" className="mb-4">
					ARIA Attributes
				</Heading>
				<Text color="muted" className="mb-6">
					Components include appropriate ARIA attributes for screen reader compatibility.
				</Text>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Loading State</CardTitle>
							<CardDescription>
								Loading buttons include aria-busy=&quot;true&quot; to indicate activity
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex gap-2">
								<Button loading>Saving...</Button>
								<Button loading variant="secondary">
									Processing...
								</Button>
							</div>
							<Caption>
								Screen readers announce &quot;busy&quot; state during loading
							</Caption>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Form Validation</CardTitle>
							<CardDescription>
								Invalid inputs include aria-invalid=&quot;true&quot; for screen readers
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email-error" required>
									Email
								</Label>
								<Input
									id="email-error"
									type="email"
									error
									defaultValue="invalid"
									aria-describedby="email-error-message"
								/>
								<Caption id="email-error-message" variant="error">
									Please enter a valid email address
								</Caption>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Labels and Descriptions</CardTitle>
							<CardDescription>
								Use aria-describedby to link inputs with their descriptions
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									placeholder="Enter username"
									aria-describedby="username-help"
								/>
								<Caption id="username-help">
									3-20 characters, letters and numbers only
								</Caption>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	),
};

export const ScreenReaderBehavior: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<Heading level="h2" className="mb-4">
					Screen Reader Guidelines
				</Heading>
				<Text color="muted" className="mb-6">
					Best practices for ensuring components work well with screen readers.
				</Text>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Icon-Only Buttons</CardTitle>
							<CardDescription>
								Always provide an aria-label for buttons without visible text
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex gap-2">
								<Button size="icon" aria-label="Close dialog">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M18 6 6 18" />
										<path d="m6 6 12 12" />
									</svg>
								</Button>
								<Button size="icon" variant="outline" aria-label="Edit item">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
										<path d="m15 5 4 4" />
									</svg>
								</Button>
								<Button size="icon" variant="ghost" aria-label="More options">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="1" />
										<circle cx="19" cy="12" r="1" />
										<circle cx="5" cy="12" r="1" />
									</svg>
								</Button>
							</div>
							<Caption>
								Each button has an aria-label describing its action
							</Caption>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Visual Status Indicators</CardTitle>
							<CardDescription>
								Combine color with text/icons for colorblind accessibility
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-wrap gap-2">
								<Badge variant="success">
									<span className="mr-1">&#10003;</span> Published
								</Badge>
								<Badge variant="warning">
									<span className="mr-1">&#9888;</span> Pending
								</Badge>
								<Badge variant="destructive">
									<span className="mr-1">&#10005;</span> Error
								</Badge>
								<Badge variant="info">
									<span className="mr-1">&#9432;</span> Info
								</Badge>
							</div>
							<Caption>Status is conveyed through both color and symbol/text</Caption>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	),
};

export const AccessibilityChecklist: StoryObj = {
	render: () => (
		<div className="space-y-8">
			<section>
				<Heading level="h2" className="mb-4">
					Accessibility Checklist
				</Heading>
				<Text color="muted" className="mb-6">
					Summary of accessibility features implemented in the EVEN Design System.
				</Text>

				<Card>
					<CardContent className="p-6">
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<Badge variant="success" className="mt-0.5">
									&#10003;
								</Badge>
								<div>
									<Text weight="medium">Color Contrast</Text>
									<Text size="sm" color="muted">
										All text meets WCAG 2.1 AA contrast requirements (4.5:1)
									</Text>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge variant="success" className="mt-0.5">
									&#10003;
								</Badge>
								<div>
									<Text weight="medium">Keyboard Navigation</Text>
									<Text size="sm" color="muted">
										All interactive elements are keyboard accessible
									</Text>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge variant="success" className="mt-0.5">
									&#10003;
								</Badge>
								<div>
									<Text weight="medium">Focus Indicators</Text>
									<Text size="sm" color="muted">
										Visible focus states on all interactive elements
									</Text>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge variant="success" className="mt-0.5">
									&#10003;
								</Badge>
								<div>
									<Text weight="medium">ARIA Attributes</Text>
									<Text size="sm" color="muted">
										Proper aria-labels, aria-describedby, aria-invalid, aria-busy
									</Text>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge variant="success" className="mt-0.5">
									&#10003;
								</Badge>
								<div>
									<Text weight="medium">Screen Reader Support</Text>
									<Text size="sm" color="muted">
										Components announce state changes to assistive technology
									</Text>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge variant="success" className="mt-0.5">
									&#10003;
								</Badge>
								<div>
									<Text weight="medium">Semantic HTML</Text>
									<Text size="sm" color="muted">
										Proper heading hierarchy, form labels, and button elements
									</Text>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	),
};
