# Implementation Plan: Architecture Documentation Suite

**Branch**: `006-architecture-documentation` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-architecture-documentation/spec.md`

## Summary

Build a comprehensive documentation suite for the EVEN Artist Dashboard platform, including architecture documentation with interactive diagrams (C4 model, sequence diagrams, data flows), Architecture Decision Records (ADRs) with searchable index, user manuals with annotated visuals, and API documentation. Uses a docs-as-code approach with text-based diagram sources (Mermaid) that render as interactive graphics, integrated into an existing Next.js/Storybook monorepo.

## Technical Context

**Language/Version**: TypeScript 5.7+ (strict mode)
**Primary Dependencies**: Next.js 15, React 19, MDX, Mermaid, Nextra (documentation framework)
**Storage**: File-based markdown/MDX with Git version control
**Testing**: Playwright (E2E for documentation navigation), Biome (linting)
**Target Platform**: Web (desktop/tablet), integrated with existing `apps/web` or new `apps/docs`
**Project Type**: Web documentation site within existing monorepo
**Performance Goals**: Page load <3s, search results <500ms, diagram render <1s
**Constraints**: Must integrate with existing Bun/Turborepo monorepo, use Biome (no ESLint/Prettier)
**Scale/Scope**: ~50+ documentation pages, ~20 ADRs initial, ~15 architecture diagrams

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence/Notes |
|-----------|--------|----------------|
| **I. Simplicity First** | PASS | Using existing monorepo patterns, MDX for content, Mermaid for diagrams (text-based, version-controlled) |
| **II. Test-Driven Development** | PASS | E2E tests for documentation navigation flows, link validation scripts |
| **III. Component Architecture** | PASS | Documentation site as self-contained app, reuses `@even/ui` components |
| **IV. API-First Design** | N/A | Documentation is content-first; no new APIs needed (API docs document existing endpoints) |
| **V. Observability** | PASS | Structured logging for broken link detection, search analytics possible |

**Technology Stack Compliance**:

| Requirement | Compliance | Notes |
|-------------|------------|-------|
| Runtime: Bun | PASS | Uses existing Bun workspace |
| Monorepo: Bun workspaces + Turborepo | PASS | New app in `apps/docs` |
| Frontend: Next.js 14+ App Router | PASS | Nextra 4.x built on Next.js 15 |
| Language: TypeScript (strict) | PASS | Inherits base tsconfig |
| Styling: Tailwind CSS | PASS | Reuses existing config from `@even/ui` |
| Components: shadcn/ui | PASS | Imports from `packages/ui` |
| Lint/Format: Biome | PASS | Uses root Biome config |
| E2E Testing: Playwright | PASS | Existing E2E infrastructure |

## Project Structure

### Documentation (this feature)

```text
specs/006-architecture-documentation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (minimal - mostly content structure)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
apps/
├── docs/                        # NEW: Documentation site (Nextra)
│   ├── src/
│   │   ├── pages/               # MDX content pages
│   │   │   ├── architecture/    # Architecture documentation
│   │   │   │   ├── overview.mdx
│   │   │   │   ├── components/  # Component deep-dives
│   │   │   │   ├── data-flow/   # Data flow diagrams
│   │   │   │   └── deployment/  # Deployment architecture
│   │   │   ├── adr/             # Architecture Decision Records
│   │   │   │   ├── index.mdx    # ADR index with search
│   │   │   │   └── [number]-*.mdx
│   │   │   ├── manuals/         # User manuals
│   │   │   │   ├── getting-started.mdx
│   │   │   │   └── [feature]/*.mdx
│   │   │   ├── api/             # API documentation
│   │   │   │   ├── overview.mdx
│   │   │   │   └── endpoints/   # Per-endpoint docs
│   │   │   └── index.mdx        # Documentation home
│   │   ├── components/          # Doc-specific components
│   │   │   ├── DiagramViewer.tsx
│   │   │   ├── ADRCard.tsx
│   │   │   └── SearchResults.tsx
│   │   └── lib/
│   │       └── search.ts        # Search indexing
│   ├── public/
│   │   └── diagrams/            # Generated diagram assets (optional)
│   ├── package.json
│   ├── next.config.mjs
│   └── theme.config.tsx         # Nextra theme configuration
│
├── web/                         # Existing (unchanged)
├── api/                         # Existing (unchanged)
└── storybook/                   # Existing (unchanged)

packages/
├── ui/                          # Existing - may add DiagramViewer
├── shared/                      # Existing - may add ADR schema types
└── docs-content/                # NEW: Shared content assets
    ├── diagrams/                # Mermaid diagram sources
    │   ├── architecture/
    │   │   ├── system-context.mmd
    │   │   ├── container.mmd
    │   │   └── component-*.mmd
    │   ├── sequences/
    │   │   └── *.mmd
    │   └── data-flows/
    │       └── *.mmd
    ├── adr/                     # ADR markdown templates
    │   └── template.md
    └── images/                  # Screenshots, annotated visuals
        └── manuals/

e2e/
└── tests/
    └── docs/                    # NEW: Documentation E2E tests
        ├── navigation.spec.ts
        ├── search.spec.ts
        └── diagrams.spec.ts
```

**Structure Decision**: Documentation as a separate `apps/docs` Next.js application using Nextra framework, sharing UI components from `packages/ui`. Diagram sources stored in `packages/docs-content` for reuse and version control. This follows the existing monorepo pattern and keeps documentation isolated yet integrated.

## Complexity Tracking

> No Constitution violations identified. The approach uses existing patterns and technology stack.

| Consideration | Decision | Rationale |
|--------------|----------|-----------|
| New app vs. extend existing | New `apps/docs` | Keeps documentation concerns separate; Nextra optimized for docs; doesn't bloat main app |
| Diagram rendering | Mermaid (text-based) | Version-controllable, diffable, no external tools needed |
| Search implementation | Nextra built-in + FlexSearch | Simple, client-side, no backend required |
