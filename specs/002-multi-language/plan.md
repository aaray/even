# Implementation Plan: Multi-Language Support

**Branch**: `002-multi-language` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-multi-language/spec.md`

## Summary

Add internationalization (i18n) to the EVEN Artist Dashboard supporting English (en), Spanish (es), and Brazilian Portuguese (pt-BR). Implementation uses next-intl for client-side translation with ICU message format, locale-aware Intl formatting utilities, and localStorage-based language preference persistence. All static UI text will be extracted to translation files while preserving user-generated content untranslated.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 15, React 19, next-intl (new), TanStack Query
**Storage**: localStorage (browser) for language preference
**Testing**: Playwright (E2E), Vitest (unit - if added)
**Target Platform**: Web (browser)
**Project Type**: Web monorepo (apps/web frontend, apps/api backend, packages/*)
**Performance Goals**: Language switch <1 second, no page reload
**Constraints**: Must not translate user-generated content (artist names, product titles)
**Scale/Scope**: ~50 static UI strings, 8 components, 6 formatting functions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity First | PASS | Using established next-intl library (single dependency), no custom i18n framework |
| II. Test-Driven Development | PASS | E2E tests for language switching, unit tests for formatting functions |
| III. Component Architecture | PASS | Language context provider at root, components consume via hook |
| IV. API-First Design | PASS | No API changes needed - all text is frontend-only |
| V. Observability | PASS | Language preference logged, fallback behavior traceable |
| Stack: Bun | PASS | Package manager unchanged |
| Stack: Next.js 14+ App Router | PASS | Using next-intl App Router integration |
| Stack: TypeScript strict | PASS | Type-safe translation keys via next-intl |
| Stack: Tailwind CSS | PASS | No styling changes |
| Stack: Biome | PASS | Linting/formatting unchanged |
| Stack: Zod | PASS | Schema validation unchanged |
| Stack: Playwright | PASS | E2E tests for language switching |

**No violations identified.**

## Project Structure

### Documentation (this feature)

```text
specs/002-multi-language/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (minimal - no API changes)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
apps/web/
├── src/
│   ├── app/
│   │   └── layout.tsx           # [MODIFY] Add LanguageProvider, dynamic lang attr
│   ├── components/
│   │   ├── language-selector.tsx  # [NEW] Language dropdown in header
│   │   ├── artist-header.tsx      # [MODIFY] Add language selector
│   │   ├── kpi-cards.tsx          # [MODIFY] Replace hardcoded text with t()
│   │   ├── earnings-analytics.tsx # [MODIFY] Replace hardcoded text with t()
│   │   ├── fans-section.tsx       # [MODIFY] Replace hardcoded text with t()
│   │   ├── products-grid.tsx      # [MODIFY] Replace hardcoded text with t()
│   │   ├── product-card.tsx       # [MODIFY] Replace hardcoded text with t()
│   │   ├── product-drawer.tsx     # [MODIFY] Replace hardcoded text with t()
│   │   └── send-update-dialog.tsx # [MODIFY] Replace hardcoded text with t()
│   ├── i18n/
│   │   ├── config.ts              # [NEW] Language config, supported locales
│   │   ├── request.ts             # [NEW] next-intl request config
│   │   └── translations/
│   │       ├── en.json            # [NEW] English translations
│   │       ├── es.json            # [NEW] Spanish translations
│   │       └── pt-BR.json         # [NEW] Brazilian Portuguese translations
│   ├── hooks/
│   │   └── use-language.ts        # [NEW] Language preference hook with localStorage
│   └── lib/
│       └── query-provider.tsx     # [MODIFY] Consider cache invalidation on lang change
├── i18n.ts                        # [NEW] next-intl plugin config
└── next.config.ts                 # [MODIFY] Add next-intl plugin

packages/shared/
└── src/
    └── utils/
        └── format.ts              # [MODIFY] Add locale parameter to all functions

e2e/
└── tests/
    ├── language-switching.spec.ts    # [NEW] E2E tests for language features
    └── locale-formatting.spec.ts     # [NEW] E2E tests for number/date/currency formats
```

**Structure Decision**: Existing monorepo structure preserved. Translation files co-located in apps/web/src/i18n for simplicity (no separate package needed for 3 languages). Shared formatting utilities remain in packages/shared with added locale parameter.

## Complexity Tracking

> No violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
