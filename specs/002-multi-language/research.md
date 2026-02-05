# Research: Multi-Language Support

**Feature**: 002-multi-language
**Date**: 2026-02-05

## Research Tasks

### 1. i18n Library Selection for Next.js 15 App Router

**Decision**: next-intl

**Rationale**:
- First-class App Router support with server components
- ICU message format for pluralization and interpolation
- Type-safe translation keys out of the box
- Minimal bundle impact (~3KB gzipped)
- Active maintenance, aligned with Next.js releases
- No routing changes required (client-side only approach)

**Alternatives Considered**:
- **react-i18next**: More features, larger bundle, React-focused not Next.js-focused
- **lingui**: Compile-time extraction, more complex setup, better for large projects
- **Custom solution**: Violates Simplicity First principle; reinventing the wheel

### 2. Locale-Aware Formatting Strategy

**Decision**: Extend existing `packages/shared/utils/format.ts` with locale parameter

**Rationale**:
- Functions already use Intl APIs (NumberFormat, DateTimeFormat)
- Adding locale parameter is non-breaking (defaults to "en-US")
- Centralized location avoids duplication
- Already imported by all components using formatting

**Implementation Pattern**:
```typescript
// Before
export function formatCurrency(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { ... }).format(dollars);
}

// After
export function formatCurrency(cents: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { ... }).format(dollars);
}
```

**Locale Mapping**:
| Language | Locale | Currency Display |
|----------|--------|------------------|
| English | en-US | $1,234.56 |
| Spanish | es-ES | 1.234,56 $ |
| Brazilian Portuguese | pt-BR | R$ 1.234,56 |

### 3. Language Preference Persistence

**Decision**: localStorage with `navigator.language` fallback

**Rationale**:
- No authentication system exists - can't store server-side
- localStorage persists across sessions (FR-013)
- `navigator.language` enables browser detection (FR-015)
- Simpler than cookies, no backend involvement
- Hydration handled via useEffect to avoid SSR mismatch

**Implementation Pattern**:
```typescript
const STORAGE_KEY = "even-language";
const SUPPORTED = ["en", "es", "pt-BR"];

function getInitialLanguage(): string {
  // 1. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;

  // 2. Check browser language
  const browserLang = navigator.language;
  const match = SUPPORTED.find(l => browserLang.startsWith(l.split("-")[0]));
  if (match) return match;

  // 3. Default to English
  return "en";
}
```

### 4. Translation File Structure

**Decision**: Flat namespace structure with dot notation keys

**Rationale**:
- ~50 strings total - no need for nested modules
- Flat structure simpler to maintain and search
- Consistent with next-intl recommendations for small projects
- Type inference works well with flat keys

**Key Naming Convention**:
```
{section}.{element}[.{variant}]
```

**Example Structure**:
```json
{
  "kpi.totalEarnings": "Total Earnings",
  "kpi.revenueRetained": "Revenue Retained",
  "earnings.title": "Earnings Analytics",
  "earnings.error": "Failed to load earnings data",
  "products.filter.all": "All",
  "products.filter.music": "Music",
  "common.retry": "Retry",
  "common.cancel": "Cancel"
}
```

### 5. Client-Side Only vs. Internationalized Routing

**Decision**: Client-side only (no route prefixes)

**Rationale**:
- Spec does not require SEO for localized content
- Dashboard is authenticated/private content
- Simpler implementation - no middleware, no route changes
- Language switch is instant (no navigation)
- Can add route prefixes later if needed

**Trade-offs**:
- URLs don't indicate language (/dashboard vs /es/dashboard)
- Acceptable for private dashboard application

### 6. Dynamic Content Handling

**Decision**: User-generated content remains untranslated

**Implementation**:
- Artist names: Rendered as-is (artist.name)
- Product titles: Rendered as-is (product.title)
- Product descriptions: Rendered as-is (if added)
- Chart data labels: Formatted numbers, translated category names

**Category Name Handling**:
```json
{
  "category.music": "Music",
  "category.video": "Videos",
  "category.merch": "Merch",
  "category.experience": "Experiences"
}
```

Components will translate category keys:
```typescript
const categoryLabel = t(`category.${product.category}`);
```

### 7. Text Length Accommodation

**Decision**: Rely on Tailwind's responsive utilities + test coverage

**Rationale**:
- Spanish/Portuguese typically 20-30% longer than English
- Tailwind's `truncate`, `line-clamp`, flexible layouts handle most cases
- E2E tests will verify no text overflow across all languages

**Testing Strategy**:
- Playwright tests switch language and verify no layout breaks
- Visual regression testing if critical (future enhancement)

### 8. Missing Translation Fallback

**Decision**: English fallback with console warning in development

**Rationale**:
- Matches FR-016: "display English text if translation is missing"
- next-intl supports `onError` callback for logging
- Production: silent fallback to English
- Development: console.warn for missing keys

**Configuration**:
```typescript
const onError = (error) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(`Missing translation: ${error.key}`);
  }
};
```

## Summary

All technical decisions resolve NEEDS CLARIFICATION items. Implementation uses:

1. **next-intl** for translation framework
2. **Locale-parameterized Intl APIs** for formatting
3. **localStorage + navigator.language** for persistence/detection
4. **Flat JSON files** for translations
5. **Client-side only** language switching (no routes)
6. **English fallback** for missing translations

No constitution violations. Ready for Phase 1 design.
