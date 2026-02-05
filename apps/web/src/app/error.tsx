"use client";

import { Button } from "@even/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations();

	useEffect(() => {
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold">{t("error.title")}</h1>
				<p className="text-muted-foreground max-w-md">{t("error.message")}</p>
			</div>
			<Button onClick={reset} size="lg">
				{t("error.tryAgain")}
			</Button>
		</div>
	);
}
