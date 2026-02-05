# Data Model: EVEN Design System

**Feature**: 005-even-design-system
**Date**: 2026-02-05

## Overview

This document defines the component interfaces (props) and design token structures for the EVEN Design System. Components follow React patterns with TypeScript strict typing.

## Design Token Entities

### ColorToken

Named color values that map to CSS variables.

```typescript
interface ColorToken {
  name: string;           // e.g., "background", "primary"
  cssVariable: string;    // e.g., "--background"
  hslValue: string;       // e.g., "0 0% 0%"
  description?: string;   // Usage documentation
}
```

**Color Categories**:

| Category | Tokens |
|----------|--------|
| Background | background, surface, elevated, overlay |
| Foreground | foreground, foreground-muted |
| Brand | primary, primary-foreground, secondary, accent |
| Semantic | success, warning, error, info |
| UI | border, input, ring, card |

### SpacingToken

Spacing values following 4px base unit.

```typescript
interface SpacingToken {
  name: string;    // e.g., "4", "8", "16"
  value: string;   // e.g., "1rem"
  pixels: number;  // e.g., 16
}
```

**Spacing Scale**:
0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64, 96 (in 4px units)

### TypographyToken

Typography configuration for text styles.

```typescript
interface TypographyToken {
  name: string;        // e.g., "heading-1", "body"
  fontSize: string;    // e.g., "2.25rem"
  fontWeight: number;  // e.g., 700
  lineHeight: number;  // e.g., 1.1
  letterSpacing?: string;
}
```

## Component Interfaces

### Core Components

#### Button

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'pill';
  asChild?: boolean;
  loading?: boolean;  // NEW: Shows spinner
}
```

#### Input

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;      // NEW: Error state styling
  success?: boolean;    // NEW: Success state styling
}
```

#### Card

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';  // NEW: variants
}
```

#### Badge

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
          | 'success' | 'warning' | 'info'  // NEW: semantic variants
          | 'music' | 'video' | 'merch' | 'experience';
  size?: 'default' | 'sm';
}
```

### New Components

#### Alert (FR-501)

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
```

#### Breadcrumb (FR-304)

```typescript
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;  // Default: "/"
}

interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {}
interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {}
interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}
interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {}
interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}
```

#### Checkbox (FR-403)

```typescript
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean;
}
```

#### Radio Group (FR-404)

```typescript
interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  orientation?: 'horizontal' | 'vertical';
}

interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}
```

#### Switch (FR-405)

```typescript
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  labelPosition?: 'left' | 'right';
}
```

#### Textarea (FR-402)

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
}
```

#### Popover (FR-505)

```typescript
interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}
interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {}
interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}
```

#### Progress (FR-703)

```typescript
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;        // 0-100
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
```

#### Spinner (FR-702)

```typescript
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary';
}
```

#### Scroll Area (FR-704)

```typescript
interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  orientation?: 'vertical' | 'horizontal' | 'both';
}
```

#### Container (FR-601)

```typescript
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';  // max-width variants
  padding?: boolean;  // Apply responsive padding
}
```

#### Divider (FR-604)

```typescript
interface DividerProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}
```

#### Typography (FR-206)

```typescript
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  muted?: boolean;
  as?: 'p' | 'span' | 'div';
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  error?: boolean;
}
```

### Navigation Components

#### Header (FR-301)

```typescript
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  sticky?: boolean;
}

interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {}
interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}
```

#### Sidebar (FR-302)

```typescript
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
}

interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  active?: boolean;
  asChild?: boolean;
}
```

#### Form (FR-406)

```typescript
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  error?: string;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}
```

## Relationships

```
Design Tokens
    └── Colors, Spacing, Typography, Radius, Shadow

Components
    ├── Core (Button, Input, Card, Badge, Avatar, Typography)
    │   └── Use: Design Tokens
    │
    ├── Form (Checkbox, Radio, Switch, Textarea, Select, Form)
    │   └── Use: Core Components, Design Tokens
    │
    ├── Navigation (Header, Sidebar, Tabs, Breadcrumb)
    │   └── Use: Core Components, Design Tokens
    │
    ├── Feedback (Alert, Toast, Dialog, Tooltip, Popover)
    │   └── Use: Core Components, Design Tokens
    │
    ├── Layout (Container, Divider, ScrollArea)
    │   └── Use: Design Tokens
    │
    └── Utility (Skeleton, Spinner, Progress)
        └── Use: Design Tokens

Storybook Stories
    └── One story file per component
        └── Exports: Default, Variants, States, Playground
```

## Validation Rules

| Component | Validation |
|-----------|------------|
| Button | variant must be one of defined variants |
| Progress | value must be 0-100 |
| Heading | level must be 1-6 |
| Container | size must be one of defined sizes |
| All | className merges with defaults via cn() utility |

## State Transitions

### Toggle Components (Checkbox, Switch, Radio)

```
unchecked ─── onCheckedChange ──▶ checked
checked ─── onCheckedChange ──▶ unchecked
(Checkbox) unchecked/checked ─── setIndeterminate ──▶ indeterminate
```

### Collapsible Components (Sidebar, Accordion)

```
expanded ─── onCollapsedChange ──▶ collapsed
collapsed ─── onCollapsedChange ──▶ expanded
```

### Modal Components (Dialog, Sheet, Popover)

```
closed ─── onOpenChange(true) ──▶ open
open ─── onOpenChange(false) ──▶ closed
open ─── backdrop click/escape ──▶ closed
```
