export const SUPPORTED_LOCALES = ["en", "es", "pt-BR"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

export const LOCALE_CONFIG: Record<
	SupportedLocale,
	{
		name: string;
		intlLocale: string;
		currency: string;
	}
> = {
	en: { name: "English", intlLocale: "en-US", currency: "USD" },
	es: { name: "Español", intlLocale: "es-ES", currency: "USD" },
	"pt-BR": { name: "Português", intlLocale: "pt-BR", currency: "BRL" },
};
