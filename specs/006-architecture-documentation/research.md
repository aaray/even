# Research: Architecture Documentation Suite

**Feature**: 006-architecture-documentation
**Date**: 2026-02-05

## Research Questions & Findings

### 1. Documentation Framework Selection

**Question**: Which documentation framework best fits the existing Next.js/Bun monorepo?

**Decision**: Nextra 4.x

**Rationale**:
- Built on Next.js 15, aligns with existing stack
- Native MDX support with React component embedding
- Built-in search (FlexSearch), sidebar navigation, dark mode
- Theme system compatible with Tailwind CSS
- Active maintenance, large community
- Minimal configuration, works with App Router

**Alternatives Considered**:

| Framework | Pros | Cons | Rejected Because |
|-----------|------|------|------------------|
| Docusaurus | Popular, feature-rich | React 17, Webpack-based, doesn't integrate with Next.js monorepo | Different build system, would need separate tooling |
| VitePress | Fast, Vue-based | Vue, not React | Different framework, doesn't share components |
| Mintlify | Beautiful out-of-box | Hosted service, cost | Adds external dependency, less control |
| Raw MDX + Next.js | Full control | Significant boilerplate for nav, search, TOC | Re-inventing Nextra features |
| Storybook Docs | Already in project | Not designed for long-form documentation | Good for component docs, not architecture/ADRs |

### 2. Diagram Rendering Technology

**Question**: How to render interactive diagrams from text-based sources?

**Decision**: Mermaid with `mermaid-js/mermaid` + custom React wrapper

**Rationale**:
- Text-based: `.mmd` files are version-controllable, diffable in PRs
- Wide syntax coverage: flowcharts, sequence, C4, ER diagrams, state machines
- Browser-native: No server-side rendering needed
- Interactive: Pan, zoom via wrapper component
- MDX-friendly: Easy to embed in documentation

**Implementation Approach**:
```tsx
// Custom component for enhanced interactivity
<DiagramViewer src="/diagrams/architecture/system-context.mmd" />
```

**Alternatives Considered**:

| Tool | Pros | Cons | Rejected Because |
|------|------|------|------------------|
| PlantUML | Rich diagram types | Requires Java server, not browser-native | Server dependency, slower iteration |
| D2 | Modern syntax, beautiful output | Newer, smaller ecosystem | Less mature, fewer examples |
| Structurizr | Purpose-built for C4 | DSL-based, requires learning curve | Overkill for current needs |
| Draw.io | Visual editor, exports | Binary files, not diffable | Violates docs-as-code principle |
| Excalidraw | Hand-drawn aesthetic | Less formal for architecture docs | Aesthetic mismatch for technical docs |

### 3. ADR Format and Tooling

**Question**: What ADR format and management approach to use?

**Decision**: MADR (Markdown Any Decision Records) format v3.0

**Rationale**:
- Widely adopted standard
- Comprehensive sections: context, decision, consequences, alternatives
- Markdown-native, works with MDX
- Supports status lifecycle (proposed, accepted, deprecated, superseded)

**Template Structure**:
```markdown
# ADR-NNN: [Title]

**Status**: proposed | accepted | deprecated | superseded by [ADR-XXX]
**Date**: YYYY-MM-DD
**Decision Makers**: [names]

## Context

[Problem description and constraints]

## Decision

[What was decided]

## Consequences

### Positive
- [benefit 1]

### Negative
- [tradeoff 1]

## Alternatives Considered

### [Alternative 1]
[Description and why rejected]

## Related Decisions

- [ADR-XXX](./xxx-title.md) - [relationship]
```

**Alternatives Considered**:

| Format | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Nygard format | Original, minimal | Too brief, lacks alternatives section | Insufficient for complex decisions |
| Y-statements | Concise | Too terse for team understanding | Lacks context for onboarding |
| Custom format | Full flexibility | Non-standard, learning curve | Wheel reinvention |

### 4. Search Implementation

**Question**: How to implement full-text search across all documentation?

**Decision**: Nextra built-in search (FlexSearch)

**Rationale**:
- Zero configuration with Nextra
- Client-side, no backend needed
- Fast indexing at build time
- Supports fuzzy matching
- Search index ships with static site

**Enhancements**:
- Custom search result ranking for ADRs (by status, date)
- Tag-based filtering (architecture, adr, manual, api)

**Alternatives Considered**:

| Solution | Pros | Cons | Rejected Because |
|----------|------|------|------------------|
| Algolia | Powerful, hosted search | Cost, external service | Overkill for internal docs, adds dependency |
| Elasticsearch | Full-featured | Server infrastructure needed | Complexity for static docs |
| Pagefind | Static search, fast | Less Next.js integration | FlexSearch already in Nextra |

### 5. Interactive Diagram Features

**Question**: What level of diagram interactivity is needed?

**Decision**: Pan, zoom, click-to-navigate (drill-down)

**Rationale**:
- Pan/zoom: Essential for large architecture diagrams
- Click-to-navigate: Links diagram elements to detail pages
- SVG-based: Mermaid outputs SVG, supports CSS styling and JS events

**Implementation**:
```tsx
// DiagramViewer component features
- Zoom controls (buttons + scroll)
- Pan via drag
- Click handlers on nodes → navigate to detail pages
- Responsive container (fits viewport)
- Loading skeleton while rendering
```

**Not Included** (per spec out of scope):
- Collaborative editing
- Animation/transitions between diagram states
- Export to PDF/image (can add later)

### 6. Version-Aligned Documentation

**Question**: How to support documentation versioning for different releases?

**Decision**: Git branches + version selector in UI

**Rationale**:
- Documentation lives with code in same repo
- Version branches mirror release branches
- Nextra supports version dropdown navigation
- Simple mental model: `docs/v1.x`, `docs/v2.x` paths

**Implementation**:
- Main branch = latest docs
- Release branches include docs snapshot
- Version selector in nav header
- Cross-version search (optional enhancement)

### 7. API Documentation Approach

**Question**: How to document the existing Fastify API endpoints?

**Decision**: OpenAPI spec + Scalar UI integration

**Rationale**:
- OpenAPI is industry standard
- Can generate from Fastify routes (fastify-swagger)
- Scalar provides interactive API explorer (try-it-out)
- Embeddable in MDX pages

**Implementation**:
1. Add `@fastify/swagger` to `apps/api`
2. Generate OpenAPI spec at build time
3. Embed Scalar component in `apps/docs/src/pages/api/`
4. Sync spec with docs during build

**Alternatives Considered**:

| Tool | Pros | Cons | Rejected Because |
|------|------|------|------------------|
| Swagger UI | Ubiquitous | Dated UI, heavy bundle | Less modern than Scalar |
| Redoc | Clean design | Read-only, no try-it | Missing interactive feature |
| Stoplight Elements | Beautiful | Commercial for some features | Cost for advanced features |
| Hand-written docs | Full control | Maintenance burden, drift | Will get out of sync |

## Technology Decisions Summary

| Area | Decision | Key Dependency |
|------|----------|----------------|
| Documentation Framework | Nextra 4.x | `nextra`, `nextra-theme-docs` |
| Diagram Rendering | Mermaid | `mermaid`, custom DiagramViewer |
| ADR Format | MADR v3.0 | N/A (markdown convention) |
| Search | FlexSearch (via Nextra) | Built into Nextra |
| API Docs | OpenAPI + Scalar | `@fastify/swagger`, `@scalar/nextjs-api-reference` |
| Styling | Tailwind (via @even/ui) | Existing dependency |

## Dependencies to Add

```json
{
  "apps/docs": {
    "nextra": "^4.0.0",
    "nextra-theme-docs": "^4.0.0",
    "mermaid": "^11.0.0",
    "@scalar/nextjs-api-reference": "^0.4.0"
  },
  "apps/api": {
    "@fastify/swagger": "^9.0.0",
    "@fastify/swagger-ui": "^5.0.0"
  }
}
```

## Open Questions Resolved

All technical questions resolved. No blockers for Phase 1.
