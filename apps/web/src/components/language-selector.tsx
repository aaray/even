"use client";

import { LOCALE_CONFIG, SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n/config";
import { useLanguage } from "@/i18n/provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@even/ui";
import { Globe } from "lucide-react";

export function LanguageSelector() {
	const { locale, setLocale } = useLanguage();

	return (
		<Select value={locale} onValueChange={(v) => setLocale(v as SupportedLocale)}>
			<SelectTrigger className="w-[140px]" aria-label="Language">
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
