# Research: EVEN Design System

**Feature**: 005-even-design-system
**Date**: 2026-02-05

## Research Tasks Completed

### 1. Existing Component Library Inventory

**Decision**: Extend existing packages/ui rather than rebuild

**Rationale**:
- 14 components already exist with Storybook stories
- Established patterns using Radix UI primitives and class-variance-authority
- Tailwind theming with CSS variables already configured
- Breaking changes would disrupt apps/web which imports from @even/ui

**Alternatives Considered**:
- Create new @even/design-system package → Rejected (duplication, migration effort)
- Fork shadcn/ui components → Rejected (already using shadcn/ui patterns)

### 2. EVEN Brand Color Palette (from get.even.biz)

**Decision**: Use dark-first theme with extracted brand colors

**Color Tokens Extracted**:

| Token | Value | Usage |
|-------|-------|-------|
| background | hsl(0 0% 0%) | #000000 - Page background |
| surface | hsl(0 0% 7.5%) | #131313 - Card backgrounds |
| elevated | hsl(0 0% 10%) | #1a1a1a - Elevated surfaces |
| foreground | hsl(0 0% 98%) | #fafafa - Primary text |
| muted | hsl(0 0% 64%) | #a3a3a3 - Secondary text |
| primary | hsl(3 85% 62%) | #e03026 - Brand accent (warm red) |
| border | hsl(0 0% 15%) | #262626 - Subtle borders |

**Rationale**: Colors extracted from get.even.biz match the existing globals.css theme. Minor adjustments needed for pure black (#000000) background vs current hsl(0 0% 7%).

**Alternatives Considered**:
- Light theme first → Rejected (reference site is dark-themed)
- Use Tailwind default colors → Rejected (doesn't match brand)

### 3. Typography System

**Decision**: Inter font family with defined scale

**Typography Scale**:

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| xs | 12px | 400 | 1.5 | Captions |
| sm | 14px | 400 | 1.5 | Body small |
| base | 16px | 400 | 1.5 | Body |
| lg | 18px | 500 | 1.4 | Body large |
| xl | 20px | 600 | 1.3 | Subheadings |
| 2xl | 24px | 600 | 1.2 | H4 |
| 3xl | 30px | 700 | 1.2 | H3 |
| 4xl | 36px | 700 | 1.1 | H2 |
| 5xl | 48px | 700 | 1.1 | H1 |

**Rationale**: Inter is already loaded in apps/web. Scale matches Tailwind defaults with adjusted weights for EVEN brand hierarchy.

### 4. Component Gaps Analysis

**Decision**: Add 21 new components to reach feature parity

**Missing Components (from FR requirements)**:

| Component | Priority | Radix Primitive | Notes |
|-----------|----------|-----------------|-------|
| Alert | P2 | None | Custom component |
| Breadcrumb | P2 | None | Custom component |
| Checkbox | P2 | @radix-ui/react-checkbox | |
| Radio Group | P2 | @radix-ui/react-radio-group | |
| Switch | P2 | @radix-ui/react-switch | |
| Textarea | P2 | None | HTML textarea styled |
| Popover | P2 | @radix-ui/react-popover | |
| Progress | P2 | @radix-ui/react-progress | |
| Spinner | P1 | None | CSS animation |
| Scroll Area | P2 | @radix-ui/react-scroll-area | |
| Container | P2 | None | Layout utility |
| Divider | P2 | @radix-ui/react-separator | |
| Typography | P1 | None | Heading, Text, Label, Caption |
| Header | P2 | None | Navigation component |
| Sidebar | P2 | None | Navigation component |
| Form | P2 | @radix-ui/react-form | Validation wrapper |

**Existing Components Needing Updates**:

| Component | Update Needed |
|-----------|---------------|
| Badge | Add semantic variants (success, warning, error, info) |
| Button | Verify all sizes and variants match spec |
| Card | Add elevated and outline variants |
| Input | Add error and success states |

### 5. Storybook Accessibility Setup

**Decision**: Add @storybook/addon-a11y for automated accessibility testing

**Rationale**:
- Integrates axe-core for WCAG 2.1 AA validation
- Shows accessibility violations directly in Storybook UI
- No additional test runner configuration needed

**Implementation**:
```bash
bun add -D @storybook/addon-a11y
```

Update `.storybook/main.ts`:
```typescript
addons: [
  '@storybook/addon-links',
  '@storybook/addon-docs',
  '@storybook/addon-a11y', // NEW
]
```

### 6. Design Token Export Strategy

**Decision**: CSS variables as source of truth, TypeScript exports for DX

**Rationale**:
- CSS variables already work across the codebase
- TypeScript exports provide autocomplete and type safety
- Tokens can be imported by consumers who need programmatic access

**Structure**:
```typescript
// packages/ui/src/tokens/colors.ts
export const colors = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: 'hsl(var(--primary))',
  // ...
} as const;
```

### 7. Responsive Breakpoints

**Decision**: Align with Tailwind defaults

| Token | Value | Usage |
|-------|-------|-------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1440px | Large screens |

**Rationale**: Tailwind defaults are well-tested and match common device breakpoints. Reference site uses similar breakpoints (810px, 1100px, 1200px, 1440px).

### 8. Border Radius System

**Decision**: Use existing Tailwind config with CSS variable

**Values**:
```css
--radius: 0.5rem; /* 8px base */
/* Variants: sm (4px), md (6px), lg (8px), xl (12px), 2xl (16px), full (9999px) */
```

**Rationale**: Existing config already supports this. Reference site uses 8-12px for cards, full for pills.

### 9. Shadow System

**Decision**: Define semantic shadow tokens

| Token | Value | Usage |
|-------|-------|-------|
| none | none | Flat elements |
| sm | 0 1px 2px rgba(0,0,0,0.25) | Subtle depth |
| md | 0 4px 6px rgba(0,0,0,0.25) | Cards |
| lg | 0 10px 15px rgba(0,0,0,0.25) | Modals |
| xl | 0 20px 25px rgba(0,0,0,0.3) | Popovers |
| glow | 0 0 20px rgba(224,48,38,0.15) | Brand accent |

**Rationale**: Reference site uses subtle shadows on dark backgrounds. Glow effect matches existing glass-morphism styles.

### 10. Radix UI Dependencies

**Decision**: Add required Radix primitives for new components

**New Dependencies**:
```json
{
  "@radix-ui/react-checkbox": "^1.x",
  "@radix-ui/react-radio-group": "^1.x",
  "@radix-ui/react-switch": "^1.x",
  "@radix-ui/react-popover": "^1.x",
  "@radix-ui/react-progress": "^1.x",
  "@radix-ui/react-scroll-area": "^1.x",
  "@radix-ui/react-separator": "^1.x"
}
```

**Already Installed**:
- @radix-ui/react-avatar
- @radix-ui/react-dialog
- @radix-ui/react-select
- @radix-ui/react-slot
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-tooltip

## Open Questions Resolved

| Question | Resolution |
|----------|------------|
| Should we create a separate design-system package? | No - extend packages/ui |
| Dark or light theme first? | Dark (matches reference site) |
| Which Radix primitives are needed? | List above |
| How to handle accessibility testing? | @storybook/addon-a11y |
| CSS variables vs JS tokens? | CSS variables primary, JS exports secondary |
