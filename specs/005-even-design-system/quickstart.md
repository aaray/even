# Quickstart: EVEN Design System

**Feature**: 005-even-design-system
**Date**: 2026-02-05

## Prerequisites

- Node.js 20+
- Bun package manager
- Access to the EVEN monorepo

## Installation

The design system is part of the `@even/ui` package in the monorepo.

### For Existing Monorepo Apps

Components are already available through the workspace dependency:

```tsx
import { Button, Card, Input } from "@even/ui";
import "@even/ui/globals.css"; // Import in your root layout
```

### For New Apps in the Monorepo

1. Add the workspace dependency to your `package.json`:

```json
{
  "dependencies": {
    "@even/ui": "workspace:*"
  }
}
```

2. Import the global styles in your root layout:

```tsx
// app/layout.tsx or _app.tsx
import "@even/ui/globals.css";
```

3. Extend the Tailwind config:

```ts
// tailwind.config.ts
import uiConfig from "@even/ui/tailwind.config";

export default {
  presets: [uiConfig],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
```

## Basic Usage

### Buttons

```tsx
import { Button } from "@even/ui";

function Example() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button loading>Loading...</Button>
    </div>
  );
}
```

### Cards

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@even/ui";

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content...</p>
      </CardContent>
    </Card>
  );
}
```

### Forms

```tsx
import { Input, Label, Button } from "@even/ui";

function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" className="w-full">Sign In</Button>
    </form>
  );
}
```

### Feedback Components

```tsx
import { Alert, AlertTitle, AlertDescription } from "@even/ui";

function Example() {
  return (
    <Alert variant="success">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  );
}
```

### Using Design Tokens via Tailwind

The design system extends Tailwind with EVEN-specific utilities:

```tsx
// Colors
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="text-muted-foreground" />

// Category colors (music, video, merch, experience)
<div className="bg-even-music" />
<div className="text-even-video" />

// Shadows and effects
<div className="shadow-glow" />
<div className="glass-card" />

// Typography
<h1 className="text-5xl font-bold" />
<p className="text-muted-foreground" />
```

## Running Storybook

To explore all components interactively:

```bash
cd apps/storybook
bun run dev
```

Then open http://localhost:6006 in your browser.

## Dark Mode

The design system uses dark mode by default. To enable light mode:

```tsx
// In your root layout
<html className="light">
  <body>...</body>
</html>
```

Or toggle dynamically:

```tsx
document.documentElement.classList.toggle("dark");
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Keyboard navigation works on all interactive components
- Color contrast meets minimum requirements
- Screen reader labels are provided
- Focus states are visible

Run accessibility audits in Storybook using the A11y addon tab.

## Component Reference

See the full component documentation in Storybook or refer to:

- [Data Model](./data-model.md) - Component interfaces and props
- [Contracts](./contracts/component-props.ts) - TypeScript type definitions
- [Research](./research.md) - Design decisions and rationale

## Troubleshooting

### Styles not applying

1. Ensure `@even/ui/globals.css` is imported in your root layout
2. Check that your Tailwind config extends the UI package config
3. Verify the content paths include the UI package source

### TypeScript errors

Ensure your `tsconfig.json` includes the UI package:

```json
{
  "compilerOptions": {
    "paths": {
      "@even/ui": ["../../packages/ui/src"],
      "@even/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

### Component not found

All components are exported from the main entry point. If a component is missing, it may be a new addition - check the package version and run `bun install`.
