/**
 * Format cents as currency string
 * @param cents Amount in cents
 * @param currency Currency code (default: USD)
 * @param locale Locale for formatting (default: en-US)
 */
export function formatCurrency(cents: number, currency = "USD", locale = "en-US"): string {
	const dollars = cents / 100;
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(dollars);
}

/**
 * Format large numbers with K/M/B suffixes
 * @param num Number to format
 * @param locale Locale for formatting (default: en-US)
 */
export function formatCompactNumber(num: number, locale = "en-US"): string {
	return new Intl.NumberFormat(locale, {
		notation: "compact",
		compactDisplay: "short",
		maximumFractionDigits: 1,
	}).format(num);
}

/**
 * Format number with comma separators
 * @param num Number to format
 * @param locale Locale for formatting (default: en-US)
 */
export function formatNumber(num: number, locale = "en-US"): string {
	return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format percentage with optional decimal places
 * @param value Percentage value (0-100)
 * @param decimals Decimal places (default: 1)
 * @param locale Locale for formatting (default: en-US)
 */
export function formatPercent(value: number, decimals = 1, locale = "en-US"): string {
	return new Intl.NumberFormat(locale, {
		style: "percent",
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(value / 100);
}

/**
 * Format date for display
 * @param dateString ISO date string
 * @param style Format style
 * @param locale Locale for formatting (default: en-US)
 */
export function formatDate(
	dateString: string,
	style: "short" | "medium" | "long" = "medium",
	locale = "en-US"
): string {
	const date = new Date(dateString);
	const optionsMap: Record<"short" | "medium" | "long", Intl.DateTimeFormatOptions> = {
		short: { month: "short", day: "numeric" },
		medium: { month: "short", day: "numeric", year: "numeric" },
		long: { month: "long", day: "numeric", year: "numeric" },
	};

	return new Intl.DateTimeFormat(locale, optionsMap[style]).format(date);
}

/**
 * Format relative time (e.g., "2 days ago")
 * @param dateString ISO date string
 * @param locale Locale for formatting (default: en-US)
 */
export function formatRelativeTime(dateString: string, locale = "en-US"): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

	if (diffDays === 0) return rtf.format(0, "day");
	if (diffDays === 1) return rtf.format(-1, "day");
	if (diffDays < 7) return rtf.format(-diffDays, "day");
	if (diffDays < 30) return rtf.format(-Math.floor(diffDays / 7), "week");
	if (diffDays < 365) return rtf.format(-Math.floor(diffDays / 30), "month");
	return rtf.format(-Math.floor(diffDays / 365), "year");
}

/**
 * Format change percentage with +/- prefix
 * @param value Change percentage
 * @param locale Locale for formatting (default: en-US)
 */
export function formatChange(value: number, locale = "en-US"): string {
	const formatted = new Intl.NumberFormat(locale, {
		style: "percent",
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
		signDisplay: "always",
	}).format(value / 100);
	return formatted;
}
