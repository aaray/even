# Data Model: EVEN Artist Dashboard

**Feature**: 001-artist-dashboard
**Date**: 2026-02-05
**Updated**: 2026-02-05

## Overview

All data is mock/seeded for demonstration purposes. No persistent storage. Schemas defined with Zod in `packages/shared` and shared between API and frontend.

This data model reflects EVEN's direct-to-fan platform where artists sell Music, Videos, Merch, and Experiences directly to fans while retaining more revenue.

## Entities

### Artist

Represents the EVEN artist whose dashboard is being viewed.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | string | Unique identifier | UUID format |
| name | string | Display name | 1-100 chars |
| avatarUrl | string | Profile image URL | Valid URL |
| bio | string | Short biography | 0-500 chars |
| totalEarnings | number | Lifetime earnings (cents) | >= 0 |
| revenueRetainedPercent | number | % of revenue kept by artist | 0-100 |
| totalFans | number | Current fan count | >= 0 |
| engagementRate | number | Overall engagement % | 0-100 |

**Zod Schema**:
```typescript
export const ArtistSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  avatarUrl: z.string().url(),
  bio: z.string().max(500),
  totalEarnings: z.number().int().nonnegative(),
  revenueRetainedPercent: z.number().min(0).max(100),
  totalFans: z.number().int().nonnegative(),
  engagementRate: z.number().min(0).max(100),
});
```

---

### Product

A product listed for sale on EVEN (Music, Video, Merch, or Experience).

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | string | Unique identifier | UUID format |
| title | string | Product title | 1-200 chars |
| category | enum | Product category | music, video, merch, experience |
| imageUrl | string | Product image/artwork URL | Valid URL |
| listingDate | string | When listed on EVEN | ISO 8601 date |
| price | number | Price in cents | >= 0 |
| totalEarnings | number | Artist earnings (cents) | >= 0 |
| unitsSold | number | Units sold | >= 0 |

**Category-specific fields** (included when applicable):

| Field | Type | Applies To | Description |
|-------|------|------------|-------------|
| releaseType | enum | music | single, ep, album |
| trackCount | number | music | Number of tracks |
| streams | number | music | Total streams |
| duration | number | video | Length in seconds |
| viewCount | number | video | Total views |
| variant | string | merch | Size/color variant |
| inventory | number | merch | Remaining stock |
| eventDate | string | experience | Event date |
| capacity | number | experience | Max attendees |
| attendees | number | experience | Current signups |

**Zod Schema**:
```typescript
export const ProductCategorySchema = z.enum(['music', 'video', 'merch', 'experience']);

export const BaseProductSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  category: ProductCategorySchema,
  imageUrl: z.string().url(),
  listingDate: z.string().datetime(),
  price: z.number().int().nonnegative(),
  totalEarnings: z.number().int().nonnegative(),
  unitsSold: z.number().int().nonnegative(),
});

export const MusicProductSchema = BaseProductSchema.extend({
  category: z.literal('music'),
  releaseType: z.enum(['single', 'ep', 'album']),
  trackCount: z.number().int().positive(),
  streams: z.number().int().nonnegative(),
});

export const VideoProductSchema = BaseProductSchema.extend({
  category: z.literal('video'),
  duration: z.number().int().positive(),
  viewCount: z.number().int().nonnegative(),
});

export const MerchProductSchema = BaseProductSchema.extend({
  category: z.literal('merch'),
  variant: z.string().optional(),
  inventory: z.number().int().nonnegative(),
});

export const ExperienceProductSchema = BaseProductSchema.extend({
  category: z.literal('experience'),
  eventDate: z.string().datetime(),
  capacity: z.number().int().positive(),
  attendees: z.number().int().nonnegative(),
});

export const ProductSchema = z.discriminatedUnion('category', [
  MusicProductSchema,
  VideoProductSchema,
  MerchProductSchema,
  ExperienceProductSchema,
]);
```

---

### EarningsDataPoint

A single point in earnings time series.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| date | string | Data point date | ISO 8601 date |
| grossRevenue | number | Total revenue (cents) | >= 0 |
| artistCut | number | Artist earnings (cents) | >= 0 |
| platformFee | number | EVEN platform fee (cents) | >= 0 |
| byCategory | object | Breakdown by category | See below |

**Category Breakdown**:
| Field | Type | Description |
|-------|------|-------------|
| music | number | Music earnings (cents) |
| video | number | Video earnings (cents) |
| merch | number | Merch earnings (cents) |
| experience | number | Experience earnings (cents) |

**Zod Schema**:
```typescript
export const CategoryBreakdownSchema = z.object({
  music: z.number().int().nonnegative(),
  video: z.number().int().nonnegative(),
  merch: z.number().int().nonnegative(),
  experience: z.number().int().nonnegative(),
});

export const EarningsDataPointSchema = z.object({
  date: z.string().datetime(),
  grossRevenue: z.number().int().nonnegative(),
  artistCut: z.number().int().nonnegative(),
  platformFee: z.number().int().nonnegative(),
  byCategory: CategoryBreakdownSchema,
});
```

---

### EarningsResponse

API response for earnings endpoint.

| Field | Type | Description |
|-------|------|-------------|
| range | string | Requested range (7d, 30d, 90d, 1y) |
| data | EarningsDataPoint[] | Time series data |
| summary | object | Aggregated metrics |

**Summary fields**:
| Field | Type | Description |
|-------|------|-------------|
| totalGross | number | Total gross revenue |
| totalArtistCut | number | Total artist earnings |
| totalPlatformFee | number | Total platform fees |
| revenueRetainedPercent | number | Artist cut as % of gross |
| averageDaily | number | Average daily earnings |
| changePercent | number | % change vs previous period |
| byCategory | object | Totals per category |

**Zod Schema**:
```typescript
export const TimeRangeSchema = z.enum(['7d', '30d', '90d', '1y']);

export const EarningsSummarySchema = z.object({
  totalGross: z.number().int().nonnegative(),
  totalArtistCut: z.number().int().nonnegative(),
  totalPlatformFee: z.number().int().nonnegative(),
  revenueRetainedPercent: z.number().min(0).max(100),
  averageDaily: z.number().nonnegative(),
  changePercent: z.number(),
  byCategory: CategoryBreakdownSchema,
});

export const EarningsResponseSchema = z.object({
  range: TimeRangeSchema,
  data: z.array(EarningsDataPointSchema),
  summary: EarningsSummarySchema,
});
```

---

### FanDataPoint

A single point in fan growth time series.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| date | string | Data point date | ISO 8601 date |
| totalFans | number | Cumulative fan count | >= 0 |
| newFans | number | New fans that day | >= 0 |
| repeatBuyers | number | Fans with 2+ purchases | >= 0 |

**Zod Schema**:
```typescript
export const FanDataPointSchema = z.object({
  date: z.string().datetime(),
  totalFans: z.number().int().nonnegative(),
  newFans: z.number().int().nonnegative(),
  repeatBuyers: z.number().int().nonnegative(),
});
```

---

### FanLocation

Geographic distribution of fans.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| location | string | City or country | 1-100 chars |
| fanCount | number | Fan count | >= 0 |
| percentage | number | % of total | 0-100 |

**Zod Schema**:
```typescript
export const FanLocationSchema = z.object({
  location: z.string().min(1).max(100),
  fanCount: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});
```

---

### FansResponse

API response for fans/engagement endpoint.

| Field | Type | Description |
|-------|------|-------------|
| range | string | Requested range |
| data | FanDataPoint[] | Time series data |
| summary | object | Aggregated metrics |
| topLocations | FanLocation[] | Top 5 fan locations |

**Summary fields**:
| Field | Type | Description |
|-------|------|-------------|
| totalFans | number | Current total fans |
| newFansInPeriod | number | New fans in range |
| repeatBuyers | number | Fans with 2+ purchases |
| emailSubscribers | number | Newsletter subscribers |
| changePercent | number | % change vs previous period |

**Zod Schema**:
```typescript
export const FansSummarySchema = z.object({
  totalFans: z.number().int().nonnegative(),
  newFansInPeriod: z.number().int().nonnegative(),
  repeatBuyers: z.number().int().nonnegative(),
  emailSubscribers: z.number().int().nonnegative(),
  changePercent: z.number(),
});

export const FansResponseSchema = z.object({
  range: TimeRangeSchema,
  data: z.array(FanDataPointSchema),
  summary: FansSummarySchema,
  topLocations: z.array(FanLocationSchema).max(5),
});
```

---

### ApiError

Standardized error response.

| Field | Type | Description |
|-------|------|-------------|
| error | string | Error type |
| message | string | Human-readable message |
| requestId | string | Request correlation ID |
| statusCode | number | HTTP status code |

**Zod Schema**:
```typescript
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  requestId: z.string().uuid(),
  statusCode: z.number().int().min(400).max(599),
});
```

---

## Relationships

```text
Artist (1) ──────────── (*) Product
   │                        │
   │                        ├── MusicProduct
   │                        ├── VideoProduct
   │                        ├── MerchProduct
   │                        └── ExperienceProduct
   │
   └── Has KPIs derived from:
       ├── Earnings (time series with category breakdown)
       └── Fans (time series + locations)
```

- Artist has many Products across categories
- Earnings data aggregates revenue from all products with category breakdown
- Fan data tracks direct-to-fan relationships
- All relationships are read-only (no mutations except mock "send update")

---

## State Transitions

### Product Detail Drawer

```text
[Closed] ──(click product)──> [Open]
[Open] ──(click outside/close)──> [Closed]
```

### Send Update Dialog

```text
[Closed] ──(click "Send Update")──> [Open: Empty Form]
[Open: Empty Form] ──(fill fields)──> [Open: Valid Form]
[Open: Valid Form] ──(submit)──> [Open: Submitting]
[Open: Submitting] ──(success)──> [Closed] + Toast
[Open: Submitting] ──(error)──> [Open: Error State]
```

### Data Loading States

```text
[Initial] ──(mount)──> [Loading]
[Loading] ──(success)──> [Success: Data]
[Loading] ──(error)──> [Error]
[Error] ──(retry)──> [Loading]
[Success: Data] ──(refetch)──> [Success: Refetching]
```

### Category Filter State

```text
[All] ──(select Music)──> [Music]
[Music] ──(select Video)──> [Video]
[Video] ──(select Merch)──> [Merch]
[Merch] ──(select Experience)──> [Experience]
[Any] ──(select All)──> [All]
```
