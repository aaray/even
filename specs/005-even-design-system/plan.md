# Implementation Plan: EVEN Design System

**Branch**: `005-even-design-system` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-even-design-system/spec.md`

## Summary

Build a comprehensive design system that extends the existing `packages/ui` library to fully replicate the visual language of get.even.biz. The system will add missing components, formalize design tokens in Tailwind config, ensure WCAG 2.1 AA accessibility, and expand Storybook documentation. The existing foundation (14 components, Radix UI primitives, Tailwind theming) provides a solid base to build upon.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: React 18+, Radix UI primitives, Tailwind CSS 3.x, class-variance-authority, Storybook 10.x
**Storage**: N/A (stateless component library)
**Testing**: Playwright (E2E), Storybook interaction tests, axe-core accessibility audits
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Monorepo - extending existing packages/ui
**Performance Goals**: Bundle size < 100KB gzipped, component render < 16ms
**Constraints**: WCAG 2.1 AA compliance, dark theme primary, Inter font family
**Scale/Scope**: ~35 components total (14 existing + 21 new), full Storybook documentation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Simplicity First** | PASS | Extending existing UI package, not creating new abstraction. Components use established patterns (Radix UI + CVA). |
| **II. Test-Driven Development** | PASS | Each component will have Storybook story + accessibility tests before implementation code. E2E tests cover component variants. |
| **III. Component Architecture** | PASS | Self-contained components with single responsibility, props-based API, unidirectional data flow. All components in packages/ui. |
| **IV. API-First Design** | N/A | No backend APIs - this is a frontend component library. Component prop interfaces serve as contracts. |
| **V. Observability** | PASS | Loading states via Skeleton component, explicit disabled/error states, console warnings in development for invalid props. |

**Stack Constraints Verification**:

| Constraint | Status | Implementation |
|------------|--------|----------------|
| Runtime: Bun | PASS | Already using Bun for package management |
| Monorepo: Bun workspaces + Turborepo | PASS | Existing monorepo structure |
| Frontend: Next.js 14+ App Router | PASS | apps/web uses Next.js |
| Language: TypeScript (strict) | PASS | All components in TypeScript |
| Styling: Tailwind CSS | PASS | Using Tailwind with CSS variables |
| Components: shadcn/ui | PASS | Components in packages/ui follow shadcn/ui patterns |
| Lint/Format: Biome | PASS | No ESLint/Prettier in use |
| E2E Testing: Playwright | PASS | Playwright configured |
| Schema Validation: Zod | N/A | No API schemas in component library |

**Quality Standards**:

| Standard | Status | Implementation |
|----------|--------|----------------|
| WCAG 2.1 AA | PLANNED | axe-core addon, contrast checking, keyboard navigation |
| Responsiveness | PLANNED | All components mobile-first, breakpoint tokens |
| Security | N/A | No user input handling beyond props |

## Project Structure

### Documentation (this feature)

```text
specs/005-even-design-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (component interfaces)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (component prop interfaces)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
packages/ui/
├── src/
│   ├── components/           # All UI components
│   │   ├── button.tsx        # Existing
│   │   ├── card.tsx          # Existing
│   │   ├── input.tsx         # Existing
│   │   ├── select.tsx        # Existing
│   │   ├── dialog.tsx        # Existing
│   │   ├── sheet.tsx         # Existing
│   │   ├── tabs.tsx          # Existing
│   │   ├── skeleton.tsx      # Existing
│   │   ├── avatar.tsx        # Existing
│   │   ├── tooltip.tsx       # Existing
│   │   ├── toast.tsx         # Existing
│   │   ├── toaster.tsx       # Existing
│   │   ├── stat-card.tsx     # Existing
│   │   ├── chart-container.tsx # Existing
│   │   ├── badge.tsx         # Existing (needs variants update)
│   │   ├── alert.tsx         # NEW - FR-501
│   │   ├── breadcrumb.tsx    # NEW - FR-304
│   │   ├── checkbox.tsx      # NEW - FR-403
│   │   ├── radio-group.tsx   # NEW - FR-404
│   │   ├── switch.tsx        # NEW - FR-405
│   │   ├── textarea.tsx      # NEW - FR-402
│   │   ├── popover.tsx       # NEW - FR-505
│   │   ├── progress.tsx      # NEW - FR-703
│   │   ├── spinner.tsx       # NEW - FR-702
│   │   ├── scroll-area.tsx   # NEW - FR-704
│   │   ├── container.tsx     # NEW - FR-601
│   │   ├── divider.tsx       # NEW - FR-604
│   │   ├── typography.tsx    # NEW - FR-206 (Heading, Text, Label, Caption)
│   │   ├── header.tsx        # NEW - FR-301
│   │   ├── sidebar.tsx       # NEW - FR-302
│   │   └── form.tsx          # NEW - FR-406
│   ├── hooks/
│   │   ├── use-toast.ts      # Existing
│   │   └── use-media-query.ts # NEW - responsive utilities
│   ├── lib/
│   │   └── utils.ts          # Existing (cn utility)
│   ├── tokens/               # NEW - formalized design tokens
│   │   ├── colors.ts         # Color token definitions
│   │   ├── typography.ts     # Typography scale
│   │   ├── spacing.ts        # Spacing scale
│   │   └── index.ts          # Token exports
│   ├── globals.css           # Existing (CSS variables)
│   └── index.ts              # Barrel exports
├── tailwind.config.ts        # Update with EVEN tokens
├── tsconfig.json             # Existing
└── package.json              # Existing

apps/storybook/
├── .storybook/
│   ├── main.ts               # Existing
│   └── preview.ts            # Update with a11y addon
└── stories/                  # Component stories (mirrored from packages/ui)
```

**Structure Decision**: Extend existing `packages/ui` package rather than creating a new package. This maintains the current monorepo structure and avoids breaking existing imports. New components follow established patterns.

## Complexity Tracking

> No constitution violations requiring justification. The implementation extends existing patterns.

| Item | Justification |
|------|---------------|
| tokens/ directory | Formalizes existing CSS variables as TypeScript exports for better DX. Optional - CSS variables remain source of truth. |
