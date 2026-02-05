# Quickstart: EVEN Artist Dashboard

**Feature**: 001-artist-dashboard
**Date**: 2026-02-05

## Overview

EVEN is a direct-to-fan platform that lets music artists sell Music, Videos, Merch, and Experiences directly to fans while retaining more revenue. This dashboard demonstrates the artist-facing analytics experience.

## Prerequisites

- **Bun** >= 1.0 (https://bun.sh)
- **Node.js** >= 18 (for Playwright)
- Modern browser (Chrome, Firefox, Safari, Edge)

## Installation

```bash
# Clone and enter the repository
cd even

# Install all dependencies (uses Bun workspaces)
bun install
```

## Development

### Start all services (recommended)

```bash
# Start API (port 4000) and Web (port 3000) in parallel
bun run dev
```

### Start individual services

```bash
# API only
bun run --filter=@even/api dev

# Web only (requires API running)
bun run --filter=@even/web dev

# Storybook
bun run storybook
```

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Dashboard | http://localhost:3000 | EVEN Artist Dashboard |
| API | http://localhost:4000 | Mock API server |
| Health | http://localhost:4000/health | API health check |
| Storybook | http://localhost:6006 | Component documentation |

## Available Scripts

### Root level (Turborepo)

```bash
bun run dev          # Start all dev servers
bun run build        # Build all packages
bun run typecheck    # TypeScript checks
bun run lint         # Biome lint
bun run format       # Biome format
bun run test:e2e     # Run Playwright tests
bun run storybook    # Start Storybook
bun run storybook:build  # Build Storybook
```

### Per-package scripts

```bash
# API
bun run --filter=@even/api dev
bun run --filter=@even/api build

# Web
bun run --filter=@even/web dev
bun run --filter=@even/web build

# UI package
bun run --filter=@even/ui build

# Shared package
bun run --filter=@even/shared build
```

## Testing

### E2E Tests (Playwright)

```bash
# Run all E2E tests (starts servers automatically)
bun run test:e2e

# Run with UI mode
bun run test:e2e --ui

# Run specific test file
bun run test:e2e tests/dashboard.spec.ts
```

### Manual Testing Checklist

1. **Dashboard Load**
   - [ ] Navigate to http://localhost:3000
   - [ ] Verify redirect to /dashboard
   - [ ] See artist name and avatar
   - [ ] See 4 KPI cards (earnings, revenue retained %, fans, engagement)

2. **Earnings Analytics**
   - [ ] See earnings chart with category breakdown
   - [ ] Click 7d/30d/90d/1y buttons
   - [ ] Verify chart updates with category-colored areas
   - [ ] Hover to see tooltips with breakdown
   - [ ] Toggle legend items (Music, Videos, Merch, Experiences)
   - [ ] See revenue retained percentage prominently displayed

3. **Products**
   - [ ] See grid of product cards (Music, Videos, Merch, Experiences)
   - [ ] Filter by category: Music/Videos/Merch/Experiences/All
   - [ ] Sort by Newest/Best Selling
   - [ ] Click a card to open product drawer
   - [ ] See category badge on each card
   - [ ] Close drawer with X or click outside

4. **Fan Engagement**
   - [ ] See fan KPI cards (total fans, new fans, repeat buyers, subscribers)
   - [ ] See fan growth trend chart
   - [ ] See top locations list
   - [ ] Click "Send Update" button
   - [ ] Fill form and submit
   - [ ] See success toast

5. **Responsiveness**
   - [ ] Resize browser to mobile width (375px)
   - [ ] Verify layout adapts
   - [ ] Resize to desktop (1440px)
   - [ ] Verify layout adapts

6. **Keyboard Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Verify focus is visible
   - [ ] Press Enter/Space on buttons
   - [ ] Escape to close dialogs/drawers

## Environment Variables

### apps/web/.env.example

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### apps/api/.env.example

```env
PORT=4000
```

## Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Dependency issues

```bash
# Clear Bun cache and reinstall
rm -rf node_modules
rm bun.lockb
bun install
```

### TypeScript errors

```bash
# Rebuild all packages
bun run build

# Then run typecheck
bun run typecheck
```

### Storybook not loading components

```bash
# Ensure UI package is built first
bun run --filter=@even/ui build
bun run storybook
```

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js dashboard
│   ├── api/          # Fastify mock API
│   └── storybook/    # Component docs
├── packages/
│   ├── ui/           # Design system
│   └── shared/       # Types & schemas
└── e2e/              # Playwright tests
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /artist | Artist profile + KPIs |
| GET | /products | Filterable products (Music, Videos, Merch, Experiences) |
| GET | /earnings | Earnings with category breakdown |
| GET | /fans | Fan metrics + locations |

### Query Parameters

**GET /products**
- `limit` (default: 12) - Max products to return
- `category` (default: all) - music, video, merch, experience, all
- `sort` (default: newest) - newest, bestselling

**GET /earnings**
- `range` (required) - 7d, 30d, 90d, 1y

**GET /fans**
- `range` (required) - 7d, 30d, 90d, 1y

See [contracts/openapi.yaml](./contracts/openapi.yaml) for full API documentation.

## Mock Data

The API uses deterministic seeded data for consistent testing:

- **Artist**: "Luna Rivers" - indie artist with diverse catalog
- **Products**: 12 items across all 4 categories
- **Earnings**: Time series with realistic daily variations
- **Fans**: Geographic distribution across major cities
- **Revenue Split**: 85% to artist, 15% platform fee (EVEN value prop)
