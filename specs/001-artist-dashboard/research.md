# Research: Music Artist Dashboard

**Feature**: 001-artist-dashboard
**Date**: 2026-02-05

## Technology Decisions

### 1. Monorepo Structure (Bun Workspaces + Turborepo)

**Decision**: Use Bun workspaces for package management with Turborepo for build orchestration.

**Rationale**:
- Bun workspaces provide native monorepo support with faster installs than npm/yarn
- Turborepo adds intelligent caching, parallel task execution, and dependency-aware builds
- Both tools are explicitly required by project constraints

**Alternatives Considered**:
- pnpm workspaces: Not allowed per constraints (Bun required)
- Nx: More complex, Turborepo sufficient for this scope

**Implementation**:
```json
// package.json (root)
{
  "workspaces": ["apps/*", "packages/*", "e2e"]
}

// turbo.json
{
  "tasks": {
    "build": { "dependsOn": ["^build"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "typecheck": { "dependsOn": ["^build"] }
  }
}
```

---

### 2. Next.js 14 App Router Configuration

**Decision**: Use App Router with client components for interactive dashboard sections.

**Rationale**:
- App Router is the modern Next.js standard
- Client components needed for TanStack Query, chart interactions, and state
- Server components used for layout and static portions only

**Alternatives Considered**:
- Pages Router: Deprecated pattern, not recommended
- Full SSR: Unnecessary for mock data; client-side fetching simpler

**Implementation Notes**:
- Root layout provides dark theme via class on `<html>`
- Dashboard page is client component ("use client")
- Error boundary via `error.tsx`, 404 via `not-found.tsx`

---

### 3. Fastify API Structure

**Decision**: Use Fastify with TypeScript, Zod validation, and deterministic mock data.

**Rationale**:
- Fastify is performant and TypeScript-friendly
- Zod schemas shared with frontend via packages/shared
- Seeded random data ensures consistent E2E tests

**Alternatives Considered**:
- Express: Less TypeScript-native, slower
- tRPC: More coupling than needed for REST API demo

**Mock Data Strategy**:
```typescript
// Deterministic seeding
const seed = 12345;
const rng = seedrandom(seed);

// Generate consistent data across runs
const generateSalesData = (range: string) => {
  // Use seeded RNG for reproducible results
};
```

---

### 4. shadcn/ui Component Setup

**Decision**: Install shadcn/ui components in packages/ui with shared Tailwind config.

**Rationale**:
- Components are copy-paste (no npm dependency lock-in)
- Customizable to EVEN brand (dark theme, rounded cards, pill controls)
- Tailwind CSS variables for theming

**Components Required**:
| Component | Purpose |
|-----------|---------|
| Button | Actions, controls |
| Card | Content containers |
| Badge | Release type labels |
| Tabs | Segmented controls |
| Input | Form fields |
| Select | Dropdowns |
| Tooltip | Hover information |
| Skeleton | Loading states |
| Sheet | Release detail drawer |
| Dialog | Send update modal |
| Toast | Success notifications |

**Theme Customization**:
```css
:root {
  --radius: 1rem; /* 16px rounded cards */
  --background: 0 0% 7%; /* Dark surface */
  --foreground: 0 0% 98%; /* Light text */
  --primary: 0 0% 98%; /* High contrast */
  --accent: 217 91% 60%; /* Minimal accent */
}
```

---

### 5. TanStack Query Setup

**Decision**: Use TanStack Query v5 with custom hooks for each endpoint.

**Rationale**:
- Handles caching, deduplication, background refetch
- Provides loading/error states out of the box
- Required by project constraints

**Implementation**:
```typescript
// hooks/use-api.ts
export const useArtist = () => {
  return useQuery({
    queryKey: ['artist'],
    queryFn: () => apiClient.get('/artist'),
  });
};

export const useSales = (range: string) => {
  return useQuery({
    queryKey: ['sales', range],
    queryFn: () => apiClient.get(`/sales?range=${range}`),
  });
};
```

---

### 6. Recharts Configuration

**Decision**: Use Recharts for all data visualization with consistent dark theme styling.

**Rationale**:
- Required by constraints
- Good React integration, responsive
- Sufficient for line/area charts and sparklines

**Chart Components**:
- Sales Analytics: AreaChart with gradient fill
- Release Sparkline: LineChart (minimal, no axes)
- Engagement Trend: LineChart (compact)

**Styling Approach**:
```tsx
<ChartContainer>
  <ResponsiveContainer>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* ... */}
    </AreaChart>
  </ResponsiveContainer>
</ChartContainer>
```

---

### 7. Biome Configuration

**Decision**: Use Biome for linting and formatting (no ESLint, no Prettier).

**Rationale**:
- Required by constraints
- Single tool replaces both linter and formatter
- Faster than ESLint + Prettier combination

**Configuration**:
```json
// biome.json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

---

### 8. Playwright E2E Testing

**Decision**: Playwright configured to start both api and web servers before tests.

**Rationale**:
- Required by constraints
- Best cross-browser support
- Built-in server management via `webServer` config

**Configuration**:
```typescript
// playwright.config.ts
export default defineConfig({
  webServer: [
    {
      command: 'bun run --filter=@even/api dev',
      port: 4000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'bun run --filter=@even/web dev',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

**Test Coverage**:
1. Dashboard loads with artist header + KPIs
2. Changing range selector updates analytics
3. Clicking release opens details drawer

---

### 9. Storybook Setup

**Decision**: Storybook in apps/storybook consuming packages/ui components.

**Rationale**:
- Required by constraints
- Isolated component development
- Documentation for design system

**Configuration**:
```typescript
// .storybook/main.ts
export default {
  stories: ['../../../packages/ui/src/**/*.stories.tsx'],
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
};
```

---

## Accessibility Considerations

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | Focus visible on all interactive elements; tab order logical |
| ARIA labels | All buttons, icons, and controls have descriptive labels |
| Color contrast | WCAG AA minimum (4.5:1 text, 3:1 large text); tested via Storybook a11y addon |
| Screen readers | Semantic HTML; ARIA live regions for dynamic updates |
| Focus management | Drawer/dialog trap focus; return focus on close |

---

## Performance Considerations

| Metric | Target | Strategy |
|--------|--------|----------|
| Dashboard load | <3s | Skeleton loaders; parallel API calls |
| Range change | <1s | TanStack Query caching; optimistic UI |
| Filter/sort | <500ms | Client-side filtering of loaded data |
| Bundle size | <200KB initial | Tree-shaking; dynamic imports for charts |

---

## Unresolved Questions

None. All technical decisions resolved per project constraints.
