# Tasks: EVEN Design System

**Input**: Design documents from `/specs/005-even-design-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `packages/ui/src/` for components, `apps/storybook/` for stories
- Components follow shadcn/ui patterns with Radix UI primitives

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and configure tooling

- [x] T001 Install new Radix UI dependencies in packages/ui/package.json (@radix-ui/react-checkbox, @radix-ui/react-radio-group, @radix-ui/react-switch, @radix-ui/react-popover, @radix-ui/react-progress, @radix-ui/react-scroll-area, @radix-ui/react-separator)
- [x] T002 Install @storybook/addon-a11y in apps/storybook/package.json
- [x] T003 [P] Configure a11y addon in apps/storybook/.storybook/main.ts
- [x] T004 [P] Update apps/storybook/.storybook/preview.ts with a11y configuration

---

## Phase 2: Foundational (Design Tokens)

**Purpose**: Establish design tokens that ALL components depend on - MUST complete before component work

**⚠️ CRITICAL**: No component work can begin until this phase is complete

- [x] T005 Create tokens directory structure in packages/ui/src/tokens/
- [x] T006 [P] Create color tokens in packages/ui/src/tokens/colors.ts
- [x] T007 [P] Create typography tokens in packages/ui/src/tokens/typography.ts
- [x] T008 [P] Create spacing tokens in packages/ui/src/tokens/spacing.ts
- [x] T009 Create token barrel export in packages/ui/src/tokens/index.ts
- [x] T010 Update CSS variables in packages/ui/src/globals.css with EVEN brand colors (#000000 background, #131313 surface, #e03026 primary)
- [x] T011 Update packages/ui/tailwind.config.ts with EVEN-specific tokens (even-surface, even-primary, gap-even-md, etc.)

**Checkpoint**: Design tokens ready - component implementation can now begin

---

## Phase 3: User Story 1 - Design Tokens Foundation (Priority: P1) 🎯 MVP

**Goal**: Complete set of design tokens matching EVEN brand for consistent styling

**Independent Test**: Import tokens into a blank project and verify all color, spacing, and typography values render correctly

### Implementation for User Story 1

- [x] T012 [US1] Add semantic color tokens (success, warning, error, info) to packages/ui/src/globals.css
- [x] T013 [US1] Add shadow tokens (sm, md, lg, xl, glow) to packages/ui/src/globals.css
- [x] T014 [US1] Add border radius tokens (none, sm, md, lg, xl, 2xl, full) to packages/ui/tailwind.config.ts
- [x] T015 [US1] Add breakpoint tokens (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1440px) to packages/ui/tailwind.config.ts
- [x] T016 [P] [US1] Create design tokens story in packages/ui/src/components/tokens.stories.tsx showing all colors
- [x] T017 [P] [US1] Add spacing scale story to packages/ui/src/components/tokens.stories.tsx
- [x] T018 [P] [US1] Add typography scale story to packages/ui/src/components/tokens.stories.tsx
- [x] T019 [US1] Export tokens from packages/ui/src/index.ts

**Checkpoint**: User Story 1 complete - design tokens are documented and usable

---

## Phase 4: User Story 8 - Tailwind Configuration (Priority: P1)

**Goal**: Design tokens integrated into Tailwind for utility-first workflow

**Independent Test**: Apply Tailwind classes (bg-even-surface, text-even-primary, gap-even-md) and verify correct values

### Implementation for User Story 8

- [x] T020 [US8] Add EVEN color utilities (bg-even-surface, bg-even-elevated, text-even-primary, text-even-muted) to packages/ui/tailwind.config.ts
- [x] T021 [US8] Add EVEN spacing utilities (gap-even-sm, gap-even-md, gap-even-lg) to packages/ui/tailwind.config.ts
- [x] T022 [US8] Add EVEN shadow utilities (shadow-even-sm, shadow-even-glow) to packages/ui/tailwind.config.ts
- [x] T023 [P] [US8] Create Tailwind utilities story in packages/ui/src/components/tailwind-utilities.stories.tsx
- [x] T024 [US8] Update apps/web/tailwind.config.ts to extend UI package preset

**Checkpoint**: User Story 8 complete - Tailwind utilities work with EVEN design system

---

## Phase 5: User Story 2 - Core UI Components (Priority: P1)

**Goal**: Pre-built components (buttons, inputs, cards, badges) matching EVEN visual style

**Independent Test**: Render each component in isolation and visually compare against reference site

### Implementation for User Story 2

- [x] T025 [US2] Add loading prop and spinner to Button component in packages/ui/src/components/button.tsx
- [x] T026 [US2] Update Button story with loading state in packages/ui/src/components/button.stories.tsx
- [x] T027 [P] [US2] Add error and success states to Input component in packages/ui/src/components/input.tsx
- [x] T028 [P] [US2] Update Input story with error/success states in packages/ui/src/components/input.stories.tsx
- [x] T029 [P] [US2] Add variant prop (default, elevated, outline) to Card component in packages/ui/src/components/card.tsx
- [x] T030 [P] [US2] Update Card story with variants in packages/ui/src/components/card.stories.tsx
- [x] T031 [P] [US2] Add semantic variants (success, warning, info) to Badge component in packages/ui/src/components/badge.tsx
- [x] T032 [P] [US2] Update Badge story with semantic variants in packages/ui/src/components/badge.stories.tsx
- [x] T033 [US2] Create Typography components (Heading, Text, Label, Caption) in packages/ui/src/components/typography.tsx
- [x] T034 [US2] Create Typography stories in packages/ui/src/components/typography.stories.tsx
- [x] T035 [US2] Export Typography components from packages/ui/src/index.ts

**Checkpoint**: User Story 2 complete - core components ready for use

---

## Phase 6: User Story 9 - Accessibility Compliance (Priority: P1)

**Goal**: All components meet WCAG 2.1 AA accessibility standards

**Independent Test**: Run axe-core audits and verify 100% pass rate, test keyboard navigation

### Implementation for User Story 9

- [x] T036 [US9] Verify color contrast ratios in packages/ui/src/globals.css meet WCAG 2.1 AA (4.5:1 for text)
- [x] T037 [US9] Add focus-visible styles to all interactive components in packages/ui/src/globals.css
- [x] T038 [P] [US9] Add aria-labels to Button component in packages/ui/src/components/button.tsx
- [x] T039 [P] [US9] Add aria-labels to Input component in packages/ui/src/components/input.tsx
- [x] T040 [US9] Verify keyboard navigation works for all existing components (Tab, Enter, Escape)
- [x] T041 [US9] Run Storybook a11y addon audit and fix any violations
- [x] T042 [US9] Document accessibility features in component stories (keyboard shortcuts, screen reader behavior)

**Checkpoint**: User Story 9 complete - accessibility verified and documented

---

## Phase 7: User Story 3 - Storybook Component Showcase (Priority: P1)

**Goal**: Interactive component playground with full documentation

**Independent Test**: Launch Storybook and verify all components render with interactive controls

### Implementation for User Story 3

- [x] T043 [US3] Organize stories by category in apps/storybook/.storybook/main.ts (Foundation, Components, Layout, Feedback)
- [x] T044 [P] [US3] Add DocsPage documentation to Button story in packages/ui/src/components/button.stories.tsx
- [x] T045 [P] [US3] Add DocsPage documentation to Card story in packages/ui/src/components/card.stories.tsx
- [x] T046 [P] [US3] Add DocsPage documentation to Input story in packages/ui/src/components/input.stories.tsx
- [x] T047 [US3] Add viewport addon configuration for responsive testing in apps/storybook/.storybook/preview.ts
- [x] T048 [US3] Verify all existing components have stories with interactive controls
- [x] T049 [US3] Add example code snippets to each component story

**Checkpoint**: User Story 3 complete - Storybook fully documents all components

---

## Phase 8: User Story 5 - Form Components (Priority: P2)

**Goal**: Complete set of form components with validation styling

**Independent Test**: Build a sample form and verify all states (default, focus, error, disabled) display correctly

### Implementation for User Story 5

- [x] T050 [P] [US5] Create Checkbox component in packages/ui/src/components/checkbox.tsx using @radix-ui/react-checkbox
- [x] T051 [P] [US5] Create Checkbox stories in packages/ui/src/components/checkbox.stories.tsx
- [x] T052 [P] [US5] Create RadioGroup component in packages/ui/src/components/radio-group.tsx using @radix-ui/react-radio-group
- [x] T053 [P] [US5] Create RadioGroup stories in packages/ui/src/components/radio-group.stories.tsx
- [x] T054 [P] [US5] Create Switch component in packages/ui/src/components/switch.tsx using @radix-ui/react-switch
- [x] T055 [P] [US5] Create Switch stories in packages/ui/src/components/switch.stories.tsx
- [x] T056 [P] [US5] Create Textarea component in packages/ui/src/components/textarea.tsx with autoResize and showCount
- [x] T057 [P] [US5] Create Textarea stories in packages/ui/src/components/textarea.stories.tsx
- [x] T058 [US5] Create Form wrapper component in packages/ui/src/components/form.tsx with FormField, FormLabel, FormMessage
- [x] T059 [US5] Create Form stories in packages/ui/src/components/form.stories.tsx
- [x] T060 [US5] Export all form components from packages/ui/src/index.ts

**Checkpoint**: User Story 5 complete - form components ready with validation

---

## Phase 9: User Story 4 - Navigation Components (Priority: P2)

**Goal**: Navigation components (header, sidebar, breadcrumb) matching EVEN patterns

**Independent Test**: Render navigation components and verify layout, responsiveness, and interaction behavior

### Implementation for User Story 4

- [x] T061 [P] [US4] Create Breadcrumb component in packages/ui/src/components/breadcrumb.tsx
- [x] T062 [P] [US4] Create Breadcrumb stories in packages/ui/src/components/breadcrumb.stories.tsx
- [x] T063 [P] [US4] Create Header component in packages/ui/src/components/header.tsx with HeaderNav and HeaderActions
- [x] T064 [P] [US4] Create Header stories in packages/ui/src/components/header.stories.tsx
- [x] T065 [US4] Create Sidebar component in packages/ui/src/components/sidebar.tsx with SidebarSection and SidebarItem
- [x] T066 [US4] Create Sidebar stories in packages/ui/src/components/sidebar.stories.tsx
- [x] T067 [US4] Create use-media-query hook in packages/ui/src/hooks/use-media-query.ts for responsive navigation
- [x] T068 [US4] Export all navigation components from packages/ui/src/index.ts

**Checkpoint**: User Story 4 complete - navigation patterns established

---

## Phase 10: User Story 6 - Feedback Components (Priority: P2)

**Goal**: Feedback components (alerts, popovers) for system status communication

**Independent Test**: Trigger each feedback component and verify appearance, animation, and dismissal

### Implementation for User Story 6

- [x] T069 [P] [US6] Create Alert component in packages/ui/src/components/alert.tsx with variants (info, success, warning, error)
- [x] T070 [P] [US6] Create Alert stories in packages/ui/src/components/alert.stories.tsx
- [x] T071 [P] [US6] Create Popover component in packages/ui/src/components/popover.tsx using @radix-ui/react-popover
- [x] T072 [P] [US6] Create Popover stories in packages/ui/src/components/popover.stories.tsx
- [x] T073 [US6] Verify existing Dialog, Toast, Tooltip components have proper EVEN styling
- [x] T074 [US6] Update Tooltip stories with all placement options in packages/ui/src/components/tooltip.stories.tsx
- [x] T075 [US6] Export all feedback components from packages/ui/src/index.ts

**Checkpoint**: User Story 6 complete - feedback components ready

---

## Phase 11: User Story 7 - Layout Utilities (Priority: P2)

**Goal**: Layout utility components (Container, Divider, ScrollArea, Progress, Spinner)

**Independent Test**: Build sample page layouts and verify responsive behavior across breakpoints

### Implementation for User Story 7

- [x] T076 [P] [US7] Create Container component in packages/ui/src/components/container.tsx with size variants
- [x] T077 [P] [US7] Create Container stories in packages/ui/src/components/container.stories.tsx
- [x] T078 [P] [US7] Create Divider component in packages/ui/src/components/divider.tsx using @radix-ui/react-separator
- [x] T079 [P] [US7] Create Divider stories in packages/ui/src/components/divider.stories.tsx
- [x] T080 [P] [US7] Create ScrollArea component in packages/ui/src/components/scroll-area.tsx using @radix-ui/react-scroll-area
- [x] T081 [P] [US7] Create ScrollArea stories in packages/ui/src/components/scroll-area.stories.tsx
- [x] T082 [P] [US7] Create Spinner component in packages/ui/src/components/spinner.tsx with CSS animation
- [x] T083 [P] [US7] Create Spinner stories in packages/ui/src/components/spinner.stories.tsx
- [x] T084 [P] [US7] Create Progress component in packages/ui/src/components/progress.tsx using @radix-ui/react-progress
- [x] T085 [P] [US7] Create Progress stories in packages/ui/src/components/progress.stories.tsx
- [x] T086 [US7] Export all layout/utility components from packages/ui/src/index.ts

**Checkpoint**: User Story 7 complete - layout utilities ready

---

## Phase 12: User Story 10 - Documentation (Priority: P3)

**Goal**: Comprehensive documentation for design system adoption

**Independent Test**: New developer can install and build a sample page within 10 minutes

### Implementation for User Story 10

- [x] T087 [P] [US10] Update quickstart.md with installation instructions in specs/005-even-design-system/quickstart.md
- [x] T088 [P] [US10] Add component usage examples to Storybook docs
- [x] T089 [US10] Create component index page in Storybook showing all components at a glance
- [x] T090 [US10] Document design token usage patterns in Storybook

**Checkpoint**: User Story 10 complete - documentation enables quick adoption

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and improvements

- [x] T091 Run full Storybook build to verify all stories compile (bun run build in apps/storybook)
- [x] T092 Run Biome format check on all new files (bun run check in packages/ui)
- [x] T093 Verify packages/ui builds successfully (bun run build in packages/ui)
- [x] T094 Run accessibility audit in Storybook and fix any remaining violations
- [x] T095 Test all components in apps/web to verify integration
- [x] T096 Update packages/ui/src/index.ts barrel export with all new components
- [x] T097 Verify bundle size is under 100KB gzipped
- [x] T098 Create E2E test for design system components in e2e/tests/design-system.spec.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - P1 stories can proceed in parallel after Phase 2
  - P2 stories can start after P1 foundations are in place
  - P3 stories can start after core components exist
- **Polish (Phase 13)**: Depends on all user stories being complete

### User Story Dependencies

| Story | Priority | Dependencies | Can Parallelize After |
|-------|----------|--------------|----------------------|
| US1 (Tokens) | P1 | Phase 2 | Phase 2 |
| US8 (Tailwind) | P1 | US1 | Phase 2 |
| US2 (Core Components) | P1 | US1 | Phase 2 |
| US9 (Accessibility) | P1 | US2 | Phase 5 |
| US3 (Storybook) | P1 | US2 | Phase 5 |
| US5 (Forms) | P2 | US2 | Phase 5 |
| US4 (Navigation) | P2 | US2 | Phase 5 |
| US6 (Feedback) | P2 | US2 | Phase 5 |
| US7 (Layout) | P2 | US1 | Phase 3 |
| US10 (Docs) | P3 | All P1/P2 | Phase 12 |

### Within Each User Story

- Stories marked [P] can run in parallel (different files)
- Export tasks depend on component implementations
- Story files can be created in parallel with components

### Parallel Opportunities

After Phase 2 completes, maximum parallelization:
- US1, US2, US7, US8 can all start together
- Within US5: All form components (T050-T057) can run in parallel
- Within US7: All layout components (T076-T085) can run in parallel

---

## Parallel Example: User Story 5 (Form Components)

```bash
# Launch all form components in parallel:
Task: "Create Checkbox component in packages/ui/src/components/checkbox.tsx"
Task: "Create RadioGroup component in packages/ui/src/components/radio-group.tsx"
Task: "Create Switch component in packages/ui/src/components/switch.tsx"
Task: "Create Textarea component in packages/ui/src/components/textarea.tsx"

# Then create stories in parallel:
Task: "Create Checkbox stories in packages/ui/src/components/checkbox.stories.tsx"
Task: "Create RadioGroup stories in packages/ui/src/components/radio-group.stories.tsx"
Task: "Create Switch stories in packages/ui/src/components/switch.stories.tsx"
Task: "Create Textarea stories in packages/ui/src/components/textarea.stories.tsx"
```

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T011)
3. Complete Phase 3: US1 Design Tokens (T012-T019)
4. Complete Phase 4: US8 Tailwind Config (T020-T024)
5. Complete Phase 5: US2 Core Components (T025-T035)
6. **STOP and VALIDATE**: Test core components with design tokens
7. Complete Phase 6: US9 Accessibility (T036-T042)
8. Complete Phase 7: US3 Storybook (T043-T049)
9. Deploy MVP - core design system usable

### Incremental Delivery

1. MVP (P1 stories) → Design tokens + core components + Storybook
2. Add US5 Forms → Forms with validation
3. Add US4 Navigation → Header, Sidebar, Breadcrumb
4. Add US6 Feedback → Alerts, Popovers
5. Add US7 Layout → Container, Divider, ScrollArea, Progress, Spinner
6. Add US10 Docs → Full documentation

---

## Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 98 |
| Setup Tasks | 4 |
| Foundational Tasks | 7 |
| US1 (Tokens) Tasks | 8 |
| US8 (Tailwind) Tasks | 5 |
| US2 (Core) Tasks | 11 |
| US9 (A11y) Tasks | 7 |
| US3 (Storybook) Tasks | 7 |
| US5 (Forms) Tasks | 11 |
| US4 (Navigation) Tasks | 8 |
| US6 (Feedback) Tasks | 7 |
| US7 (Layout) Tasks | 11 |
| US10 (Docs) Tasks | 4 |
| Polish Tasks | 8 |
| Parallel Opportunities | 52 tasks marked [P] |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All components use existing patterns (Radix UI + CVA + cn utility)
