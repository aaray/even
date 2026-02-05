"use client";

import { Button } from "@even/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
	const t = useTranslations();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
			<div className="text-center space-y-2">
				<h1 className="text-6xl font-bold">{t("error.notFound")}</h1>
				<h2 className="text-2xl font-semibold">{t("error.notFoundTitle")}</h2>
				<p className="text-muted-foreground max-w-md">{t("error.notFoundMessage")}</p>
			</div>
			<Button asChild size="lg">
				<Link href="/dashboard">{t("error.goToDashboard")}</Link>
			</Button>
		</div>
	);
}
