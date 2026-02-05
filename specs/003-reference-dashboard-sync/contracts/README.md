# API Contracts: Reference Dashboard Sync

**Feature**: 003-reference-dashboard-sync
**Date**: 2026-02-05

## Overview

This document defines the API contracts for the new endpoints required by the Reference Dashboard Sync feature. All endpoints follow existing patterns established in the Even API.

## Base URL

```
Development: http://localhost:4000/api
Production: [TBD]
```

## Authentication

All endpoints require the same authentication as existing endpoints (currently: none for mock API).

---

## Endpoints

### GET /api/releases

Retrieve a list of music releases.

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 4 | Maximum number of releases to return |

**Response**:
```typescript
{
  releases: Release[];
  total: number;
}
```

**Example Request**:
```bash
GET /api/releases?limit=4
```

**Example Response**:
```json
{
  "releases": [
    {
      "id": "rel-1",
      "title": "Midnight Sessions",
      "type": "Album",
      "releaseDate": "2025-11-15T00:00:00Z",
      "streams": 2450000,
      "sales": 4520000,
      "coverArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      "featured": true
    },
    {
      "id": "rel-2",
      "title": "Electric Dreams",
      "type": "Single",
      "releaseDate": "2025-12-01T00:00:00Z",
      "streams": 890000,
      "sales": 1230000,
      "coverArt": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop"
    }
  ],
  "total": 6
}
```

**Error Responses**:
| Status | Code | Message |
|--------|------|---------|
| 400 | INVALID_LIMIT | Limit must be a positive integer |
| 500 | INTERNAL_ERROR | An unexpected error occurred |

---

### GET /api/fan-activity

Retrieve recent fan activity events.

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 10 | Maximum number of activities to return |

**Response**:
```typescript
{
  activities: FanActivity[];
}
```

**Example Request**:
```bash
GET /api/fan-activity?limit=6
```

**Example Response**:
```json
{
  "activities": [
    {
      "id": "act-1",
      "type": "purchase",
      "user": "Sarah M.",
      "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
      "action": "purchased \"Midnight Sessions\" album",
      "timestamp": "2026-02-05T14:32:00Z"
    },
    {
      "id": "act-2",
      "type": "stream",
      "user": "Mike L.",
      "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=Mike",
      "action": "streamed \"Electric Dreams\" 5 times",
      "timestamp": "2026-02-05T14:28:00Z"
    },
    {
      "id": "act-3",
      "type": "share",
      "user": "Emma W.",
      "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma",
      "action": "shared \"Neon Lights\" on social media",
      "timestamp": "2026-02-05T14:15:00Z"
    },
    {
      "id": "act-4",
      "type": "follow",
      "user": "James K.",
      "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=James",
      "action": "started following you",
      "timestamp": "2026-02-05T13:58:00Z"
    },
    {
      "id": "act-5",
      "type": "comment",
      "user": "Lisa R.",
      "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa",
      "action": "commented on \"Summer Vibes\"",
      "timestamp": "2026-02-05T13:42:00Z"
    }
  ]
}
```

**Error Responses**:
| Status | Code | Message |
|--------|------|---------|
| 400 | INVALID_LIMIT | Limit must be a positive integer |
| 500 | INTERNAL_ERROR | An unexpected error occurred |

---

### GET /api/fans (Enhanced)

The existing `/api/fans` endpoint will be enhanced to include additional engagement metrics and geographic data.

**Query Parameters** (unchanged):
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| range | TimeRange | No | 30d | Time range (7d, 30d, 90d, 1y) |

**Response** (enhanced):
```typescript
{
  data: FansDataPoint[];
  summary: {
    totalFans: number;
    newFansInPeriod: number;
    changePercent: number;
    repeatBuyers: number;
    emailSubscribers: number;
    // NEW: Extended metrics
    monthlyListeners: number;
    monthlyListenersChange: number;
    engagementRate: number;
    engagementRateChange: number;
    avgStreamTime: number;  // in minutes
    avgStreamTimeChange: number;
  };
  topLocations: TopCountry[];  // NEW: Geographic data
}
```

**Example Response** (enhanced fields shown):
```json
{
  "data": [...],
  "summary": {
    "totalFans": 12847,
    "newFansInPeriod": 1234,
    "changePercent": 12.5,
    "repeatBuyers": 4521,
    "emailSubscribers": 8932,
    "monthlyListeners": 890000,
    "monthlyListenersChange": 8.3,
    "engagementRate": 4.2,
    "engagementRateChange": -0.3,
    "avgStreamTime": 3.5,
    "avgStreamTimeChange": 0.5
  },
  "topLocations": [
    { "country": "United States", "percentage": 35, "listeners": 4500 },
    { "country": "United Kingdom", "percentage": 18, "listeners": 2300 },
    { "country": "Germany", "percentage": 12, "listeners": 1540 },
    { "country": "Canada", "percentage": 10, "listeners": 1285 },
    { "country": "Australia", "percentage": 8, "listeners": 1028 }
  ]
}
```

---

## Type Definitions

### Release

```typescript
interface Release {
  id: string;
  title: string;
  type: 'Album' | 'Single' | 'EP';
  releaseDate: string;      // ISO 8601
  streams: number;
  sales: number;            // In cents
  coverArt: string;         // URL
  featured?: boolean;
}
```

### FanActivity

```typescript
interface FanActivity {
  id: string;
  type: 'purchase' | 'stream' | 'share' | 'follow' | 'comment';
  user: string;
  avatar: string;           // URL
  action: string;
  timestamp: string;        // ISO 8601
}
```

### TopCountry

```typescript
interface TopCountry {
  country: string;
  percentage: number;       // 0-100
  listeners: number;
}
```

### TimeRange

```typescript
type TimeRange = '7d' | '30d' | '90d' | '1y';
```

---

## Error Response Format

All errors follow the existing API error format:

```typescript
interface ApiError {
  code: string;
  message: string;
  requestId?: string;
}
```

**Example**:
```json
{
  "code": "INVALID_LIMIT",
  "message": "Limit must be a positive integer",
  "requestId": "req-abc123"
}
```

---

## Zod Schemas

Located in `packages/shared/src/schemas/`:

```typescript
// release.ts
export const ReleaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  type: z.enum(['Album', 'Single', 'EP']),
  releaseDate: z.string().datetime(),
  streams: z.number().int().nonnegative(),
  sales: z.number().int().nonnegative(),
  coverArt: z.string().url(),
  featured: z.boolean().optional(),
});

export const ReleasesResponseSchema = z.object({
  releases: z.array(ReleaseSchema),
  total: z.number().int().nonnegative(),
});

// fan-activity.ts
export const FanActivitySchema = z.object({
  id: z.string().min(1),
  type: z.enum(['purchase', 'stream', 'share', 'follow', 'comment']),
  user: z.string().min(1).max(50),
  avatar: z.string().url(),
  action: z.string().min(1).max(200),
  timestamp: z.string().datetime(),
});

export const FanActivityResponseSchema = z.object({
  activities: z.array(FanActivitySchema),
});

// top-country.ts
export const TopCountrySchema = z.object({
  country: z.string().min(1).max(100),
  percentage: z.number().min(0).max(100),
  listeners: z.number().int().nonnegative(),
});
```

---

## React Query Hooks

Located in `apps/web/src/hooks/use-api.ts`:

```typescript
// New hooks
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

// Update queryKeys
const queryKeys = {
  // ... existing
  releases: (limit?: number) => ['releases', { limit }] as const,
  fanActivity: (limit?: number) => ['fanActivity', { limit }] as const,
};
```
