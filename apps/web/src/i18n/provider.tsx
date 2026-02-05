"use client";

import { NextIntlClientProvider } from "next-intl";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_CONFIG, SUPPORTED_LOCALES, type SupportedLocale } from "./config";

import en from "./translations/en.json";
import es from "./translations/es.json";
import ptBR from "./translations/pt-BR.json";

const messages: Record<SupportedLocale, typeof en> = {
	en,
	es,
	"pt-BR": ptBR,
};

const STORAGE_KEY = "even-language";

interface LanguageContextType {
	locale: SupportedLocale;
	intlLocale: string;
	setLocale: (locale: SupportedLocale) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function matchBrowserLanguage(): SupportedLocale | null {
	if (typeof navigator === "undefined") return null;

	const browserLang = navigator.language;

	// Exact match first
	if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
		return browserLang as SupportedLocale;
	}

	// Partial match (language code without region)
	const langCode = browserLang.split("-")[0];
	if (!langCode) return null;
	const match = SUPPORTED_LOCALES.find((l) => l.startsWith(langCode));
	return match ?? null;
}

function getInitialLocale(): SupportedLocale {
	if (typeof window === "undefined") return DEFAULT_LOCALE;

	// 1. Check localStorage
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
		return stored as SupportedLocale;
	}

	// 2. Check browser language
	const browserMatch = matchBrowserLanguage();
	if (browserMatch) return browserMatch;

	// 3. Default to English
	return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const initialLocale = getInitialLocale();
		setLocaleState(initialLocale);
		setMounted(true);
	}, []);

	const setLocale = (newLocale: SupportedLocale) => {
		setLocaleState(newLocale);
		localStorage.setItem(STORAGE_KEY, newLocale);
	};

	const intlLocale = LOCALE_CONFIG[locale].intlLocale;

	// Prevent hydration mismatch by rendering with default locale until mounted
	if (!mounted) {
		return (
			<NextIntlClientProvider
				locale={DEFAULT_LOCALE}
				messages={messages[DEFAULT_LOCALE]}
				onError={(error) => {
					if (process.env.NODE_ENV === "development") {
						console.warn("Missing translation:", error);
					}
				}}
			>
				<LanguageContext.Provider
					value={{
						locale: DEFAULT_LOCALE,
						intlLocale: LOCALE_CONFIG[DEFAULT_LOCALE].intlLocale,
						setLocale,
					}}
				>
					{children}
				</LanguageContext.Provider>
			</NextIntlClientProvider>
		);
	}

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages[locale]}
			onError={(error) => {
				if (process.env.NODE_ENV === "development") {
					console.warn("Missing translation:", error);
				}
			}}
		>
			<LanguageContext.Provider value={{ locale, intlLocale, setLocale }}>
				{children}
			</LanguageContext.Provider>
		</NextIntlClientProvider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within LanguageProvider");
	}
	return context;
}
