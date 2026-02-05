<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0 (MINOR: Added technology stack constraints)
Modified principles: None renamed
Added sections:
  - Technology Stack Constraints (new subsection under Technology Standards)
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (Constitution Check section compatible)
  - .specify/templates/spec-template.md ✅ (User scenarios align with TDD principle)
  - .specify/templates/tasks-template.md ✅ (Phase structure supports principles)
  - .specify/templates/checklist-template.md ✅ (No principle-specific references)
  - .specify/templates/agent-file-template.md ✅ (No principle-specific references)
Follow-up TODOs: None
-->

# Even Constitution

## Core Principles

### I. Simplicity First

Every implementation MUST start with the simplest solution that satisfies requirements.

- Avoid premature abstraction: Code MAY be duplicated up to three times before extraction
- YAGNI (You Aren't Gonna Need It): Features MUST NOT be implemented until explicitly required
- Complexity MUST be justified in the Complexity Tracking section of the implementation plan
- No wrapper classes, utility modules, or abstractions for single-use operations

**Rationale**: Complexity is the primary enemy of maintainability. Simple code is easier to
understand, test, debug, and modify. Over-engineering creates technical debt that compounds over time.

### II. Test-Driven Development

Tests MUST be written before implementation code (Red-Green-Refactor cycle).

- **Red**: Write a failing test that defines expected behavior
- **Green**: Write minimal code to make the test pass
- **Refactor**: Improve code quality while keeping tests green
- Test coverage MUST focus on behavior, not implementation details
- E2E tests MUST cover critical user journeys
- Unit tests SHOULD cover business logic and edge cases

**Rationale**: TDD ensures requirements are understood before coding, prevents regression,
documents expected behavior, and promotes modular design.

### III. Component Architecture

Frontend and backend MUST be organized into self-contained, independently testable components.

- Each component MUST have a single, clear responsibility
- Components MUST communicate through well-defined interfaces (props, events, APIs)
- Shared code MUST be extracted to dedicated packages only when used by 3+ consumers
- Component dependencies MUST flow in one direction (no circular dependencies)
- State management MUST be explicit and centralized where shared

**Rationale**: Component isolation enables parallel development, simplifies testing,
improves reusability, and makes the system easier to reason about.

### IV. API-First Design

All backend functionality MUST be designed as APIs before implementation.

- API contracts MUST be documented before coding begins
- Request/response schemas MUST be validated at boundaries using Zod
- Error responses MUST follow consistent format with requestId and actionable messages
- Versioning MUST be explicit when breaking changes are introduced
- APIs MUST be stateless where possible

**Rationale**: API-first ensures frontend and backend can develop in parallel,
contracts serve as documentation, and integration issues are caught early.

### V. Observability

All production code MUST be observable and debuggable.

- Structured logging MUST be used with correlation IDs
- Errors MUST include sufficient context for debugging without reproducing
- Loading states MUST be explicit (skeleton loaders, spinners)
- Health endpoints MUST report system status accurately
- User actions MUST be traceable through the system

**Rationale**: Production issues cannot be fixed without visibility. Observability enables
rapid diagnosis, reduces mean time to recovery, and builds confidence in deployments.

## Technology Standards

Technology choices are constrained by project requirements.

### Stack Constraints (Non-Negotiable)

| Layer | Technology | Notes |
|-------|------------|-------|
| Runtime | Bun | Package manager and runtime |
| Monorepo | Bun workspaces + Turborepo | Build orchestration |
| Frontend | Next.js 14+ App Router | React framework |
| Language | TypeScript (strict) | All packages |
| Styling | Tailwind CSS | Utility-first CSS |
| Components | shadcn/ui | Centralized in packages/ui |
| Lint/Format | Biome | NO eslint, NO prettier |
| Charts | Recharts | Data visualization |
| Data Fetching | TanStack Query | Server state management |
| E2E Testing | Playwright | Required for all user journeys |
| Schema Validation | Zod | API boundaries |

### Quality Standards

- **Accessibility**: Web interfaces MUST meet WCAG 2.1 AA standards
- **Responsiveness**: All views MUST work on mobile and desktop
- **Security**: Follow OWASP guidelines; validate all external input
- **Performance**: Define and measure against explicit performance budgets

## Development Workflow

All code changes MUST follow a consistent workflow.

- **Feature branches**: All work MUST be done on feature branches
- **Code review**: All changes MUST be reviewed before merging
- **CI/CD**: All tests MUST pass before merge; deployment MUST be automated
- **Documentation**: User-facing changes MUST include documentation updates
- **Commit messages**: MUST be descriptive and reference related issues/specs

## Governance

This constitution establishes the foundational principles for the Even project.

- Constitution supersedes conflicting practices in other documentation
- All implementation plans MUST verify compliance in the Constitution Check section
- Amendments require:
  1. Written proposal with rationale
  2. Review of impact on existing code and documentation
  3. Migration plan for non-compliant code (if applicable)
  4. Version increment following semantic versioning
- Compliance reviews SHOULD be conducted during code review
- Violations MUST be documented and justified in Complexity Tracking

**Versioning Policy**:
- MAJOR: Removal or incompatible redefinition of principles
- MINOR: New principles or materially expanded guidance
- PATCH: Clarifications, wording improvements, typo fixes

**Version**: 1.1.0 | **Ratified**: 2026-02-05 | **Last Amended**: 2026-02-05
