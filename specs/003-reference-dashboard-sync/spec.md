# Feature Specification: Reference Dashboard Sync

**Feature Branch**: `003-reference-dashboard-sync`
**Created**: 2026-02-05
**Status**: Draft
**Input**: User description: "Scan the reference folder and incorporate all its functionality, look and feel and features"

## Overview

This feature synchronizes the existing EVEN Artist Dashboard with the reference implementation, ensuring feature parity in functionality, visual design, and user experience. The reference application showcases a modern music artist dashboard with analytics, release management, fan engagement tracking, and a polished dark-themed glass-morphism design system.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View KPI Stats Overview (Priority: P1)

As an artist, I want to see my key performance indicators (total revenue, total streams, number of releases, and follower count) displayed prominently at the top of my dashboard so I can quickly assess my overall performance at a glance.

**Why this priority**: KPI overview is the core value proposition of any analytics dashboard - artists need immediate visibility into their most important metrics. This is the foundational element that all other features build upon.

**Independent Test**: Can be fully tested by loading the dashboard and verifying that 4 KPI cards display with values, trend indicators, and change percentages. Delivers immediate value by showing artists their key metrics.

**Acceptance Scenarios**:

1. **Given** an artist loads the dashboard, **When** the page renders, **Then** they see 4 KPI cards showing Total Revenue, Total Streams, Releases count, and Followers count with current values and percentage change indicators.
2. **Given** a KPI metric has increased, **When** the card displays, **Then** the trend indicator shows an upward arrow with a positive color (green).
3. **Given** a KPI metric has decreased, **When** the card displays, **Then** the trend indicator shows a downward arrow with a negative color (red).
4. **Given** the dashboard loads, **When** KPI cards appear, **Then** they animate in with a staggered fade/slide effect.

---

### User Story 2 - View Sales Analytics Chart (Priority: P1)

As an artist, I want to see a visual chart of my revenue and streams over time so I can identify trends and understand my performance trajectory.

**Why this priority**: Data visualization is essential for artists to understand patterns in their earnings and streaming performance. Combined with US1, this forms the core analytics experience.

**Independent Test**: Can be fully tested by loading the dashboard, verifying the area chart renders with revenue and streams data for the past 6 months, and confirming interactive tooltips display detailed information on hover.

**Acceptance Scenarios**:

1. **Given** an artist views the dashboard, **When** the analytics section loads, **Then** an area chart displays with two data series: Revenue (warm color gradient) and Streams (cool color gradient).
2. **Given** the chart is displayed, **When** the artist hovers over a data point, **Then** a tooltip shows the month, revenue amount, and stream count for that period.
3. **Given** the chart renders, **When** viewing the axes, **Then** the X-axis shows month labels and the Y-axis shows formatted values with appropriate units.

---

### User Story 3 - View Recent Releases (Priority: P2)

As an artist, I want to see my recent music releases displayed as visually appealing cards so I can track the performance of my individual releases.

**Why this priority**: Release tracking is important for artists to understand which content performs best, but requires the foundational dashboard structure from P1 stories first.

**Independent Test**: Can be fully tested by loading the dashboard and verifying release cards display with cover art, title, release date, stream count, sales figures, and release type badges.

**Acceptance Scenarios**:

1. **Given** an artist has releases, **When** the releases section loads, **Then** a grid of release cards displays showing cover art, title, release date, streams, and sales.
2. **Given** a release card is displayed, **When** the artist hovers over it, **Then** the cover art zooms slightly and a play button overlay appears.
3. **Given** releases have different types, **When** cards display, **Then** each card shows a color-coded badge indicating Album (purple), Single (blue), or EP (orange).
4. **Given** a release is marked as featured, **When** its card displays, **Then** a "Featured" badge appears on the card.

---

### User Story 4 - View Fan Activity Feed (Priority: P2)

As an artist, I want to see a real-time feed of fan activities (purchases, streams, shares, follows, comments) so I can stay connected with my audience's engagement.

**Why this priority**: Fan engagement tracking helps artists understand their audience, but is secondary to core analytics (P1 stories).

**Independent Test**: Can be fully tested by loading the dashboard and verifying the activity feed shows recent fan activities with user avatars, activity descriptions, type-specific icons, and relative timestamps.

**Acceptance Scenarios**:

1. **Given** fans have interacted with the artist's content, **When** the activity feed loads, **Then** a scrollable list displays recent activities with user avatar, action description, and timestamp.
2. **Given** different activity types exist, **When** activities display, **Then** each activity shows a type-specific icon (cart for purchase, play for stream, share icon for shares, etc.).
3. **Given** activities have different types, **When** they display, **Then** each activity has a color-coded badge matching its type.

---

### User Story 5 - View Fan Engagement Metrics (Priority: P2)

As an artist, I want to see detailed engagement metrics (followers, monthly listeners, engagement rate, average stream time) and geographic distribution of my listeners so I can understand my audience better.

**Why this priority**: Detailed engagement analytics provide deeper insights but build upon the foundation of basic KPIs (P1).

**Independent Test**: Can be fully tested by viewing the engagement section and verifying metrics display with values, trend indicators, and a geographic breakdown showing top countries with listener percentages.

**Acceptance Scenarios**:

1. **Given** an artist views the engagement section, **When** it loads, **Then** 4 engagement metric cards display showing Total Followers, Monthly Listeners, Engagement Rate, and Average Stream Time.
2. **Given** engagement metrics are displayed, **When** viewing each metric, **Then** the trend indicator shows whether the metric is up, down, or neutral compared to the previous period.
3. **Given** listener geographic data exists, **When** the engagement section loads, **Then** a "Top Locations" section shows countries with progress bars representing listener percentages.

---

### User Story 6 - Dashboard Header with Search and Profile (Priority: P3)

As an artist, I want a header with a personalized greeting, search functionality, notifications, settings, and my profile avatar so I can navigate and access account features easily.

**Why this priority**: Header functionality enhances navigation but is not critical for core analytics viewing.

**Independent Test**: Can be fully tested by verifying the header displays with greeting text, search input, notification bell with indicator, settings button, and user avatar.

**Acceptance Scenarios**:

1. **Given** an artist is logged in, **When** the dashboard loads, **Then** the header displays a personalized greeting (e.g., "Welcome back, [Name]").
2. **Given** the header is visible, **When** viewing header elements, **Then** a search input with search icon is present and functional.
3. **Given** the header is visible, **When** viewing the right side, **Then** a notification bell button with active indicator, settings button, and user avatar are displayed.

---

### User Story 7 - Dark Theme Glass-Morphism Design (Priority: P3)

As an artist, I want the dashboard to have a modern dark theme with glass-morphism effects, warm accent colors, and smooth animations so the interface feels premium and professional.

**Why this priority**: Visual polish enhances user experience but functional features must work first.

**Independent Test**: Can be fully tested by verifying the dark background, glass-effect cards with backdrop blur, warm orange-red accent colors, and smooth fade/slide animations on component entry.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** viewing the overall theme, **Then** the background is near-black with card components having semi-transparent backgrounds and backdrop blur (glass-morphism).
2. **Given** interactive elements exist, **When** viewing buttons and accents, **Then** they use a warm orange-red primary color with gradients.
3. **Given** components are loading, **When** they enter the viewport, **Then** they animate with smooth fade-in and slide effects with staggered timing for lists.

---

### Edge Cases

- What happens when no releases exist? Display an empty state with helpful message.
- What happens when no fan activity exists? Display an empty state in the activity feed.
- What happens when analytics data is loading? Display skeleton loading states for all sections.
- What happens when data fails to load? Display an error state with retry option.
- How does the dashboard handle very large numbers? Format with K (thousands), M (millions), B (billions) abbreviations.
- What happens on mobile devices? Dashboard should be responsive, stacking elements vertically on smaller screens.

## Requirements *(mandatory)*

### Functional Requirements

#### KPI & Analytics
- **FR-001**: System MUST display 4 KPI cards: Total Revenue, Total Streams, Releases Count, and Followers Count
- **FR-002**: System MUST show percentage change and trend direction (up/down) for each KPI
- **FR-003**: System MUST display an area chart showing revenue and streams data over time (minimum 6 months)
- **FR-004**: System MUST provide interactive tooltips on chart hover showing detailed values
- **FR-005**: System MUST format large numbers with appropriate abbreviations (K, M, B)
- **FR-006**: System MUST format currency values with appropriate symbols and decimal places

#### Releases
- **FR-007**: System MUST display release cards in a responsive grid layout
- **FR-008**: System MUST show release cover art, title, release date, stream count, and sales for each release
- **FR-009**: System MUST display color-coded type badges (Album, Single, EP) on release cards
- **FR-010**: System MUST support featured release badges
- **FR-011**: System MUST provide hover effects on release cards (zoom, play button overlay)

#### Fan Engagement
- **FR-012**: System MUST display a scrollable fan activity feed with recent activities
- **FR-013**: System MUST show activity type, user avatar, description, and relative timestamp for each activity
- **FR-014**: System MUST display fan engagement metrics (Followers, Monthly Listeners, Engagement Rate, Avg Stream Time)
- **FR-015**: System MUST display geographic listener distribution with top countries and percentages
- **FR-016**: System MUST show progress bars for geographic data visualization

#### Header & Navigation
- **FR-017**: System MUST display a personalized greeting with the artist's name
- **FR-018**: System MUST provide a search input in the header
- **FR-019**: System MUST display notification bell with active indicator
- **FR-020**: System MUST display user avatar with fallback for missing images

#### Design & UX
- **FR-021**: System MUST implement dark theme with glass-morphism card effects
- **FR-022**: System MUST use warm orange-red as primary accent color
- **FR-023**: System MUST animate component entry with fade/slide effects
- **FR-024**: System MUST implement staggered animations for list/grid items
- **FR-025**: System MUST be fully responsive from mobile to desktop viewports
- **FR-026**: System MUST display skeleton loading states during data fetching
- **FR-027**: System MUST display error states with retry functionality when data fails to load

### Key Entities

- **Release**: Represents a music release with id, title, type (Album/Single/EP), releaseDate, streams, sales, coverArt, and optional featured flag
- **SalesData**: Time-series data with month, revenue, streams, and downloads
- **FanEngagement**: Metric entry with metric name, value, change percentage, and trend direction
- **FanActivity**: Activity entry with id, type (purchase/stream/share/follow/comment), user info, avatar, action description, and timestamp
- **TopCountry**: Geographic data with country name, percentage, and listener count
- **Artist**: User profile with id, name, avatar, and display preferences

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Dashboard loads and displays all sections within 3 seconds on standard broadband connection
- **SC-002**: All KPI values are visible above the fold on desktop viewports (1024px+)
- **SC-003**: Charts render with interactive tooltips responding within 100ms of hover
- **SC-004**: Animations complete within 500ms of component mount
- **SC-005**: Dashboard is fully usable on mobile devices (320px minimum width)
- **SC-006**: All text remains readable with sufficient contrast ratios (WCAG AA compliance)
- **SC-007**: Users can identify metric trends (up/down) within 2 seconds of viewing each KPI card
- **SC-008**: 95% of users can locate and understand their total revenue within 10 seconds of dashboard load
- **SC-009**: Release cards display all key information (title, streams, type) without truncation on desktop
- **SC-010**: Activity feed updates visually distinguish different activity types through color and iconography

## Assumptions

- The existing dashboard infrastructure (Next.js app, API routes, data fetching patterns) will be reused
- Mock data patterns from the reference will be adapted to match existing data structures
- The existing shadcn/ui component library will be extended as needed
- Framer Motion will be added for animations (currently not in the project)
- The existing color scheme may need adjustment to match the reference warm accent theme
- The current i18n implementation will be maintained and extended for new UI strings
