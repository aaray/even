# Tasks: Architecture Documentation Suite

**Input**: Design documents from `/specs/006-architecture-documentation/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: E2E tests included as specified in constitution (TDD principle) and plan.md

**Organization**: Tasks grouped by user story to enable independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md structure:
- **Documentation app**: `apps/docs/`
- **Shared content**: `packages/docs-content/`
- **E2E tests**: `e2e/tests/docs/`
- **Shared schemas**: `packages/shared/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize documentation app and shared content package

- [x] T001 Create `apps/docs/` directory structure with `src/pages/`, `src/components/`, `src/lib/`, `public/`
- [x] T002 Initialize `apps/docs/package.json` with name `@even/docs`, add to root workspaces
- [x] T003 [P] Add Nextra dependencies to `apps/docs/package.json`: `nextra@^4.0.0`, `nextra-theme-docs@^4.0.0`
- [x] T004 [P] Add Mermaid dependency to `apps/docs/package.json`: `mermaid@^11.0.0`
- [x] T005 [P] Create `apps/docs/tsconfig.json` extending `../../tsconfig.base.json`
- [x] T006 [P] Create `apps/docs/next.config.mjs` with Nextra configuration
- [x] T007 Create `apps/docs/theme.config.tsx` with Nextra theme settings (logo, sidebar, search enabled)
- [x] T008 [P] Create `packages/docs-content/` directory structure with `diagrams/`, `images/`, `adr/`
- [x] T009 [P] Initialize `packages/docs-content/package.json` with name `@even/docs-content`
- [x] T010 Update root `turbo.json` to include `@even/docs` dev and build tasks
- [x] T011 Run `bun install` to link new packages

**Checkpoint**: Documentation app scaffolding complete - can run `bun run dev --filter=@even/docs`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components and infrastructure that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T012 Create base page layout in `apps/docs/src/pages/_app.tsx` importing Tailwind from `@even/ui`
- [x] T013 Create documentation home page in `apps/docs/src/pages/index.mdx` with navigation to all sections
- [x] T014 [P] Create `apps/docs/src/components/DiagramViewer.tsx` - Mermaid renderer with zoom/pan controls
- [x] T015 [P] Add Zod schemas for documentation frontmatter to `packages/shared/src/schemas/docs.ts`
- [x] T016 [P] Create `apps/docs/src/lib/mermaid.ts` - client-side Mermaid initialization utility
- [x] T017 Create navigation structure in `apps/docs/src/pages/_meta.json` with Architecture, ADRs, Manuals, API sections
- [x] T018 [P] Create `apps/docs/src/components/Breadcrumbs.tsx` for navigation context
- [x] T019 Configure search in `apps/docs/theme.config.tsx` with FlexSearch options
- [x] T020 [P] Create `e2e/tests/docs/` directory for documentation E2E tests
- [x] T021 Add docs site to Playwright config in `e2e/playwright.config.ts` (baseURL for docs)

**Checkpoint**: Foundation ready - DiagramViewer works, search enabled, E2E infrastructure ready

---

## Phase 3: User Story 1 - Browse Architecture Documentation (Priority: P1)

**Goal**: Developers can view high-level architecture diagrams and drill down to component details

**Independent Test**: Navigate to Architecture section, view system diagram, click component to see details

### E2E Tests for User Story 1

> **Write these tests FIRST - ensure they FAIL before implementation**

- [x] T022 [P] [US1] E2E test for architecture navigation in `e2e/tests/docs/architecture-navigation.spec.ts`
- [x] T023 [P] [US1] E2E test for diagram interactivity in `e2e/tests/docs/diagram-viewer.spec.ts`

### Implementation for User Story 1

- [x] T024 [P] [US1] Create C4 system context diagram in `packages/docs-content/diagrams/architecture/c4-system-context.mmd`
- [x] T025 [P] [US1] Create C4 container diagram in `packages/docs-content/diagrams/architecture/c4-container.mmd`
- [x] T026 [P] [US1] Create sequence diagram for data flow in `packages/docs-content/diagrams/sequences/product-creation-flow.mmd`
- [x] T027 [US1] Create architecture overview page in `apps/docs/src/pages/architecture/index.mdx` embedding system context diagram
- [x] T028 [P] [US1] Create `apps/docs/src/pages/architecture/_meta.json` for sidebar ordering
- [x] T029 [US1] Create components overview page in `apps/docs/src/pages/architecture/components/index.mdx` with container diagram
- [x] T030 [P] [US1] Create web app component page in `apps/docs/src/pages/architecture/components/web-app.mdx`
- [x] T031 [P] [US1] Create API component page in `apps/docs/src/pages/architecture/components/api.mdx`
- [x] T032 [P] [US1] Create shared packages page in `apps/docs/src/pages/architecture/components/shared-packages.mdx`
- [x] T033 [US1] Create data flow section in `apps/docs/src/pages/architecture/data-flow/index.mdx` with sequence diagrams
- [x] T034 [US1] Add clickable node handlers to DiagramViewer for drill-down navigation in `apps/docs/src/components/DiagramViewer.tsx`
- [ ] T035 [US1] Verify E2E tests pass for User Story 1

**Checkpoint**: Architecture documentation complete - developers can browse and drill down diagrams

---

## Phase 4: User Story 2 - Review Architecture Decision Records (Priority: P2)

**Goal**: Tech leads can search and view ADRs to understand past decisions

**Independent Test**: Browse ADR index, search for topic, view ADR with all sections

### E2E Tests for User Story 2

- [x] T036 [P] [US2] E2E test for ADR index and search in `e2e/tests/docs/adr-search.spec.ts`
- [x] T037 [P] [US2] E2E test for ADR status display in `e2e/tests/docs/adr-status.spec.ts`

### Implementation for User Story 2

- [x] T038 [P] [US2] Create ADR template in `packages/docs-content/adr/template.mdx` following MADR v3.0 format
- [x] T039 [US2] Create ADR index page in `apps/docs/src/pages/adr/index.mdx` with chronological listing and status badges
- [x] T040 [P] [US2] Create `apps/docs/src/pages/adr/_meta.json` for sidebar ordering
- [x] T041 [P] [US2] Create `apps/docs/src/components/ADRCard.tsx` for displaying ADR summary with status badge
- [x] T042 [P] [US2] Create `apps/docs/src/components/ADRStatusBadge.tsx` for status visualization (proposed/accepted/deprecated/superseded)
- [x] T043 [US2] Create sample ADR-001 in `apps/docs/src/pages/adr/001-use-nextra-for-docs.mdx`
- [x] T044 [P] [US2] Create sample ADR-002 in `apps/docs/src/pages/adr/002-use-mermaid-for-diagrams.mdx`
- [x] T045 [P] [US2] Create sample ADR-003 in `apps/docs/src/pages/adr/003-madr-format-for-adrs.mdx`
- [x] T046 [US2] Add ADR-to-ADR linking (supersedes/related) in ADR pages
- [ ] T047 [US2] Verify E2E tests pass for User Story 2

**Checkpoint**: ADR section complete - tech leads can browse and search architectural decisions

---

## Phase 5: User Story 3 - Access User Manuals (Priority: P2)

**Goal**: End users can find and follow step-by-step guides with screenshots

**Independent Test**: Search for feature, view manual page with numbered steps and images

### E2E Tests for User Story 3

- [ ] T048 [P] [US3] E2E test for manual navigation and search in `e2e/tests/docs/manual-navigation.spec.ts`
- [ ] T049 [P] [US3] E2E test for step-by-step content display in `e2e/tests/docs/manual-steps.spec.ts`

### Implementation for User Story 3

- [x] T050 [US3] Create manuals index page in `apps/docs/src/pages/manuals/index.mdx` with feature categories
- [x] T051 [P] [US3] Create `apps/docs/src/pages/manuals/_meta.json` for sidebar structure
- [x] T052 [P] [US3] Create `apps/docs/src/components/StepList.tsx` for numbered step display
- [x] T053 [P] [US3] Create `apps/docs/src/components/AnnotatedImage.tsx` for screenshots with callouts
- [x] T054 [US3] Create getting started manual in `apps/docs/src/pages/manuals/getting-started.mdx`
- [x] T055 [P] [US3] Create products section directory `apps/docs/src/pages/manuals/products/`
- [x] T056 [US3] Create add-product manual in `apps/docs/src/pages/manuals/products/add-new-product.mdx`
- [x] T057 [P] [US3] Create earnings section directory `apps/docs/src/pages/manuals/earnings/`
- [x] T058 [US3] Create view-earnings manual in `apps/docs/src/pages/manuals/earnings/view-earnings.mdx`
- [ ] T059 [P] [US3] Add placeholder screenshots to `packages/docs-content/images/manuals/`
- [ ] T060 [US3] Verify E2E tests pass for User Story 3

**Checkpoint**: User manuals section complete - end users can follow step-by-step guides

---

## Phase 6: User Story 4 - Generate API Documentation (Priority: P3)

**Goal**: Developers can browse API endpoints with schemas and try interactive examples

**Independent Test**: Browse endpoints, view schema, execute sample request via Scalar

### E2E Tests for User Story 4

- [ ] T061 [P] [US4] E2E test for API endpoint browsing in `e2e/tests/docs/api-navigation.spec.ts`
- [ ] T062 [P] [US4] E2E test for interactive API explorer in `e2e/tests/docs/api-explorer.spec.ts`

### Implementation for User Story 4

- [ ] T063 [US4] Add `@fastify/swagger` and `@fastify/swagger-ui` to `apps/api/package.json`
- [ ] T064 [US4] Configure Swagger plugin in `apps/api/src/index.ts` to generate OpenAPI spec
- [ ] T065 [US4] Add OpenAPI annotations to existing API routes in `apps/api/src/routes/`
- [ ] T066 [US4] Create build script to export OpenAPI JSON to `apps/docs/public/openapi.json`
- [ ] T067 [US4] Add `@scalar/nextjs-api-reference` to `apps/docs/package.json`
- [x] T068 [US4] Create API overview page in `apps/docs/src/pages/api/index.mdx`
- [x] T069 [P] [US4] Create `apps/docs/src/pages/api/_meta.json` for sidebar structure
- [ ] T070 [US4] Create interactive API reference page in `apps/docs/src/pages/api/reference.mdx` with Scalar component
- [x] T071 [P] [US4] Create endpoint detail pages directory `apps/docs/src/pages/api/endpoints/`
- [x] T072 [US4] Create artist endpoint docs in `apps/docs/src/pages/api/endpoints/artist.mdx`
- [x] T073 [P] [US4] Create products endpoint docs in `apps/docs/src/pages/api/endpoints/products.mdx`
- [x] T074 [P] [US4] Create earnings endpoint docs in `apps/docs/src/pages/api/endpoints/earnings.mdx`
- [ ] T075 [US4] Verify E2E tests pass for User Story 4

**Checkpoint**: API documentation complete - developers can browse and test endpoints

---

## Phase 7: User Story 5 - Create New ADR (Priority: P3)

**Goal**: Architects can create new ADRs from templates with diagram support

**Independent Test**: Copy template, fill sections, add diagram, verify appears in index

### E2E Tests for User Story 5

- [x] T076 [P] [US5] E2E test for ADR creation workflow in `e2e/tests/docs/adr-creation.spec.ts`

### Implementation for User Story 5

- [x] T077 [US5] Create comprehensive ADR template documentation in `apps/docs/src/pages/adr/how-to-create.mdx`
- [x] T078 [US5] Add ADR template download link to index page in `apps/docs/src/pages/adr/index.mdx`
- [x] T079 [US5] Create Mermaid embedding guide in `apps/docs/src/pages/adr/diagram-guide.mdx`
- [x] T080 [US5] Document ADR status workflow in `apps/docs/src/pages/adr/status-workflow.mdx`
- [ ] T081 [US5] Verify E2E tests pass for User Story 5

**Checkpoint**: ADR creation workflow documented - architects can create new ADRs

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T082 [P] Add link validation script in `apps/docs/scripts/validate-links.ts`
- [x] T083 [P] Create 404 page in `apps/docs/src/pages/404.mdx` with search suggestions
- [x] T084 [P] Add deprecation banner component in `apps/docs/src/components/DeprecationBanner.tsx`
- [x] T085 Configure version selector in `apps/docs/theme.config.tsx` for future versioning
- [x] T086 [P] Add responsive styling for diagrams in `apps/docs/src/styles/diagrams.css`
- [x] T087 Performance optimization: add loading skeletons for diagrams in DiagramViewer
- [ ] T088 Run all E2E tests and fix any failures
- [x] T089 Run `bun run lint` and fix any issues
- [x] T090 Validate quickstart.md instructions work correctly
- [x] T091 Update root README.md with link to documentation site

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Independent of US1/US2
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2/US3
- **User Story 5 (P3)**: Depends on US2 (uses ADR infrastructure)

### Within Each User Story

- E2E tests MUST be written and FAIL before implementation
- Content files (diagrams, MDX) can be created in parallel
- Component work before content pages that use them
- Index pages after detail pages exist

### Parallel Opportunities per Phase

**Setup (11 tasks)**:
- T003, T004, T005, T006 can run in parallel
- T008, T009 can run in parallel

**Foundational (10 tasks)**:
- T014, T015, T016 can run in parallel
- T018, T020 can run in parallel

**User Story 1 (14 tasks)**:
- T022, T023 in parallel (tests)
- T024, T025, T026 in parallel (diagrams)
- T030, T031, T032 in parallel (component pages)

**User Story 2 (12 tasks)**:
- T036, T037 in parallel (tests)
- T041, T042 in parallel (components)
- T044, T045 in parallel (ADRs)

**User Story 3 (13 tasks)**:
- T048, T049 in parallel (tests)
- T052, T053 in parallel (components)
- T055, T057, T059 in parallel (directories)

**User Story 4 (15 tasks)**:
- T061, T062 in parallel (tests)
- T072, T073, T074 in parallel (endpoint docs)

**User Story 5 (5 tasks)**:
- T076 (single test)

**Polish (10 tasks)**:
- T082, T083, T084, T086 can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch E2E tests first (should fail):
bun playwright test e2e/tests/docs/architecture-navigation.spec.ts
bun playwright test e2e/tests/docs/diagram-viewer.spec.ts

# Launch all diagrams in parallel:
# T024: packages/docs-content/diagrams/architecture/c4-system-context.mmd
# T025: packages/docs-content/diagrams/architecture/c4-container.mmd
# T026: packages/docs-content/diagrams/sequences/product-creation-flow.mmd

# Launch component detail pages in parallel:
# T030: apps/docs/src/pages/architecture/components/web-app.mdx
# T031: apps/docs/src/pages/architecture/components/api.mdx
# T032: apps/docs/src/pages/architecture/components/shared-packages.mdx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T011)
2. Complete Phase 2: Foundational (T012-T021)
3. Complete Phase 3: User Story 1 (T022-T035)
4. **STOP and VALIDATE**: Architecture docs browsable, diagrams interactive
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Architecture docs live (MVP!)
3. Add User Story 2 → ADRs searchable
4. Add User Story 3 → User manuals available
5. Add User Story 4 → API docs interactive
6. Add User Story 5 → ADR creation workflow documented
7. Polish → Production ready

### Parallel Team Strategy

With 3 developers after Foundational complete:

- Developer A: User Story 1 (Architecture)
- Developer B: User Story 2 (ADRs)
- Developer C: User Story 3 (Manuals)

Then:
- Developer A: User Story 4 (API)
- Developer B: User Story 5 (ADR creation)
- Developer C: Polish

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Tasks** | 91 |
| **Setup Tasks** | 11 |
| **Foundational Tasks** | 10 |
| **User Story 1 Tasks** | 14 |
| **User Story 2 Tasks** | 12 |
| **User Story 3 Tasks** | 13 |
| **User Story 4 Tasks** | 15 |
| **User Story 5 Tasks** | 6 |
| **Polish Tasks** | 10 |
| **Parallel Opportunities** | 35+ tasks marked [P] |

**MVP Scope**: Setup (11) + Foundational (10) + User Story 1 (14) = **35 tasks**

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- E2E tests written first per TDD principle
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
