# Quickstart: Multi-Language Support

**Feature**: 002-multi-language
**Date**: 2026-02-05

## Overview

This guide covers the key patterns for implementing multi-language support in the EVEN Artist Dashboard.

## 1. Adding next-intl

```bash
cd apps/web
bun add next-intl
```

## 2. Language Configuration

Create the i18n config file:

```typescript
// apps/web/src/i18n/config.ts
export const SUPPORTED_LOCALES = ["en", "es", "pt-BR"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

export const LOCALE_CONFIG: Record<SupportedLocale, {
  name: string;
  intlLocale: string;
}> = {
  en: { name: "English", intlLocale: "en-US" },
  es: { name: "Español", intlLocale: "es-ES" },
  "pt-BR": { name: "Português", intlLocale: "pt-BR" },
};
```

## 3. Translation Files

Create JSON translation files:

```json
// apps/web/src/i18n/translations/en.json
{
  "kpi.totalEarnings": "Total Earnings",
  "kpi.revenueRetained": "Revenue Retained",
  "common.retry": "Retry",
  "common.cancel": "Cancel"
}
```

```json
// apps/web/src/i18n/translations/es.json
{
  "kpi.totalEarnings": "Ganancias Totales",
  "kpi.revenueRetained": "Ingresos Retenidos",
  "common.retry": "Reintentar",
  "common.cancel": "Cancelar"
}
```

## 4. Language Provider Setup

```typescript
// apps/web/src/i18n/provider.tsx
"use client";

import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "./config";

// Import translations
import en from "./translations/en.json";
import es from "./translations/es.json";
import ptBR from "./translations/pt-BR.json";

const messages = { en, es, "pt-BR": ptBR };

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem("even-language");
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
      setLocaleState(stored as SupportedLocale);
    } else {
      // Browser language detection
      const browserLang = navigator.language;
      const match = SUPPORTED_LOCALES.find(l => browserLang.startsWith(l.split("-")[0]));
      if (match) setLocaleState(match);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem("even-language", newLocale);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]}>
        {children}
      </NextIntlClientProvider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
```

## 5. Using Translations in Components

```typescript
// apps/web/src/components/kpi-cards.tsx
import { useTranslations } from "next-intl";

export function KPICards() {
  const t = useTranslations();

  return (
    <div>
      <StatCard label={t("kpi.totalEarnings")} value="$24,832" />
      <StatCard label={t("kpi.revenueRetained")} value="87%" />
    </div>
  );
}
```

## 6. Locale-Aware Formatting

Update format utilities to accept locale:

```typescript
// packages/shared/src/utils/format.ts
export function formatCurrency(
  cents: number,
  currency = "USD",
  locale = "en-US"
): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}
```

Use with language context:

```typescript
import { useLanguage } from "@/i18n/provider";
import { LOCALE_CONFIG } from "@/i18n/config";
import { formatCurrency } from "@even/shared";

function EarningsDisplay({ cents }: { cents: number }) {
  const { locale } = useLanguage();
  const { intlLocale } = LOCALE_CONFIG[locale];

  return <span>{formatCurrency(cents, "USD", intlLocale)}</span>;
}
```

## 7. Language Selector Component

```typescript
// apps/web/src/components/language-selector.tsx
"use client";

import { useLanguage } from "@/i18n/provider";
import { LOCALE_CONFIG, SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n/config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@even/ui";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as SupportedLocale)}>
      <SelectTrigger className="w-[140px]">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LOCALES.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {LOCALE_CONFIG[loc].name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

## 8. Testing Language Switching

```typescript
// e2e/tests/language-switching.spec.ts
import { test, expect } from "@playwright/test";

test("switches language to Spanish", async ({ page }) => {
  await page.goto("/dashboard");

  // Open language selector
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Español" }).click();

  // Verify text changed
  await expect(page.getByText("Ganancias Totales")).toBeVisible();
});

test("persists language preference", async ({ page }) => {
  await page.goto("/dashboard");

  // Set Spanish
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Español" }).click();

  // Reload page
  await page.reload();

  // Should still be Spanish
  await expect(page.getByText("Ganancias Totales")).toBeVisible();
});
```

## Key Patterns Summary

| Pattern | Implementation |
|---------|----------------|
| Translation function | `const t = useTranslations()` then `t("key")` |
| Language state | `const { locale, setLocale } = useLanguage()` |
| Locale for formatting | `LOCALE_CONFIG[locale].intlLocale` |
| Persistence | `localStorage.setItem("even-language", locale)` |
| Browser detection | `navigator.language` with fallback matching |
| Interpolation | `t("key", { count: 5 })` with `"key": "{count} items"` |
