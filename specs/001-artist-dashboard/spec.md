# Feature Specification: EVEN Artist Dashboard

**Feature Branch**: `001-artist-dashboard`
**Created**: 2026-02-05
**Status**: Draft
**Input**: Production-quality take-home assignment for EVEN (get.even.biz) - a direct-to-fan platform that lets music artists sell music, videos, merch, and experiences directly to fans while retaining more revenue.

## Product Context

EVEN empowers music artists to build direct relationships with their fans by selling:
- **Music**: Singles, EPs, Albums (digital downloads and streaming)
- **Videos**: Music videos, behind-the-scenes, exclusive content
- **Merch**: Physical merchandise (apparel, vinyl, posters)
- **Experiences**: Meet & greets, virtual events, exclusive access

**Key Value Proposition**: Artists retain significantly more revenue compared to traditional platforms by selling direct-to-fan, cutting out intermediaries.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Artist Overview (Priority: P1)

As an EVEN artist, I want to see my profile summary and key performance indicators at a glance so I can quickly understand how my direct-to-fan business is performing.

**Why this priority**: This is the landing experience and provides immediate value. Artists need to see their earnings, fan base, and engagement metrics to understand the health of their EVEN storefront.

**Independent Test**: Can be fully tested by loading the dashboard and verifying the artist header displays with name, avatar, and four KPI summary cards (total earnings, revenue retained, fan count, engagement rate).

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** the page loads, **Then** I see my artist name and profile avatar prominently displayed
2. **Given** I am on the dashboard, **When** the page loads, **Then** I see KPI cards showing total earnings, revenue retained percentage, total fans, and engagement rate
3. **Given** the data is loading, **When** I view the dashboard, **Then** I see skeleton placeholders for all content areas
4. **Given** data fails to load, **When** I view the dashboard, **Then** I see an error message with a retry button

---

### User Story 2 - Analyze Earnings Performance (Priority: P2)

As an EVEN artist, I want to view my earnings analytics over different time periods with interactive charts so I can identify trends and understand my revenue patterns across all product types.

**Why this priority**: Earnings data is critical for business decisions. Artists need to track revenue trends across music, videos, merch, and experiences to plan their content and product strategy.

**Independent Test**: Can be fully tested by interacting with the range selector and verifying the chart updates with corresponding data points and KPI values, including breakdown by product category.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I view the Earnings section, **Then** I see an interactive line/area chart showing earnings over time
2. **Given** I am viewing the earnings chart, **When** I select a different time range (7d, 30d, 90d, 1y), **Then** the chart updates to show data for that period
3. **Given** I am viewing the earnings chart, **When** I hover over a data point, **Then** I see a tooltip with the exact value, date, and category breakdown
4. **Given** I am viewing the earnings chart, **When** I view the section, **Then** I see KPI cards showing period totals, your cut vs. platform fees, and change percentage
5. **Given** I am viewing the earnings chart, **When** I interact with the legend, **Then** I can toggle visibility of different product categories (Music, Videos, Merch, Experiences)

---

### User Story 3 - Browse Recent Products (Priority: P2)

As an EVEN artist, I want to browse my recent products with filtering and sorting options so I can find specific items and see their performance details across all categories.

**Why this priority**: Equal priority to earnings as products are how artists generate revenue on EVEN. Artists need to track individual product performance across music releases, video content, merchandise, and experiences.

**Independent Test**: Can be fully tested by filtering products by category, sorting by different criteria, and clicking a product to view its details in a drawer.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I view the Recent Products section, **Then** I see a grid of product cards showing artwork/image, title, category, and listing date
2. **Given** I am viewing products, **When** I filter by category (Music, Videos, Merch, Experiences, All), **Then** only products of that category are displayed
3. **Given** I am viewing products, **When** I sort by "Newest" or "Best Selling", **Then** the products reorder accordingly
4. **Given** I am viewing products, **When** I click on a product card, **Then** a detail drawer opens showing expanded information and an earnings sparkline chart
5. **Given** I am viewing the product drawer, **When** I click outside or press the close button, **Then** the drawer closes

---

### User Story 4 - Monitor Fan Engagement (Priority: P3)

As an EVEN artist, I want to monitor my fan engagement metrics and see where my fans are located so I can understand my audience and plan targeted activities like tours, virtual events, and geo-specific promotions.

**Why this priority**: Engagement data helps artists understand their direct-to-fan relationships but is secondary to revenue and product tracking. Provides value for marketing, tour planning, and experience offerings.

**Independent Test**: Can be fully tested by viewing engagement KPIs, trend chart, and fan location distribution, then sending a test update via the dialog.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I view the Fan Engagement section, **Then** I see KPI cards showing key engagement metrics (total fans, new fans this period, repeat buyers, email subscribers)
2. **Given** I am viewing engagement, **When** I look at the trend chart, **Then** I see a small chart showing fan growth over time
3. **Given** I am viewing engagement, **When** I look at top locations, **Then** I see a list of top fan locations with visual progress bars showing relative distribution
4. **Given** I want to communicate with fans, **When** I click "Send Update", **Then** a dialog opens with a form to compose a message to my fan base
5. **Given** I am composing a fan update, **When** I submit with valid content, **Then** I see a success toast notification and the dialog closes

---

### Edge Cases

- What happens when there are no products to display? System shows an empty state message encouraging the artist to list their first product on EVEN
- What happens when earnings data is unavailable for the selected range? Chart displays "No data available" message with the empty time period
- What happens when the API is slow or unavailable? Loading states persist with skeleton loaders; after timeout, error state with retry option appears
- What happens when the user switches time ranges rapidly? Previous requests are cancelled and only the latest selection is displayed
- What happens when the fan update form is submitted with invalid data? Form shows inline validation errors and prevents submission
- What happens on mobile viewport? Layout adapts responsively with stacked cards and scrollable sections
- What happens when an artist has products in only some categories? Empty categories show zero in the legend but don't break the chart

## Requirements *(mandatory)*

### Functional Requirements

**Dashboard Core**
- **FR-001**: System MUST display artist profile information including name and avatar image
- **FR-002**: System MUST display four primary KPI summary cards in the header area (earnings, revenue retained %, fans, engagement)
- **FR-003**: System MUST redirect users from the root path to the dashboard page
- **FR-004**: System MUST show a custom 404 page for unknown routes
- **FR-005**: System MUST show a custom error page for application errors
- **FR-006**: System MUST display "Powered by EVEN" or similar branding element

**Earnings Analytics**
- **FR-007**: System MUST display an interactive time-series chart for earnings data
- **FR-008**: System MUST allow users to select time ranges: 7 days, 30 days, 90 days, 1 year
- **FR-009**: System MUST display KPI cards showing earnings totals, artist's revenue share, platform fees, and period-over-period change
- **FR-010**: System MUST show tooltips on chart data points with exact values and category breakdown
- **FR-011**: System MUST allow toggling legend items to show/hide different product categories
- **FR-012**: System MUST display earnings breakdown by category (Music, Videos, Merch, Experiences)

**Products**
- **FR-013**: System MUST display products in a responsive grid layout
- **FR-014**: System MUST allow filtering products by category: Music, Videos, Merch, Experiences, or All
- **FR-015**: System MUST allow sorting products by newest date or best selling
- **FR-016**: System MUST open a detail drawer when a product is clicked
- **FR-017**: Product drawer MUST display extended information and an earnings sparkline
- **FR-018**: Product cards MUST display a category badge (Music, Video, Merch, Experience)

**Fan Engagement**
- **FR-019**: System MUST display fan engagement KPI cards (total fans, new fans, repeat buyers, subscribers)
- **FR-020**: System MUST display a compact trend chart for fan growth over time
- **FR-021**: System MUST display top fan locations with visual proportion bars
- **FR-022**: System MUST provide a "Send Update" action that opens a form dialog
- **FR-023**: Fan update form MUST validate required fields before submission
- **FR-024**: System MUST display a success notification after form submission

**UX & Accessibility**
- **FR-025**: System MUST display loading skeletons while data is being fetched
- **FR-026**: System MUST display error states with retry functionality when data fails to load
- **FR-027**: System MUST be navigable via keyboard
- **FR-028**: System MUST include appropriate ARIA labels for screen readers
- **FR-029**: System MUST display visible focus indicators for interactive elements
- **FR-030**: System MUST be responsive across mobile and desktop viewports

**Visual Design (EVEN Brand)**
- **FR-031**: System MUST use a dark theme as the default appearance reflecting EVEN's premium music-tech aesthetic
- **FR-032**: System MUST use rounded cards (16-24px border radius) and pill-shaped controls
- **FR-033**: System MUST use high contrast typography with minimal accent colors
- **FR-034**: System MUST use bold, confident typography suitable for a music industry audience

### Key Entities

- **Artist**: Represents the logged-in EVEN artist with profile information (name, avatar URL, bio), aggregate earnings, and fan statistics
- **Product**: An item for sale on EVEN with category (Music, Video, Merch, Experience), title, image URL, listing date, price, and sales figures
- **MusicProduct**: A music product subtype with additional fields: release type (Single, EP, Album), track count, streaming stats
- **EarningsData**: Time-series data points containing date, gross revenue, artist cut, platform fees, and category breakdown; supports aggregation by time range
- **FanMetrics**: Fan interaction data including total fans, new fans, repeat buyers, subscribers; supports time-series and aggregate views
- **FanLocation**: Geographic distribution of fans with location name and fan count/percentage

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Dashboard loads and displays all sections with data within 3 seconds on standard broadband connection
- **SC-002**: Users can change the earnings time range and see updated chart within 1 second
- **SC-003**: Users can filter and sort products and see results within 500 milliseconds
- **SC-004**: All interactive elements are reachable and operable via keyboard-only navigation
- **SC-005**: All critical user journeys pass automated end-to-end tests (dashboard load, range change, product detail view)
- **SC-006**: Design system components are documented with interactive examples viewable in isolation
- **SC-007**: Application displays graceful error states (not browser errors) for all failure scenarios
- **SC-008**: Layout adapts appropriately when viewport width changes from mobile (375px) to desktop (1440px)
- **SC-009**: Color contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- **SC-010**: All form inputs include visible labels and validation feedback
- **SC-011**: Revenue retained percentage is prominently displayed, reinforcing EVEN's value proposition

## Assumptions

- This is a demonstration/take-home project using mock data only; no real backend persistence
- Single artist context (no multi-artist switching required)
- Authentication/authorization is out of scope
- The "Send Update" form is a UI demonstration; no actual message delivery
- Time ranges use deterministic mock data seeded for consistent testing
- Mobile viewport minimum width is 375px (iPhone SE)
- Desktop maximum tested width is 1440px
- Dark theme is the primary experience; light theme is optional stretch goal
- Revenue split shown is illustrative (e.g., 85% to artist) reflecting EVEN's direct-to-fan model
- Product categories (Music, Videos, Merch, Experiences) match EVEN's actual platform offerings
