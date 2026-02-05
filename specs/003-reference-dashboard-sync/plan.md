# Implementation Plan: Reference Dashboard Sync

**Branch**: `003-reference-dashboard-sync` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-reference-dashboard-sync/spec.md`

## Summary

Synchronize the existing EVEN Artist Dashboard with the reference implementation to achieve feature parity in functionality, visual design, and user experience. This involves:
- Adding new dashboard sections (releases, fan activity feed, engagement metrics)
- Implementing glass-morphism design system with warm orange-red accent colors
- Adding staggered entrance animations using Framer Motion
- Creating new API endpoints for releases and fan activity data
- Extending the existing i18n translations for new UI strings

## Technical Context

**Language/Version**: TypeScript 5.7+ (strict mode enabled)
**Primary Dependencies**: Next.js 15, React 19, Tailwind CSS 3.4, shadcn/ui, Recharts 2.15, TanStack Query 5.62
**Storage**: Mock API server (Fastify 5.2) - no persistent storage
**Testing**: Playwright (E2E), Vitest (unit) - TDD required per constitution
**Target Platform**: Web (responsive: 320px-2560px)
**Project Type**: Monorepo (Bun workspaces + Turborepo)
**Performance Goals**: Dashboard load <3s, interactions <1s, filters <500ms
**Constraints**: WCAG 2.1 AA compliance, mobile-first responsive
**Scale/Scope**: Single artist dashboard view, ~5 new API endpoints, ~8 new components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Simplicity First | PASS | Reusing existing component patterns, extending rather than replacing |
| II. Test-Driven Development | PASS | E2E tests planned for each user story, following existing Playwright patterns |
| III. Component Architecture | PASS | Self-contained sections with clear responsibilities, no circular dependencies |
| IV. API-First Design | PASS | API contracts will be documented before implementation, Zod validation at boundaries |
| V. Observability | PASS | Skeleton loading states, error states with retry, structured patterns from existing code |

**Stack Constraints Check**:
| Technology | Required | Status |
|------------|----------|--------|
| Bun | Yes | USING |
| Next.js 14+ App Router | Yes | USING (Next.js 15) |
| TypeScript (strict) | Yes | USING |
| Tailwind CSS | Yes | USING |
| shadcn/ui | Yes | USING (packages/ui) |
| Biome | Yes | USING |
| Recharts | Yes | USING |
| TanStack Query | Yes | USING |
| Playwright | Yes | USING (e2e/) |
| Zod | Yes | USING |

**New Dependencies Required**:
- `framer-motion` - For staggered entrance animations (FR-023, FR-024)

## Project Structure

### Documentation (this feature)

```text
specs/003-reference-dashboard-sync/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
│   └── README.md        # API documentation
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
# Monorepo structure (existing + new)
apps/
├── web/src/
│   ├── app/dashboard/page.tsx        # UPDATE: Add new sections
│   ├── components/
│   │   ├── artist-header.tsx         # UPDATE: Add search, notifications
│   │   ├── kpi-cards.tsx             # UPDATE: Add 4th card (Followers)
│   │   ├── earnings-analytics.tsx    # EXISTING (rename to sales-chart)
│   │   ├── fans-section.tsx          # UPDATE: Enhance with activity feed
│   │   ├── release-card.tsx          # NEW: Release card component
│   │   ├── releases-section.tsx      # NEW: Recent releases grid
│   │   ├── fan-activity-feed.tsx     # NEW: Activity feed component
│   │   └── engagement-metrics.tsx    # NEW: Detailed engagement stats
│   ├── hooks/
│   │   └── use-api.ts                # UPDATE: Add useReleases, useFanActivity
│   └── i18n/translations/
│       ├── en.json                   # UPDATE: Add new strings
│       ├── es.json                   # UPDATE: Add new strings
│       └── pt-BR.json                # UPDATE: Add new strings
├── api/src/
│   ├── routes/
│   │   ├── releases.ts               # NEW: Releases endpoint
│   │   └── fan-activity.ts           # NEW: Fan activity endpoint
│   └── data/mock-data.ts             # UPDATE: Add release/activity data

packages/
├── ui/src/
│   ├── components/
│   │   └── stat-card.tsx             # UPDATE: Add variant support
│   ├── globals.css                   # UPDATE: Add glass-morphism utilities
│   └── tailwind.config.ts            # UPDATE: Add warm color palette
└── shared/src/
    ├── schemas/
    │   ├── release.ts                # NEW: Release schema
    │   └── fan-activity.ts           # NEW: Fan activity schema
    └── types/index.ts                # UPDATE: Export new types

e2e/tests/
├── releases.spec.ts                  # NEW: Releases E2E tests
├── fan-activity.spec.ts              # NEW: Fan activity E2E tests
├── engagement-metrics.spec.ts        # NEW: Engagement metrics E2E tests
└── animations.spec.ts                # NEW: Animation E2E tests
```

**Structure Decision**: Extending existing monorepo structure with new components following established patterns. No new apps or packages required - all additions fit within existing architecture.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Adding framer-motion | Staggered animations per spec FR-023/FR-024 | Tailwind animations insufficient for staggered delays and complex entrance effects |

## Constitution Re-Check (Post Phase 1 Design)

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Simplicity First | PASS | Components follow existing patterns (quickstart.md); single-purpose components (ReleaseCard, FanActivityFeed); no premature abstractions |
| II. Test-Driven Development | PASS | E2E test patterns documented (quickstart.md section 7); test files specified in project structure |
| III. Component Architecture | PASS | Self-contained sections; clear data flow (data-model.md); hooks for data fetching; no circular dependencies |
| IV. API-First Design | PASS | API contracts documented (contracts/README.md); Zod schemas defined (data-model.md); request/response shapes specified |
| V. Observability | PASS | Skeleton patterns documented (quickstart.md section 9); error states in component patterns; loading states explicit |

**All gates PASS** - Ready for Phase 2 task generation.

## Gap Analysis: Current vs Reference

| Feature | Current State | Reference State | Gap |
|---------|--------------|-----------------|-----|
| KPI Cards | 4 cards (earnings, %, fans, engagement) | 4 cards (revenue, streams, releases, followers) | Metric alignment needed |
| Analytics Chart | Stacked area (earnings by category) | Dual area (revenue + streams) | Chart redesign |
| Releases | Products grid (music/video/merch/experience) | Release cards (Album/Single/EP) | New component needed |
| Fan Activity | None | Real-time activity feed | New component needed |
| Engagement Metrics | Basic in fans-section | Detailed with geographic data | Enhancement needed |
| Header | Artist profile + language | Search + notifications + avatar | Enhancement needed |
| Design System | Blue accent, minimal glass | Warm orange-red, glass-morphism | Theme update |
| Animations | Basic CSS transitions | Framer Motion staggered | Library addition |
