# EVEN Artist Dashboard

A production-quality artist dashboard for EVEN, a direct-to-fan platform where artists sell Music, Videos, Merch, and Experiences while retaining more revenue (87% vs industry average 70%).

## Features

- **Artist Overview**: Profile with KPI cards (earnings, revenue retained %, fans, engagement)
- **Earnings Analytics**: Interactive charts with category breakdown and time range selection
- **Products Grid**: Filterable/sortable grid across all EVEN categories with detail drawer
- **Fan Engagement**: Fan metrics, growth chart, top locations, and send update dialog

## Tech Stack

- **Runtime**: Bun
- **Monorepo**: Turborepo with Bun workspaces
- **Frontend**: Next.js 15 (App Router), React 19
- **API**: Fastify with mock data
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts
- **Data Fetching**: TanStack Query
- **Validation**: Zod
- **Testing**: Playwright (E2E), Storybook (component documentation)
- **Linting**: Biome

## Documentation

Full documentation is available in the docs app:

```bash
bun run dev --filter=@even/docs
```

Or browse the docs at http://localhost:3001 when running.

- [Architecture](/apps/docs/src/pages/architecture) - System design and diagrams
- [ADRs](/apps/docs/src/pages/adr) - Architecture Decision Records
- [User Manuals](/apps/docs/src/pages/manuals) - How-to guides
- [API Reference](/apps/docs/src/pages/api) - REST API documentation

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── api/          # Fastify mock API
│   ├── docs/         # Documentation (Nextra)
│   └── storybook/    # Component documentation
├── packages/
│   ├── ui/           # Design system (shadcn-based)
│   ├── shared/       # Types, schemas, utilities
│   └── docs-content/ # Shared documentation content
└── e2e/              # Playwright E2E tests
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (latest stable)

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start all development servers
bun run dev

# Or start individual services
bun run dev --filter=@even/web      # Frontend on http://localhost:3000
bun run dev --filter=@even/api      # API on http://localhost:4000
bun run dev --filter=@even/storybook # Storybook on http://localhost:6006
```

### Build

```bash
# Build all packages
bun run build

# Build specific package
bun run build --filter=@even/web
```

### Testing

```bash
# Run E2E tests
bun run test:e2e

# Run E2E tests with UI
bun run --filter=@even/e2e test:ui
```

### Linting

```bash
# Check code style
bun run lint

# Fix auto-fixable issues
bun run lint:fix

# Format code
bun run format
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/artist` | GET | Artist profile data |
| `/products` | GET | Products with filtering and sorting |
| `/earnings` | GET | Earnings data with time range |
| `/fans` | GET | Fan engagement metrics |

## Environment Variables

### Web (apps/web/.env)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### API (apps/api/.env)

```
PORT=4000
```

## Design System

The UI package (`packages/ui`) contains all shared components following shadcn/ui patterns:

- Button, Card, Badge
- StatCard (KPI display)
- Tabs, Select, Input
- Tooltip, Skeleton
- Sheet (drawer), Dialog
- Toast notifications
- ChartContainer

View components in Storybook: `bun run dev --filter=@even/storybook`

## Category Colors

| Category | Color |
|----------|-------|
| Music | Purple (`hsl(270, 70%, 60%)`) |
| Video | Blue (`hsl(217, 91%, 60%)`) |
| Merch | Green (`hsl(142, 70%, 45%)`) |
| Experience | Orange (`hsl(32, 95%, 55%)`) |

## Performance Targets

- Dashboard load: <3s
- Interactions: <1s
- Filters: <500ms

## Accessibility

- WCAG 2.1 AA compliant
- Dark theme default
- Responsive: 375px - 1440px
- Keyboard navigation support

## License

Private - EVEN Platform
