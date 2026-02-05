# Research: Reference Dashboard Sync

**Feature**: 003-reference-dashboard-sync
**Date**: 2026-02-05

## Decision Log

### 1. Animation Library Selection

**Decision**: Use Framer Motion for entrance animations

**Rationale**:
- Industry standard for React animations
- Built-in stagger support via `staggerChildren` and `delayChildren`
- Compatible with React 19 and Next.js 15
- Reference implementation uses Framer Motion
- Declarative API integrates well with React component patterns

**Alternatives Considered**:
- **Tailwind CSS animations only**: Insufficient for staggered delays and complex choreography
- **react-spring**: More complex API, less common in Next.js projects
- **CSS @keyframes + JS**: More boilerplate, harder to maintain stagger timing
- **Auto-animate**: Simpler but less control over timing

**Implementation Pattern**:
```tsx
// Stagger container
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      <Card />
    </motion.div>
  ))}
</motion.div>

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

---

### 2. Glass-Morphism Implementation

**Decision**: Use Tailwind CSS utilities with custom glass classes

**Rationale**:
- Consistent with existing Tailwind-first approach
- No additional dependencies required
- Can be applied via `cn()` utility for composition
- Reference uses similar pattern with custom utilities

**Implementation Pattern**:
```css
/* packages/ui/src/globals.css */
.glass {
  @apply bg-card/50 backdrop-blur-xl border border-white/10;
}

.glass-card {
  @apply glass rounded-2xl;
}
```

**Color Variables** (add to Tailwind config):
```ts
// Warm orange-red accent (from reference)
primary: {
  DEFAULT: 'hsl(3 85% 62%)',    // Warm orange-red
  foreground: 'hsl(0 0% 100%)', // White text
}
```

---

### 3. KPI Card Metrics Alignment

**Decision**: Map existing metrics to reference metrics with additions

**Current Metrics**:
1. Total Earnings
2. Revenue Retained %
3. Total Fans
4. Engagement Rate

**Reference Metrics**:
1. Total Revenue
2. Total Streams
3. Releases Count
4. Followers Count

**Mapping Strategy**:
| Current | Action | New Metric |
|---------|--------|------------|
| Total Earnings | Keep (rename) | Total Revenue |
| Revenue Retained % | Keep | Revenue Retained % |
| Total Fans | Keep | Total Fans |
| Engagement Rate | Replace | Total Streams |

**Rationale**: Keep existing valuable metrics while adding streams to match reference. The reference's "Releases" count can be derived from products API.

---

### 4. Release Cards vs Product Cards

**Decision**: Create dedicated ReleaseCard component for music releases section

**Rationale**:
- Reference separates "releases" (music content) from general products
- Current ProductCard handles all product types
- ReleaseCard needs specific features: play button overlay, type badges (Album/Single/EP)
- Maintains single responsibility principle

**Component Differences**:
| Feature | ProductCard | ReleaseCard |
|---------|-------------|-------------|
| Image | Product image | Cover art with hover zoom |
| Hover | Scale effect | Play button overlay |
| Badges | Category badge | Type badge (Album/Single/EP) + Featured |
| Metrics | Price, views | Streams, sales |
| Click action | Open drawer | Play/details action |

---

### 5. Fan Activity Feed Data Structure

**Decision**: Create new API endpoint with mock activity data

**Rationale**:
- No existing fan activity API
- Reference shows real-time feed with multiple activity types
- Needs separate endpoint for scalability

**Activity Types**:
- `purchase` - Fan bought a product
- `stream` - Fan streamed music
- `share` - Fan shared content
- `follow` - New follower
- `comment` - Fan commented

**API Response Shape**:
```typescript
interface FanActivity {
  id: string;
  type: 'purchase' | 'stream' | 'share' | 'follow' | 'comment';
  user: string;
  avatar: string;
  action: string;  // Human-readable description
  timestamp: string;  // ISO 8601
}
```

---

### 6. Engagement Metrics Enhancement

**Decision**: Extend fans-section with detailed engagement metrics and geographic data

**Rationale**:
- Reference has separate EngagementMetrics component
- Current fans-section has basic metrics
- Geographic data (top countries) is valuable for artists

**New Metrics to Add**:
1. Monthly Listeners (with trend)
2. Average Stream Time (with trend)
3. Top Locations (country + percentage + progress bar)

**Integration Approach**: Enhance existing `fans-section.tsx` rather than create new component to maintain simplicity.

---

### 7. Header Enhancement Strategy

**Decision**: Enhance existing artist-header with search, notifications, settings

**Rationale**:
- Reference has DashboardHeader with search + profile
- Current artist-header has profile info + language selector
- Combining maintains single header component

**New Elements**:
1. Search input (left side, with icon)
2. Notification bell (with active indicator badge)
3. Settings button
4. Keep existing: Avatar, language selector

**Layout**: `flex justify-between` with left (greeting + search) and right (notifications + settings + avatar + language)

---

### 8. Color Scheme Transition

**Decision**: Update primary color from blue to warm orange-red, keep existing category colors

**Current Colors**:
- Primary: Blue (`hsl(217, 91%, 60%)`)
- Categories: Purple/Blue/Green/Orange

**New Colors** (from reference):
- Primary: Warm orange-red (`hsl(3, 85%, 62%)`)
- Gradients: Warm gradient for primary CTA
- Keep category colors (they match reference)

**Migration Strategy**:
1. Add new primary color variable
2. Update button/accent components
3. Add gradient utility classes
4. Preserve category colors (already aligned)

---

### 9. API Endpoint Design

**Decision**: Add two new endpoints following existing patterns

**New Endpoints**:

```
GET /api/releases
Query: ?limit=4
Response: { releases: Release[], total: number }

GET /api/fan-activity
Query: ?limit=10
Response: { activities: FanActivity[] }
```

**Rationale**:
- Follows existing API patterns (query params, response shape)
- Separate from existing /api/products (different data structure)
- Mock data generation consistent with existing approach

---

### 10. E2E Testing Strategy

**Decision**: Create feature-specific test files following TDD

**Test Files**:
1. `releases.spec.ts` - Release cards display, hover effects, badges
2. `fan-activity.spec.ts` - Activity feed, icons, timestamps
3. `engagement-metrics.spec.ts` - Metrics display, geographic data
4. `animations.spec.ts` - Entrance animations, stagger timing

**Pattern** (from existing tests):
```typescript
test.describe("Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
  });

  test("description", async ({ page }) => {
    await expect(page.getByTestId("element")).toBeVisible();
  });
});
```

---

## Technology Decisions Summary

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Animation library | Framer Motion | Stagger support, React 19 compatible |
| Glass-morphism | Tailwind utilities | Consistent with existing stack |
| KPI alignment | Keep existing + add streams | Preserve value, match reference |
| Release cards | New component | Different functionality than ProductCard |
| Fan activity | New API endpoint | No existing data source |
| Engagement metrics | Enhance fans-section | Simpler than new component |
| Header | Enhance artist-header | Single header component |
| Colors | Warm orange-red primary | Match reference aesthetic |
| New APIs | /releases, /fan-activity | Follows existing patterns |
| Testing | TDD with Playwright | Constitution requirement |
