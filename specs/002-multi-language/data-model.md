# Data Model: Multi-Language Support

**Feature**: 002-multi-language
**Date**: 2026-02-05

## Entities

### 1. Language Configuration

Represents supported languages and their settings.

```typescript
// apps/web/src/i18n/config.ts

export const SUPPORTED_LOCALES = ["en", "es", "pt-BR"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

export const LOCALE_CONFIG: Record<SupportedLocale, {
  name: string;           // Native name for display in selector
  intlLocale: string;     // Full locale for Intl APIs
  currency: string;       // Default currency code
}> = {
  en: { name: "English", intlLocale: "en-US", currency: "USD" },
  es: { name: "Español", intlLocale: "es-ES", currency: "USD" },
  "pt-BR": { name: "Português", intlLocale: "pt-BR", currency: "BRL" },
};
```

**Fields**:
- `SUPPORTED_LOCALES`: Tuple of language codes (type-safe)
- `DEFAULT_LOCALE`: Fallback language ("en")
- `LOCALE_CONFIG`: Per-locale settings including display name and Intl locale

### 2. Language Context State

Client-side state for current language selection.

```typescript
// apps/web/src/hooks/use-language.ts

interface LanguageState {
  locale: SupportedLocale;          // Current selected language
  intlLocale: string;               // Intl-compatible locale string
  isLoading: boolean;               // True during initial hydration
}

interface LanguageActions {
  setLocale: (locale: SupportedLocale) => void;  // Change language
}

type LanguageContext = LanguageState & LanguageActions;
```

**Persistence**:
- Stored in `localStorage` under key `"even-language"`
- Read on mount (client-side only to avoid hydration mismatch)
- Written on every `setLocale()` call

### 3. Translation Messages

Structure for translation JSON files.

```typescript
// Type definition (inferred by next-intl from en.json)

interface Messages {
  // KPI Section
  "kpi.totalEarnings": string;
  "kpi.revenueRetained": string;
  "kpi.totalFans": string;
  "kpi.engagementRate": string;
  "kpi.vsIndustryAvg": string;

  // Earnings Section
  "earnings.title": string;
  "earnings.revenueOverTime": string;
  "earnings.categoryBreakdown": string;
  "earnings.totalEarnings": string;
  "earnings.yourCut": string;
  "earnings.platformFee": string;
  "earnings.revenueRetained": string;
  "earnings.retained": string;
  "earnings.toEven": string;
  "earnings.error": string;

  // Fans Section
  "fans.title": string;
  "fans.sendUpdate": string;
  "fans.totalFans": string;
  "fans.newFans": string;
  "fans.repeatBuyers": string;
  "fans.emailSubscribers": string;
  "fans.loyalFans": string;
  "fans.reachable": string;
  "fans.fanGrowth": string;
  "fans.topLocations": string;
  "fans.inLast": string;

  // Products Section
  "products.title": string;
  "products.error": string;
  "products.noProducts": string;
  "products.noProductsInCategory": string;
  "products.sold": string;

  // Product Details
  "product.totalEarnings": string;
  "product.unitsSold": string;
  "product.price": string;
  "product.details": string;
  "product.releaseType": string;
  "product.trackCount": string;
  "product.streams": string;
  "product.duration": string;
  "product.views": string;
  "product.variant": string;
  "product.inStock": string;
  "product.eventDate": string;
  "product.capacity": string;
  "product.attendees": string;

  // Send Update Dialog
  "sendUpdate.title": string;
  "sendUpdate.description": string;
  "sendUpdate.subjectLabel": string;
  "sendUpdate.subjectPlaceholder": string;
  "sendUpdate.messageLabel": string;
  "sendUpdate.messagePlaceholder": string;
  "sendUpdate.validationError": string;
  "sendUpdate.validationMessage": string;
  "sendUpdate.sending": string;
  "sendUpdate.success": string;
  "sendUpdate.successMessage": string;

  // Categories
  "category.all": string;
  "category.music": string;
  "category.video": string;
  "category.merch": string;
  "category.experience": string;

  // Sort Options
  "sort.newest": string;
  "sort.bestSelling": string;
  "sort.mostSales": string;

  // Time Ranges
  "range.7d": string;
  "range.30d": string;
  "range.90d": string;
  "range.1y": string;

  // Common
  "common.retry": string;
  "common.cancel": string;
  "common.close": string;

  // Errors
  "error.title": string;
  "error.message": string;
  "error.tryAgain": string;
  "error.notFound": string;
  "error.notFoundMessage": string;
  "error.goToDashboard": string;

  // Language Selector
  "language.label": string;
  "language.select": string;
}
```

**File Locations**:
- `apps/web/src/i18n/translations/en.json`
- `apps/web/src/i18n/translations/es.json`
- `apps/web/src/i18n/translations/pt-BR.json`

### 4. Formatting Function Signatures

Updated signatures for locale-aware formatting.

```typescript
// packages/shared/src/utils/format.ts

// All functions gain optional locale parameter (defaults to "en-US")
function formatCurrency(cents: number, currency?: string, locale?: string): string;
function formatCompactNumber(num: number, locale?: string): string;
function formatNumber(num: number, locale?: string): string;
function formatPercent(value: number, decimals?: number, locale?: string): string;
function formatDate(dateString: string, style?: "short" | "medium" | "long", locale?: string): string;
function formatRelativeTime(dateString: string, locale?: string): string;
function formatChange(value: number, locale?: string): string;
```

## Relationships

```
┌─────────────────────┐
│  LanguageProvider   │  (React Context at root)
│  - locale           │
│  - setLocale()      │
└──────────┬──────────┘
           │ provides context
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│    useLanguage()    │────▶│    LOCALE_CONFIG    │
│  (consumer hook)    │     │  (intlLocale lookup)│
└──────────┬──────────┘     └─────────────────────┘
           │ uses
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│     useTranslations │────▶│  Translation JSON   │
│     (next-intl)     │     │  (en/es/pt-BR.json) │
└──────────┬──────────┘     └─────────────────────┘
           │ provides t()
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│     Components      │────▶│   format.ts utils   │
│  (call t() + format)│     │  (with locale param)│
└─────────────────────┘     └─────────────────────┘
```

## State Transitions

### Language Selection Flow

```
┌─────────────────┐
│  Initial Load   │
│  (no preference)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Check localStorage│──▶│  Has stored?    │
└────────┬────────┘     └────────┬────────┘
         │ no                    │ yes
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ Check navigator.│     │ Use stored      │
│ language        │     │ preference      │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Match supported?│──no─▶│ Use default (en)│
└────────┬────────┘     └─────────────────┘
         │ yes
         ▼
┌─────────────────┐
│ Use matched     │
│ locale          │
└─────────────────┘
```

### Language Change Flow

```
┌─────────────────┐
│ User clicks     │
│ language option │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ setLocale()     │
│ called          │
└────────┬────────┘
         │
         ├─────────────────────────────┐
         ▼                             ▼
┌─────────────────┐         ┌─────────────────┐
│ Update React    │         │ Save to         │
│ context state   │         │ localStorage    │
└────────┬────────┘         └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Components      │
│ re-render with  │
│ new t() values  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Format functions│
│ receive new     │
│ locale param    │
└─────────────────┘
```

## Validation Rules

### Language Code Validation

```typescript
// Validate language code is supported
function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// Partial match for browser language (e.g., "es-MX" → "es")
function matchBrowserLanguage(browserLang: string): SupportedLocale | null {
  // Exact match first
  if (isValidLocale(browserLang)) return browserLang;

  // Partial match (language code without region)
  const langCode = browserLang.split("-")[0];
  const match = SUPPORTED_LOCALES.find(l => l.startsWith(langCode));
  return match ?? null;
}
```

### Translation Key Validation

```typescript
// Type-safe translation key checking (compile-time)
// next-intl provides this automatically via:
// 1. Strict TypeScript config
// 2. Type inference from en.json structure
// 3. Compiler errors for missing keys
```

## Storage Schema

### localStorage

```
Key: "even-language"
Value: "en" | "es" | "pt-BR"
```

No migration needed - simple string value. If invalid value found, falls back to browser detection or default.
