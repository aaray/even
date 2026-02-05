# Implementation Plan: EVEN Artist Dashboard

**Branch**: `001-artist-dashboard` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-artist-dashboard/spec.md`

## Summary

Build a production-quality EVEN Artist Dashboard as a monorepo demonstrating modern frontend excellence. EVEN is a direct-to-fan platform where artists sell Music, Videos, Merch, and Experiences while retaining more revenue.

The dashboard displays:
- Artist profile with KPI cards (earnings, revenue retained %, fans, engagement)
- Earnings analytics with category breakdown and interactive charts
- Filterable/sortable product grid across all categories with detail drawer
- Fan engagement metrics with geographic distribution

Uses mock data with deterministic seeding for consistent testing.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Runtime**: Bun (latest stable)
**Primary Dependencies**:
- Next.js 14+ (App Router)
- Fastify (API)
- TanStack Query (data fetching)
- Recharts (charts)
- shadcn/ui + Tailwind CSS (UI)
- Zod (validation)

**Storage**: N/A (mock data only, no persistence)
**Testing**: Playwright (E2E), Storybook (component documentation)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (Bun workspaces monorepo)
**Performance Goals**: Dashboard load <3s, interactions <1s, filters <500ms
**Constraints**: WCAG 2.1 AA, responsive 375px-1440px, dark theme default
**Scale/Scope**: Single artist dashboard, ~12 UI components, 5 API endpoints

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Simplicity First | PASS | Monorepo with minimal packages (ui, shared); no premature abstractions |
| II. Test-Driven Development | PASS | Playwright E2E tests for critical journeys; Storybook for component docs |
| III. Component Architecture | PASS | Single-responsibility components; packages/ui for shared; unidirectional data flow |
| IV. API-First Design | PASS | Contracts defined before implementation; Zod validation at boundaries |
| V. Observability | PASS | Skeleton loaders, error states with retry, health endpoint |

**Stack Compliance**:
- [x] Bun runtime and package manager
- [x] Bun workspaces + Turborepo
- [x] Next.js 14+ App Router
- [x] TypeScript strict
- [x] Tailwind CSS
- [x] shadcn/ui (centralized in packages/ui)
- [x] Biome (NO eslint, NO prettier)
- [x] Recharts
- [x] TanStack Query
- [x] Playwright E2E
- [x] Zod validation

## Project Structure

### Documentation (this feature)

```text
specs/001-artist-dashboard/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── openapi.yaml     # API specification
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
/
├── package.json              # Bun workspaces root
├── turbo.json                # Turborepo config
├── biome.json                # Lint/format config
├── tsconfig.base.json        # Shared TS config
├── .editorconfig             # Editor settings
├── .gitignore
├── README.md                 # Project documentation
├── AI_USAGE.md               # AI tools usage log
│
├── apps/
│   ├── web/                  # Next.js 14 App Router
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── .env.example
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx          # Redirect to /dashboard
│   │       │   ├── error.tsx
│   │       │   ├── not-found.tsx
│   │       │   └── dashboard/
│   │       │       └── page.tsx
│   │       ├── components/           # App-specific components
│   │       │   ├── artist-header.tsx
│   │       │   ├── earnings-analytics.tsx
│   │       │   ├── products-grid.tsx
│   │       │   ├── product-drawer.tsx
│   │       │   ├── fans-section.tsx
│   │       │   └── send-update-dialog.tsx
│   │       ├── hooks/
│   │       │   └── use-api.ts        # TanStack Query hooks
│   │       └── lib/
│   │           ├── api-client.ts
│   │           └── query-provider.tsx
│   │
│   ├── api/                  # Fastify mock API
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── .env.example
│   │   └── src/
│   │       ├── index.ts              # Server entry
│   │       ├── routes/
│   │       │   ├── health.ts
│   │       │   ├── artist.ts
│   │       │   ├── products.ts
│   │       │   ├── earnings.ts
│   │       │   └── fans.ts
│   │       └── data/
│   │           └── mock-data.ts      # Seeded mock data
│   │
│   └── storybook/            # Storybook for design system
│       ├── package.json
│       ├── .storybook/
│       │   ├── main.ts
│       │   └── preview.ts
│       └── tsconfig.json
│
├── packages/
│   ├── ui/                   # Design system (shadcn-based)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   └── src/
│   │       ├── index.ts              # Barrel export
│   │       ├── globals.css           # CSS variables, EVEN theme
│   │       └── components/
│   │           ├── button.tsx
│   │           ├── card.tsx
│   │           ├── badge.tsx
│   │           ├── stat-card.tsx
│   │           ├── tabs.tsx
│   │           ├── input.tsx
│   │           ├── select.tsx
│   │           ├── tooltip.tsx
│   │           ├── skeleton.tsx
│   │           ├── sheet.tsx
│   │           ├── dialog.tsx
│   │           ├── toast.tsx
│   │           └── chart-container.tsx
│   │
│   └── shared/               # Shared types and schemas
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts              # Barrel export
│           ├── schemas/
│           │   ├── artist.ts
│           │   ├── product.ts        # All EVEN product categories
│           │   ├── earnings.ts       # With category breakdown
│           │   ├── fans.ts
│           │   └── api-error.ts
│           ├── types/
│           │   └── index.ts          # Inferred from schemas
│           └── utils/
│               └── format.ts         # Number/date/currency formatting
│
└── e2e/                      # Playwright tests
    ├── package.json
    ├── playwright.config.ts
    └── tests/
        ├── dashboard.spec.ts
        ├── earnings.spec.ts
        └── products.spec.ts
```

**Structure Decision**: Web application monorepo using Bun workspaces. Apps separated by runtime (web=Next.js, api=Fastify, storybook=Storybook). Shared packages for UI components and types/schemas. E2E tests at root level for full-stack testing.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 3 apps + 2 packages | Requirement specifies monorepo with web, api, storybook apps and shared packages | Single app cannot satisfy Storybook + API + frontend separation |
| TanStack Query | Requirement specifies TanStack Query for data fetching | Native fetch lacks caching, deduplication, and refetch-on-focus |
| Discriminated union for Products | 4 product categories with different fields | Single schema would require many optional fields and lose type safety |
