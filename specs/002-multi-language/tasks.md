# Tasks: Multi-Language Support

**Input**: Design documents from `/specs/002-multi-language/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: E2E tests included per constitution (TDD principle, Playwright required for user journeys)

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `apps/web/src/`
- **Shared package**: `packages/shared/src/`
- **E2E tests**: `e2e/tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create i18n configuration structure

- [x] T001 Install next-intl dependency in apps/web using `bun add next-intl`
- [x] T002 [P] Create i18n directory structure at apps/web/src/i18n/
- [x] T003 [P] Create language configuration with supported locales in apps/web/src/i18n/config.ts
- [x] T004 [P] Create translations directory at apps/web/src/i18n/translations/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core i18n infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create English translation file with all ~50 UI strings in apps/web/src/i18n/translations/en.json
- [x] T006 [P] Create Spanish translation file with all UI strings in apps/web/src/i18n/translations/es.json
- [x] T007 [P] Create Brazilian Portuguese translation file with all UI strings in apps/web/src/i18n/translations/pt-BR.json
- [x] T008 Create LanguageProvider component with NextIntlClientProvider in apps/web/src/i18n/provider.tsx
- [x] T009 Create useLanguage hook exporting locale and setLocale in apps/web/src/i18n/provider.tsx
- [x] T010 Update root layout to wrap children with LanguageProvider in apps/web/src/app/layout.tsx
- [x] T011 Add locale parameter to formatCurrency function in packages/shared/src/utils/format.ts
- [x] T012 [P] Add locale parameter to formatCompactNumber function in packages/shared/src/utils/format.ts
- [x] T013 [P] Add locale parameter to formatNumber function in packages/shared/src/utils/format.ts
- [x] T014 [P] Add locale parameter to formatPercent function in packages/shared/src/utils/format.ts
- [x] T015 [P] Add locale parameter to formatDate function in packages/shared/src/utils/format.ts
- [x] T016 [P] Add locale parameter to formatRelativeTime function in packages/shared/src/utils/format.ts
- [x] T017 [P] Add locale parameter to formatChange function in packages/shared/src/utils/format.ts

**Checkpoint**: Foundation ready - all translation files, provider, and format utilities support locales

---

## Phase 3: User Story 1 - Switch Dashboard Language (Priority: P1) 🎯 MVP

**Goal**: Artist can select language from dropdown and all UI text updates immediately without page reload

**Independent Test**: Change language in selector → verify all visible text changes to selected language

### E2E Tests for User Story 1

- [x] T018 [P] [US1] Create language switching E2E test file at e2e/tests/language-switching.spec.ts
- [x] T019 [US1] Add test: switches language from English to Spanish in e2e/tests/language-switching.spec.ts
- [x] T020 [US1] Add test: switches language from Spanish to Brazilian Portuguese in e2e/tests/language-switching.spec.ts
- [x] T021 [US1] Add test: language selector shows current language in e2e/tests/language-switching.spec.ts

### Implementation for User Story 1

- [x] T022 [P] [US1] Create LanguageSelector component with Globe icon in apps/web/src/components/language-selector.tsx
- [x] T023 [US1] Add LanguageSelector to artist header component in apps/web/src/components/artist-header.tsx
- [x] T024 [US1] Replace hardcoded text with t() calls in apps/web/src/components/kpi-cards.tsx
- [x] T025 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/components/earnings-analytics.tsx
- [x] T026 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/components/fans-section.tsx
- [x] T027 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/components/products-grid.tsx
- [x] T028 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/components/product-card.tsx
- [x] T029 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/components/product-drawer.tsx
- [x] T030 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/components/send-update-dialog.tsx
- [x] T031 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/app/error.tsx
- [x] T032 [P] [US1] Replace hardcoded text with t() calls in apps/web/src/app/not-found.tsx
- [x] T033 [US1] Update html lang attribute dynamically based on locale in apps/web/src/app/layout.tsx

**Checkpoint**: User Story 1 complete - language selector visible, all UI text switches immediately

---

## Phase 4: User Story 2 - Persist Language Preference (Priority: P2)

**Goal**: Language preference persists across browser sessions via localStorage

**Independent Test**: Select Spanish → close browser → reopen dashboard → verify Spanish still selected

### E2E Tests for User Story 2

- [x] T034 [P] [US2] Add test: language preference persists after page reload in e2e/tests/language-switching.spec.ts
- [x] T035 [US2] Add test: new user sees English by default in e2e/tests/language-switching.spec.ts

### Implementation for User Story 2

- [x] T036 [US2] Add localStorage save on setLocale in apps/web/src/i18n/provider.tsx
- [x] T037 [US2] Add localStorage read on initial mount in apps/web/src/i18n/provider.tsx
- [x] T038 [US2] Handle hydration mismatch by rendering default locale until mounted in apps/web/src/i18n/provider.tsx

**Checkpoint**: User Story 2 complete - language preference persists across sessions

---

## Phase 5: User Story 3 - Localized Number and Currency Formats (Priority: P2)

**Goal**: Currency values, numbers, and dates display in locale-appropriate formats

**Independent Test**: Switch to Spanish → verify currency shows "1.234,56 $" format; switch to pt-BR → verify "R$ 1.234,56" format

### E2E Tests for User Story 3

- [x] T039 [P] [US3] Create locale formatting E2E test file at e2e/tests/locale-formatting.spec.ts
- [x] T040 [US3] Add test: English locale shows USD currency as $1,234.56 in e2e/tests/locale-formatting.spec.ts
- [x] T041 [US3] Add test: Spanish locale shows currency with comma decimal in e2e/tests/locale-formatting.spec.ts
- [x] T042 [US3] Add test: Brazilian Portuguese locale shows BRL currency format in e2e/tests/locale-formatting.spec.ts
- [x] T043 [US3] Add test: dates display in locale-appropriate format in e2e/tests/locale-formatting.spec.ts

### Implementation for User Story 3

- [x] T044 [US3] Update kpi-cards to pass locale to format functions in apps/web/src/components/kpi-cards.tsx
- [x] T045 [P] [US3] Update earnings-analytics to pass locale to format functions in apps/web/src/components/earnings-analytics.tsx
- [x] T046 [P] [US3] Update fans-section to pass locale to format functions in apps/web/src/components/fans-section.tsx
- [x] T047 [P] [US3] Update products-grid to pass locale to format functions in apps/web/src/components/products-grid.tsx
- [x] T048 [P] [US3] Update product-card to pass locale to format functions in apps/web/src/components/product-card.tsx
- [x] T049 [P] [US3] Update product-drawer to pass locale to format functions in apps/web/src/components/product-drawer.tsx
- [x] T050 [US3] Verify chart tooltips display locale-aware formatting in apps/web/src/components/earnings-analytics.tsx

**Checkpoint**: User Story 3 complete - all numbers, currencies, dates display in locale-appropriate formats

---

## Phase 6: User Story 4 - Browser Language Detection (Priority: P3)

**Goal**: First-time visitors see dashboard in their browser's language if supported

**Independent Test**: Set browser to Spanish → visit dashboard as new user → verify Spanish displayed

### E2E Tests for User Story 4

- [x] T051 [P] [US4] Add test: browser language Spanish detected for new user in e2e/tests/language-switching.spec.ts
- [x] T052 [US4] Add test: unsupported browser language falls back to English in e2e/tests/language-switching.spec.ts
- [x] T053 [US4] Add test: stored preference takes priority over browser language in e2e/tests/language-switching.spec.ts

### Implementation for User Story 4

- [x] T054 [US4] Add browser language detection using navigator.language in apps/web/src/i18n/provider.tsx
- [x] T055 [US4] Add partial locale matching (es-MX → es) in apps/web/src/i18n/provider.tsx
- [x] T056 [US4] Ensure stored preference takes priority over browser detection in apps/web/src/i18n/provider.tsx

**Checkpoint**: User Story 4 complete - browser language auto-detected for new users

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Quality assurance, edge cases, and final validation

- [x] T057 [P] Verify no text truncation or overflow in Spanish translations across all components
- [x] T058 [P] Verify no text truncation or overflow in Portuguese translations across all components
- [x] T059 Add missing translation fallback with English text and console warning in apps/web/src/i18n/provider.tsx
- [x] T060 [P] Run full E2E test suite to verify all language features work together
- [x] T061 Run quickstart.md validation to confirm patterns match implementation
- [x] T062 Verify TypeScript compilation passes with no type errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on Foundational (independent of US1)
- **User Story 3 (Phase 5)**: Depends on Foundational (independent of US1/US2)
- **User Story 4 (Phase 6)**: Depends on Foundational (independent of US1/US2/US3)
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Shares provider.tsx with US4 but different functions
- **User Story 3 (P2)**: Can start after Foundational - Independent of US1/US2/US4
- **User Story 4 (P3)**: Can start after Foundational - Shares provider.tsx with US2 but different functions

### Within Each User Story

- E2E tests written first (TDD)
- Core implementation follows
- Integration with existing components last

### Parallel Opportunities

**Phase 2 (Foundational):**
- T006, T007 can run in parallel (translation files)
- T011-T017 can run in parallel (format function updates)

**Phase 3 (US1):**
- T022-T032 component updates can largely run in parallel (different files)

**Phase 5 (US3):**
- T044-T049 component format updates can run in parallel

**Cross-Phase:**
- US1, US2, US3, US4 can be worked on in parallel by different developers after Foundational completes

---

## Parallel Example: User Story 1 Components

```bash
# Launch all component translations in parallel:
Task: "Replace hardcoded text with t() calls in apps/web/src/components/earnings-analytics.tsx"
Task: "Replace hardcoded text with t() calls in apps/web/src/components/fans-section.tsx"
Task: "Replace hardcoded text with t() calls in apps/web/src/components/products-grid.tsx"
Task: "Replace hardcoded text with t() calls in apps/web/src/components/product-card.tsx"
Task: "Replace hardcoded text with t() calls in apps/web/src/components/product-drawer.tsx"
Task: "Replace hardcoded text with t() calls in apps/web/src/components/send-update-dialog.tsx"
```

---

## Parallel Example: Format Function Updates

```bash
# Launch all format function updates in parallel:
Task: "Add locale parameter to formatCompactNumber function in packages/shared/src/utils/format.ts"
Task: "Add locale parameter to formatNumber function in packages/shared/src/utils/format.ts"
Task: "Add locale parameter to formatPercent function in packages/shared/src/utils/format.ts"
Task: "Add locale parameter to formatDate function in packages/shared/src/utils/format.ts"
Task: "Add locale parameter to formatRelativeTime function in packages/shared/src/utils/format.ts"
Task: "Add locale parameter to formatChange function in packages/shared/src/utils/format.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test language switching independently
5. Deploy/demo if ready - artists can now switch languages!

### Incremental Delivery

1. Complete Setup + Foundational → Infrastructure ready
2. Add User Story 1 → Language switching works → Deploy/Demo (MVP!)
3. Add User Story 2 → Preference persists → Deploy/Demo
4. Add User Story 3 → Locale formatting → Deploy/Demo
5. Add User Story 4 → Browser detection → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (P1 - MVP)
   - Developer B: User Story 3 (P2 - parallel safe)
3. After US1/US3 complete:
   - Developer A: User Story 2 (shares provider.tsx)
   - Developer B: User Story 4 (shares provider.tsx after US2)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- E2E tests written first per TDD principle
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Translation files (T005-T007) contain all ~50 UI strings from data-model.md Messages interface
