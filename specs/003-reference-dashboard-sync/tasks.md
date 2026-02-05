# Tasks: Reference Dashboard Sync

**Input**: Design documents from `/specs/003-reference-dashboard-sync/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/README.md, quickstart.md

**Tests**: E2E tests included per constitution requirement (TDD with Playwright).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a monorepo with the following structure:
- **apps/web/src/**: Next.js frontend application
- **apps/api/src/**: Fastify mock API server
- **packages/shared/src/**: Shared schemas and types
- **packages/ui/src/**: Shared UI components and styles
- **e2e/tests/**: Playwright E2E tests

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [x] T001 Install framer-motion dependency in apps/web via `cd apps/web && bun add framer-motion`
- [x] T002 [P] Verify framer-motion import works by creating test file apps/web/src/lib/motion-test.tsx and running build

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Shared Schemas (packages/shared/src/schemas/)

- [x] T003 [P] Create Release schema in packages/shared/src/schemas/release.ts with Zod validation per data-model.md
- [x] T004 [P] Create FanActivity schema in packages/shared/src/schemas/fan-activity.ts with Zod validation per data-model.md
- [x] T005 [P] Create TopCountry schema in packages/shared/src/schemas/top-country.ts with Zod validation per data-model.md
- [x] T006 [P] Create EngagementMetric schema in packages/shared/src/schemas/engagement.ts with Zod validation per data-model.md
- [x] T007 Export all new schemas and types from packages/shared/src/index.ts

### API Endpoints (apps/api/src/)

- [x] T008 [P] Create mock release data (6 releases: 2 Album, 2 Single, 2 EP) in apps/api/src/data/mock-data.ts
- [x] T009 [P] Create mock fan activity data (10 activities covering all 5 types) in apps/api/src/data/mock-data.ts
- [x] T010 [P] Create mock top countries data (5 countries) in apps/api/src/data/mock-data.ts
- [x] T011 Create releases endpoint GET /api/releases in apps/api/src/routes/releases.ts per contracts/README.md
- [x] T012 Create fan-activity endpoint GET /api/fan-activity in apps/api/src/routes/fan-activity.ts per contracts/README.md
- [x] T013 Register new routes in apps/api/src/index.ts
- [x] T014 [P] Enhance existing fans endpoint with engagement metrics and topLocations in apps/api/src/routes/fans.ts

### Design System Updates (packages/ui/src/)

- [x] T015 Add glass-morphism CSS utilities (.glass, .glass-card, .glass-subtle) to packages/ui/src/globals.css per quickstart.md
- [x] T016 [P] Add glow effects (.glow-primary, .glow-warm) to packages/ui/src/globals.css per quickstart.md
- [x] T017 [P] Add gradient text utility (.gradient-text) to packages/ui/src/globals.css per quickstart.md
- [x] T018 Update primary color to warm orange-red (hsl(3 85% 62%)) in packages/ui/tailwind.config.ts
- [x] T019 [P] Add gradient utilities (bg-gradient-warm, bg-gradient-cool) to packages/ui/tailwind.config.ts

### React Query Hooks (apps/web/src/hooks/)

- [x] T020 Add useReleases hook to apps/web/src/hooks/use-api.ts per quickstart.md
- [x] T021 [P] Add useFanActivity hook to apps/web/src/hooks/use-api.ts per quickstart.md
- [x] T022 [P] Add queryKeys for releases and fanActivity to apps/web/src/hooks/use-api.ts

### Utility Functions (packages/shared/src/)

- [x] T023 [P] Add formatRelativeTime function to packages/shared/src/utils/format.ts (or create if needed)
- [x] T024 [P] Add formatCompactNumber function (K, M, B abbreviations) to packages/shared/src/utils/format.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - KPI Stats Overview (Priority: P1) 🎯 MVP

**Goal**: Display 4 KPI cards with trend indicators and staggered animations

**Independent Test**: Load dashboard, verify 4 KPI cards show values, trends, and animate in

### E2E Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T025 [US1] Create E2E test file e2e/tests/kpi-cards.spec.ts with tests for:
  - 4 KPI cards visible (Revenue, Streams, Releases, Followers)
  - Each card shows value, change percentage, and trend indicator
  - Up trends show green, down trends show red

### Implementation for User Story 1

- [x] T026 [US1] Update kpi-cards.tsx to display 4 cards: Total Revenue, Total Streams, Releases, Followers per FR-001
- [x] T027 [US1] Add trend indicators (up/down arrows with color) to KPI cards per FR-002
- [x] T028 [US1] Add percentage change display to KPI cards
- [x] T029 [US1] Wrap KPI cards in Framer Motion container with staggered animation per FR-024
- [x] T030 [US1] Add skeleton loading state for KPI cards per FR-026
- [x] T031 [US1] Run E2E tests and verify all US1 tests pass

**Checkpoint**: KPI Stats Overview fully functional and testable

---

## Phase 4: User Story 2 - Sales Analytics Chart (Priority: P1)

**Goal**: Display area chart with revenue and streams over time with interactive tooltips

**Independent Test**: Load dashboard, verify dual-area chart renders with hover tooltips

### E2E Tests for User Story 2

- [x] T032 [US2] Create E2E test file e2e/tests/sales-chart.spec.ts with tests for:
  - Area chart renders with two data series
  - X-axis shows month labels
  - Tooltip appears on hover with revenue and streams

### Implementation for User Story 2

- [x] T033 [US2] Update earnings-analytics.tsx (rename to sales-chart.tsx) with dual area chart per FR-003
- [x] T034 [US2] Add warm gradient for revenue area, cool gradient for streams area
- [x] T035 [US2] Implement custom tooltip component showing month, revenue, streams per FR-004
- [x] T036 [US2] Format Y-axis values with abbreviations (K, M) per FR-005
- [x] T037 [US2] Add skeleton loading state for chart per FR-026
- [x] T038 [US2] Wrap chart in Framer Motion for fade-in animation per FR-023
- [x] T039 [US2] Run E2E tests and verify all US2 tests pass

**Checkpoint**: Sales Analytics Chart fully functional and testable

---

## Phase 5: User Story 3 - Recent Releases (Priority: P2)

**Goal**: Display release cards with cover art, metadata, hover effects, and type badges

**Independent Test**: Load dashboard, verify release cards show with badges and hover effects

### E2E Tests for User Story 3

- [x] T040 [US3] Create E2E test file e2e/tests/releases.spec.ts with tests for:
  - Release cards display in grid (4 cards default)
  - Each card shows cover art, title, date, streams, sales
  - Type badges appear (Album/Single/EP)
  - Play button appears on hover

### Implementation for User Story 3

- [x] T041 [P] [US3] Create ReleaseCard component in apps/web/src/components/release-card.tsx per quickstart.md
- [x] T042 [US3] Add cover art with hover zoom effect to ReleaseCard per FR-011
- [x] T043 [US3] Add play button overlay on hover to ReleaseCard per FR-011
- [x] T044 [US3] Add type badge (Album purple, Single blue, EP orange) to ReleaseCard per FR-009
- [x] T045 [US3] Add featured badge support to ReleaseCard per FR-010
- [x] T046 [US3] Create ReleasesSection component in apps/web/src/components/releases-section.tsx per quickstart.md
- [x] T047 [US3] Add responsive grid layout to ReleasesSection per FR-007
- [x] T048 [US3] Add Framer Motion staggered animation to ReleasesSection per FR-024
- [x] T049 [US3] Add skeleton loading state (ReleasesSkeleton) per FR-026
- [x] T050 [US3] Add empty state for no releases per edge case requirement
- [x] T051 [US3] Run E2E tests and verify all US3 tests pass

**Checkpoint**: Recent Releases fully functional and testable

---

## Phase 6: User Story 4 - Fan Activity Feed (Priority: P2)

**Goal**: Display scrollable activity feed with user avatars, icons, and relative timestamps

**Independent Test**: Load dashboard, verify activity feed shows activities with proper icons and timestamps

### E2E Tests for User Story 4

- [x] T052 [US4] Create E2E test file e2e/tests/fan-activity.spec.ts with tests for:
  - Activity feed displays with activities
  - Each activity shows avatar, description, timestamp
  - Type-specific icons appear (cart, play, share, user, message)
  - Color-coded badges match activity type

### Implementation for User Story 4

- [x] T053 [P] [US4] Create FanActivityItem component in apps/web/src/components/fan-activity-feed.tsx per quickstart.md
- [x] T054 [US4] Add activity type icons mapping (ShoppingCart, Play, Share2, UserPlus, MessageCircle) per FR-012
- [x] T055 [US4] Add color-coded badges per activity type per FR-013
- [x] T056 [US4] Create FanActivityFeed container component with scrollable list per FR-012
- [x] T057 [US4] Add Avatar component with fallback for missing images per FR-020
- [x] T058 [US4] Add relative timestamp display using formatRelativeTime per FR-013
- [x] T059 [US4] Add Framer Motion staggered animation to activity items per FR-024
- [x] T060 [US4] Add skeleton loading state (FanActivitySkeleton) per FR-026
- [x] T061 [US4] Add empty state for no activities per edge case requirement
- [x] T062 [US4] Run E2E tests and verify all US4 tests pass

**Checkpoint**: Fan Activity Feed fully functional and testable

---

## Phase 7: User Story 5 - Fan Engagement Metrics (Priority: P2)

**Goal**: Display detailed engagement metrics with geographic distribution

**Independent Test**: Load dashboard, verify engagement metrics and top countries display

### E2E Tests for User Story 5

- [x] T063 [US5] Create E2E test file e2e/tests/engagement-metrics.spec.ts with tests for:
  - 4 engagement metric cards visible
  - Each metric shows value and trend
  - Top Locations section shows countries with progress bars

### Implementation for User Story 5

- [x] T064 [P] [US5] Create EngagementMetrics component in apps/web/src/components/engagement-metrics.tsx
- [x] T065 [US5] Add 4 metric cards (Followers, Monthly Listeners, Engagement Rate, Avg Stream Time) per FR-014
- [x] T066 [US5] Add trend indicators to each metric card per FR-014
- [x] T067 [US5] Add TopLocations section with country list per FR-015
- [x] T068 [US5] Add progress bars for geographic percentages per FR-016
- [x] T069 [US5] Add Framer Motion animation to engagement section per FR-023
- [x] T070 [US5] Add skeleton loading state per FR-026
- [x] T071 [US5] Run E2E tests and verify all US5 tests pass

**Checkpoint**: Fan Engagement Metrics fully functional and testable

---

## Phase 8: User Story 6 - Dashboard Header (Priority: P3)

**Goal**: Enhanced header with greeting, search, notifications, settings, and avatar

**Independent Test**: Load dashboard, verify header shows all elements with proper styling

### E2E Tests for User Story 6

- [x] T072 [US6] Create E2E test file e2e/tests/header.spec.ts with tests for:
  - Personalized greeting displayed
  - Search input visible and functional
  - Notification bell with indicator visible
  - Settings button and avatar visible

### Implementation for User Story 6

- [x] T073 [US6] Update artist-header.tsx to add personalized greeting per FR-017
- [x] T074 [US6] Add search input with search icon to header per FR-018
- [x] T075 [US6] Add notification bell button with active indicator badge per FR-019
- [x] T076 [US6] Add settings button to header
- [x] T077 [US6] Ensure avatar displays with fallback for missing images per FR-020
- [x] T078 [US6] Add glass-morphism styling to header elements per FR-021
- [x] T079 [US6] Run E2E tests and verify all US6 tests pass

**Checkpoint**: Dashboard Header fully functional and testable

---

## Phase 9: User Story 7 - Glass-Morphism Design System (Priority: P3)

**Goal**: Apply glass-morphism theme with warm accents and animations across all components

**Independent Test**: Visual inspection of dashboard for glass effects, warm colors, and smooth animations

### E2E Tests for User Story 7

- [x] T080 [US7] Create E2E test file e2e/tests/design-system.spec.ts with tests for:
  - Dark background applied
  - Glass-effect cards visible
  - Warm accent colors on interactive elements
  - Animations trigger on load

### Implementation for User Story 7

- [x] T081 [US7] Apply glass-card class to all card components in dashboard per FR-021
- [x] T082 [US7] Update button and accent elements to use warm orange-red primary per FR-022
- [x] T083 [US7] Verify all Framer Motion animations have consistent timing (300ms fade, 0.1s stagger) per FR-023, FR-024
- [x] T084 [US7] Test responsive layout from 320px to 2560px per FR-025
- [x] T085 [US7] Verify error states display with retry buttons per FR-027
- [x] T086 [US7] Run E2E tests and verify all US7 tests pass

**Checkpoint**: Design System fully applied and consistent

---

## Phase 10: Dashboard Integration

**Goal**: Integrate all sections into the main dashboard page layout

### Implementation

- [x] T087 Update dashboard page layout in apps/web/src/app/dashboard/page.tsx per quickstart.md section 10:
  - ArtistHeader at top
  - KpiCards below header
  - Grid with SalesChart (2/3) and FanActivityFeed (1/3)
  - ReleasesSection full width
  - EngagementMetrics full width
- [x] T088 Add error boundary wrapper for each section
- [x] T089 Test full dashboard load performance (target: <3s per SC-001)

---

## Phase 11: Translations (i18n)

**Goal**: Add all new UI strings to translation files

### Implementation

- [x] T090 [P] Add releases translation keys to apps/web/src/i18n/translations/en.json per quickstart.md section 8
- [x] T091 [P] Add activity translation keys to apps/web/src/i18n/translations/en.json
- [x] T092 [P] Add engagement translation keys to apps/web/src/i18n/translations/en.json
- [x] T093 [P] Add header translation keys to apps/web/src/i18n/translations/en.json
- [x] T094 Copy new keys to apps/web/src/i18n/translations/es.json with Spanish translations
- [x] T095 Copy new keys to apps/web/src/i18n/translations/pt-BR.json with Portuguese translations

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Final quality improvements affecting multiple user stories

- [x] T096 Run all E2E tests across all browsers (Chromium, Firefox, WebKit)
- [x] T097 Run Biome linting and fix any issues
- [x] T098 Verify WCAG AA contrast ratios on all text per SC-006
- [x] T099 Test keyboard navigation for all interactive elements
- [x] T100 Performance audit: verify dashboard loads <3s, interactions <1s, filters <500ms
- [x] T101 Code review: ensure no unnecessary complexity per constitution Principle I
- [x] T102 Delete motion-test.tsx created in T002

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - P1 stories (US1, US2) should complete first
  - P2 stories (US3, US4, US5) can proceed in parallel after P1
  - P3 stories (US6, US7) can proceed in parallel after P2
- **Dashboard Integration (Phase 10)**: Depends on all user story phases (3-9)
- **Translations (Phase 11)**: Can run in parallel with Phase 10
- **Polish (Phase 12)**: Depends on Phases 10-11 being complete

### User Story Dependencies

| Story | Priority | Can Start After | Dependencies |
|-------|----------|-----------------|--------------|
| US1 (KPI Stats) | P1 | Phase 2 | None |
| US2 (Sales Chart) | P1 | Phase 2 | None |
| US3 (Releases) | P2 | Phase 2 | T008 (mock data), T011 (endpoint), T020 (hook) |
| US4 (Fan Activity) | P2 | Phase 2 | T009 (mock data), T012 (endpoint), T021 (hook) |
| US5 (Engagement) | P2 | Phase 2 | T010, T014 (enhanced fans endpoint) |
| US6 (Header) | P3 | Phase 2 | None |
| US7 (Design System) | P3 | Phase 2 | T015-T019 (CSS utilities) |

### Within Each User Story

1. E2E tests MUST be written and FAIL before implementation
2. Components before sections
3. Core implementation before integration
4. Story complete and tests pass before moving to next priority

### Parallel Opportunities

- All Phase 2 schema tasks (T003-T006) can run in parallel
- All Phase 2 mock data tasks (T008-T010) can run in parallel
- All Phase 2 CSS utility tasks (T015-T019) can run in parallel
- P1 stories (US1, US2) can run in parallel
- P2 stories (US3, US4, US5) can run in parallel after P1
- P3 stories (US6, US7) can run in parallel after P2
- All translation tasks (T090-T095) can run in parallel

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (KPI Stats)
4. Complete Phase 4: User Story 2 (Sales Chart)
5. **STOP and VALIDATE**: Test P1 stories independently
6. Deploy/demo if ready - dashboard shows core analytics

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 + US2 → Test → MVP deployed (core analytics)
3. Add US3 + US4 + US5 → Test → Enhanced with releases and engagement
4. Add US6 + US7 → Test → Polished experience
5. Integration + Translations + Polish → Production ready

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify E2E tests fail before implementing features (TDD per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
