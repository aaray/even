# Data Model: Reference Dashboard Sync

**Feature**: 003-reference-dashboard-sync
**Date**: 2026-02-05

## Entity Definitions

### Release

Represents a music release (album, single, or EP) with performance metrics.

```typescript
interface Release {
  id: string;
  title: string;
  type: 'Album' | 'Single' | 'EP';
  releaseDate: string;      // ISO 8601 date
  streams: number;          // Total stream count
  sales: number;            // Sales amount in cents
  coverArt: string;         // URL to cover image
  featured?: boolean;       // Optional featured flag
}
```

**Validation Rules**:
- `id`: Non-empty string, unique
- `title`: Non-empty string, max 100 characters
- `type`: Must be one of 'Album', 'Single', 'EP'
- `releaseDate`: Valid ISO 8601 date string
- `streams`: Non-negative integer
- `sales`: Non-negative integer (cents)
- `coverArt`: Valid URL string
- `featured`: Optional boolean

**Zod Schema**:
```typescript
const ReleaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  type: z.enum(['Album', 'Single', 'EP']),
  releaseDate: z.string().datetime(),
  streams: z.number().int().nonnegative(),
  sales: z.number().int().nonnegative(),
  coverArt: z.string().url(),
  featured: z.boolean().optional(),
});
```

---

### FanActivity

Represents a fan interaction event in the activity feed.

```typescript
interface FanActivity {
  id: string;
  type: 'purchase' | 'stream' | 'share' | 'follow' | 'comment';
  user: string;             // Fan display name
  avatar: string;           // URL to avatar image
  action: string;           // Human-readable action description
  timestamp: string;        // ISO 8601 datetime
}
```

**Validation Rules**:
- `id`: Non-empty string, unique
- `type`: Must be one of the defined activity types
- `user`: Non-empty string, max 50 characters
- `avatar`: Valid URL string
- `action`: Non-empty string, max 200 characters
- `timestamp`: Valid ISO 8601 datetime string

**Zod Schema**:
```typescript
const FanActivitySchema = z.object({
  id: z.string().min(1),
  type: z.enum(['purchase', 'stream', 'share', 'follow', 'comment']),
  user: z.string().min(1).max(50),
  avatar: z.string().url(),
  action: z.string().min(1).max(200),
  timestamp: z.string().datetime(),
});
```

---

### TopCountry

Represents geographic listener distribution data.

```typescript
interface TopCountry {
  country: string;          // Country name
  percentage: number;       // Percentage of total listeners (0-100)
  listeners: number;        // Absolute listener count
}
```

**Validation Rules**:
- `country`: Non-empty string, max 100 characters
- `percentage`: Number between 0 and 100
- `listeners`: Non-negative integer

**Zod Schema**:
```typescript
const TopCountrySchema = z.object({
  country: z.string().min(1).max(100),
  percentage: z.number().min(0).max(100),
  listeners: z.number().int().nonnegative(),
});
```

---

### EngagementMetrics

Extended engagement data for the detailed metrics section.

```typescript
interface EngagementMetric {
  metric: string;           // Metric display name
  value: number;            // Current value
  change: number;           // Change percentage
  trend: 'up' | 'down' | 'neutral';
  format: 'number' | 'percent' | 'time';
}

interface EngagementData {
  metrics: EngagementMetric[];
  topCountries: TopCountry[];
}
```

**Validation Rules**:
- `metric`: Non-empty string
- `value`: Non-negative number
- `change`: Number (can be negative)
- `trend`: Must be 'up', 'down', or 'neutral'
- `format`: Must be 'number', 'percent', or 'time'

**Zod Schema**:
```typescript
const EngagementMetricSchema = z.object({
  metric: z.string().min(1),
  value: z.number().nonnegative(),
  change: z.number(),
  trend: z.enum(['up', 'down', 'neutral']),
  format: z.enum(['number', 'percent', 'time']),
});

const EngagementDataSchema = z.object({
  metrics: z.array(EngagementMetricSchema),
  topCountries: z.array(TopCountrySchema),
});
```

---

### SalesData (Enhanced)

Time-series data for the analytics chart with dual metrics.

```typescript
interface SalesDataPoint {
  month: string;            // Month label (e.g., "Aug", "Sep")
  revenue: number;          // Revenue in cents
  streams: number;          // Stream count
  downloads?: number;       // Optional download count
}

interface SalesResponse {
  data: SalesDataPoint[];
  summary: {
    totalRevenue: number;
    totalStreams: number;
    revenueChange: number;  // Percentage change
    streamsChange: number;  // Percentage change
  };
}
```

---

## API Response Schemas

### ReleasesResponse

```typescript
interface ReleasesResponse {
  releases: Release[];
  total: number;
}

const ReleasesResponseSchema = z.object({
  releases: z.array(ReleaseSchema),
  total: z.number().int().nonnegative(),
});
```

### FanActivityResponse

```typescript
interface FanActivityResponse {
  activities: FanActivity[];
}

const FanActivityResponseSchema = z.object({
  activities: z.array(FanActivitySchema),
});
```

---

## State Management

### Component State

Each dashboard section manages its own local state via React Query:

| Component | Hook | State |
|-----------|------|-------|
| ReleasesSection | `useReleases()` | releases[], isLoading, isError |
| FanActivityFeed | `useFanActivity()` | activities[], isLoading, isError |
| EngagementMetrics | Enhanced `useFans()` | metrics, topCountries |
| KpiCards | `useArtist()` + derived | earnings, streams, fans, retained |

### Query Keys

```typescript
// Add to existing queryKeys object
const queryKeys = {
  // ... existing keys
  releases: (limit?: number) => ['releases', { limit }] as const,
  fanActivity: (limit?: number) => ['fanActivity', { limit }] as const,
};
```

---

## Entity Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                        Dashboard                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Artist     │    │    Fans      │    │   Releases   │ │
│  │  (existing)  │    │  (enhanced)  │    │    (new)     │ │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘ │
│         │                   │                   │          │
│         ▼                   ▼                   ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │  KPI Cards   │    │ Engagement   │    │ Release      │ │
│  │  - Revenue   │    │ - Metrics    │    │ Cards        │ │
│  │  - Streams   │    │ - Countries  │    │ - Streams    │ │
│  │  - Fans      │    │ - Activity   │    │ - Sales      │ │
│  │  - Retained  │    │   Feed       │    │ - Type       │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Data Flow:
- Artist → KPI Cards (earnings, fans)
- Fans → Engagement Metrics, Activity Feed
- Releases → Release Cards (separate from Products)
- Earnings → Sales Chart (existing)
```

---

## Mock Data Specifications

### Sample Releases

```typescript
const mockReleases: Release[] = [
  {
    id: 'rel-1',
    title: 'Midnight Sessions',
    type: 'Album',
    releaseDate: '2025-11-15T00:00:00Z',
    streams: 2450000,
    sales: 4520000,  // $45,200
    coverArt: 'https://images.unsplash.com/photo-album-1',
    featured: true,
  },
  {
    id: 'rel-2',
    title: 'Electric Dreams',
    type: 'Single',
    releaseDate: '2025-12-01T00:00:00Z',
    streams: 890000,
    sales: 1230000,  // $12,300
    coverArt: 'https://images.unsplash.com/photo-single-1',
  },
  // ... more releases
];
```

### Sample Fan Activity

```typescript
const mockFanActivity: FanActivity[] = [
  {
    id: 'act-1',
    type: 'purchase',
    user: 'Sarah M.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
    action: 'purchased "Midnight Sessions" album',
    timestamp: '2026-02-05T14:32:00Z',
  },
  {
    id: 'act-2',
    type: 'stream',
    user: 'Mike L.',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mike',
    action: 'streamed "Electric Dreams" 5 times',
    timestamp: '2026-02-05T14:28:00Z',
  },
  // ... more activities
];
```

### Sample Top Countries

```typescript
const mockTopCountries: TopCountry[] = [
  { country: 'United States', percentage: 35, listeners: 4500 },
  { country: 'United Kingdom', percentage: 18, listeners: 2300 },
  { country: 'Germany', percentage: 12, listeners: 1540 },
  { country: 'Canada', percentage: 10, listeners: 1285 },
  { country: 'Australia', percentage: 8, listeners: 1028 },
];
```
