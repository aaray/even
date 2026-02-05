# Quickstart: Reference Dashboard Sync

**Feature**: 003-reference-dashboard-sync
**Date**: 2026-02-05

## Implementation Patterns

This guide provides copy-paste patterns for implementing the Reference Dashboard Sync feature.

---

## 1. Framer Motion Setup

### Installation

```bash
cd apps/web
bun add framer-motion
```

### Staggered Animation Pattern

```tsx
// apps/web/src/components/releases-section.tsx
"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export function ReleasesSection() {
  const { data, isLoading } = useReleases();

  if (isLoading) return <ReleasesSkeleton />;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4">
        Recent Releases
      </motion.h2>
      <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.releases.map((release) => (
          <motion.div key={release.id} variants={itemVariants}>
            <ReleaseCard release={release} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
```

---

## 2. Glass-Morphism Utilities

### Add to globals.css

```css
/* packages/ui/src/globals.css */

/* Glass-morphism utilities */
.glass {
  @apply bg-card/50 backdrop-blur-xl border border-white/10;
}

.glass-card {
  @apply glass rounded-2xl;
}

.glass-subtle {
  @apply bg-card/30 backdrop-blur-md border border-white/5;
}

/* Glow effects */
.glow-primary {
  box-shadow: 0 0 40px -10px hsl(var(--primary) / 0.5);
}

.glow-warm {
  box-shadow: 0 0 40px -10px hsl(3 85% 62% / 0.5);
}

/* Gradient text */
.gradient-text {
  @apply bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent;
}
```

### Update Tailwind Config for Warm Colors

```ts
// packages/ui/tailwind.config.ts
// Add to theme.extend.colors:

primary: {
  DEFAULT: 'hsl(3 85% 62%)',      // Warm orange-red
  foreground: 'hsl(0 0% 100%)',
},
// Add warm gradient utilities
backgroundImage: {
  'gradient-warm': 'linear-gradient(135deg, hsl(3 85% 62%) 0%, hsl(30 90% 55%) 100%)',
  'gradient-cool': 'linear-gradient(135deg, hsl(200 80% 50%) 0%, hsl(280 65% 60%) 100%)',
},
```

---

## 3. Release Card Component

```tsx
// apps/web/src/components/release-card.tsx
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@even/ui";
import { formatCompactNumber, formatCurrency } from "@even/shared";
import type { Release } from "@even/shared";

const typeBadgeColors = {
  Album: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Single: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  EP: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="group relative glass-card overflow-hidden cursor-pointer">
      {/* Cover Art */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={release.coverArt}
          alt={release.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play className="h-6 w-6 text-primary-foreground ml-1" />
          </motion.button>
        </div>
        {/* Featured Badge */}
        {release.featured && (
          <Badge className="absolute top-2 left-2 bg-gradient-warm text-white border-0">
            Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold truncate">{release.title}</h3>
          <Badge className={typeBadgeColors[release.type]}>
            {release.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(release.releaseDate).toLocaleDateString()}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span>{formatCompactNumber(release.streams)} streams</span>
          <span className="text-primary font-medium">
            {formatCurrency(release.sales, "USD")}
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Fan Activity Feed Component

```tsx
// apps/web/src/components/fan-activity-feed.tsx
"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Play, Share2, UserPlus, MessageCircle } from "lucide-react";
import { Badge, Avatar, AvatarImage, AvatarFallback } from "@even/ui";
import { formatRelativeTime } from "@even/shared";
import type { FanActivity } from "@even/shared";
import { useFanActivity } from "@/hooks/use-api";

const activityIcons = {
  purchase: ShoppingCart,
  stream: Play,
  share: Share2,
  follow: UserPlus,
  comment: MessageCircle,
};

const activityColors = {
  purchase: "bg-green-500/20 text-green-300",
  stream: "bg-blue-500/20 text-blue-300",
  share: "bg-purple-500/20 text-purple-300",
  follow: "bg-orange-500/20 text-orange-300",
  comment: "bg-pink-500/20 text-pink-300",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function FanActivityFeed() {
  const { data, isLoading } = useFanActivity(6);

  if (isLoading) return <FanActivitySkeleton />;

  return (
    <div className="glass-card p-4">
      <h3 className="font-semibold mb-4">Recent Fan Activity</h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 max-h-[300px] overflow-y-auto"
      >
        {data?.activities.map((activity) => (
          <FanActivityItem key={activity.id} activity={activity} />
        ))}
      </motion.div>
    </div>
  );
}

function FanActivityItem({ activity }: { activity: FanActivity }) {
  const Icon = activityIcons[activity.type];

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={activity.avatar} alt={activity.user} />
        <AvatarFallback>{activity.user[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{activity.user}</span>{" "}
          <span className="text-muted-foreground">{activity.action}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {formatRelativeTime(activity.timestamp)}
        </p>
      </div>
      <Badge className={activityColors[activity.type]}>
        <Icon className="h-3 w-3" />
      </Badge>
    </motion.div>
  );
}
```

---

## 5. API Route Pattern

```ts
// apps/api/src/routes/releases.ts
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { mockReleases } from "../data/mock-data";

const querySchema = z.object({
  limit: z.coerce.number().int().positive().default(4),
});

export async function releasesRoutes(app: FastifyInstance) {
  app.get("/releases", async (request, reply) => {
    const { limit } = querySchema.parse(request.query);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 200));

    const releases = mockReleases.slice(0, limit);

    return {
      releases,
      total: mockReleases.length,
    };
  });
}
```

---

## 6. React Query Hook Pattern

```ts
// apps/web/src/hooks/use-api.ts (additions)

export const queryKeys = {
  // ... existing keys
  releases: (limit?: number) => ["releases", { limit }] as const,
  fanActivity: (limit?: number) => ["fanActivity", { limit }] as const,
};

export function useReleases(limit = 4) {
  return useQuery({
    queryKey: queryKeys.releases(limit),
    queryFn: () => api.get<ReleasesResponse>(`/releases?limit=${limit}`),
  });
}

export function useFanActivity(limit = 10) {
  return useQuery({
    queryKey: queryKeys.fanActivity(limit),
    queryFn: () => api.get<FanActivityResponse>(`/fan-activity?limit=${limit}`),
  });
}
```

---

## 7. E2E Test Pattern

```ts
// e2e/tests/releases.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Releases Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
  });

  test("displays release cards with cover art and metadata", async ({ page }) => {
    const releasesSection = page.getByRole("region", { name: /releases/i });
    await expect(releasesSection).toBeVisible({ timeout: 10000 });

    // Check release cards exist
    const releaseCards = page.getByTestId("release-card");
    await expect(releaseCards).toHaveCount(4);

    // First card should have content
    const firstCard = releaseCards.first();
    await expect(firstCard.getByRole("img")).toBeVisible();
    await expect(firstCard.getByText(/streams/i)).toBeVisible();
  });

  test("shows play button on hover", async ({ page }) => {
    const firstCard = page.getByTestId("release-card").first();
    await firstCard.hover();

    await expect(
      firstCard.getByRole("button", { name: /play/i })
    ).toBeVisible();
  });

  test("displays type badges for different release types", async ({ page }) => {
    // Check for at least one of each type
    await expect(page.getByText("Album").first()).toBeVisible();
  });
});
```

---

## 8. Translation Keys

```json
// apps/web/src/i18n/translations/en.json (additions)
{
  "releases": {
    "title": "Recent Releases",
    "viewAll": "View all",
    "streams": "{count} streams",
    "featured": "Featured"
  },
  "activity": {
    "title": "Recent Fan Activity",
    "purchase": "purchased",
    "stream": "streamed",
    "share": "shared",
    "follow": "started following you",
    "comment": "commented on"
  },
  "engagement": {
    "title": "Fan Engagement",
    "monthlyListeners": "Monthly Listeners",
    "avgStreamTime": "Avg. Stream Time",
    "topLocations": "Top Locations"
  },
  "header": {
    "search": "Search...",
    "notifications": "Notifications",
    "settings": "Settings"
  }
}
```

---

## 9. Skeleton Loading Pattern

```tsx
// Example skeleton for releases
function ReleasesSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card overflow-hidden">
            <Skeleton className="aspect-square" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 10. Dashboard Page Layout Update

```tsx
// apps/web/src/app/dashboard/page.tsx (updated structure)
export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <ArtistHeader />

      {/* KPI Stats */}
      <KpiCards />

      {/* Analytics + Activity Row */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <FanActivityFeed />
        </div>
      </div>

      {/* Recent Releases */}
      <ReleasesSection />

      {/* Engagement Metrics */}
      <EngagementMetrics />
    </main>
  );
}
```

---

## File Checklist

### New Files to Create
- [ ] `apps/web/src/components/release-card.tsx`
- [ ] `apps/web/src/components/releases-section.tsx`
- [ ] `apps/web/src/components/fan-activity-feed.tsx`
- [ ] `apps/web/src/components/engagement-metrics.tsx`
- [ ] `apps/api/src/routes/releases.ts`
- [ ] `apps/api/src/routes/fan-activity.ts`
- [ ] `packages/shared/src/schemas/release.ts`
- [ ] `packages/shared/src/schemas/fan-activity.ts`
- [ ] `e2e/tests/releases.spec.ts`
- [ ] `e2e/tests/fan-activity.spec.ts`
- [ ] `e2e/tests/engagement-metrics.spec.ts`

### Files to Modify
- [ ] `packages/ui/src/globals.css` - Add glass utilities
- [ ] `packages/ui/tailwind.config.ts` - Add warm colors
- [ ] `apps/web/src/hooks/use-api.ts` - Add new hooks
- [ ] `apps/web/src/app/dashboard/page.tsx` - Update layout
- [ ] `apps/web/src/components/artist-header.tsx` - Add search/notifications
- [ ] `apps/web/src/i18n/translations/*.json` - Add new strings
- [ ] `apps/api/src/data/mock-data.ts` - Add release/activity data
- [ ] `apps/api/src/index.ts` - Register new routes
- [ ] `packages/shared/src/index.ts` - Export new types
