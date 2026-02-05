"use client";

import { useLanguage } from "@/i18n/provider";
import { formatNumber } from "@even/shared";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
} from "@even/ui";
import { useToast } from "@even/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface SendUpdateDialogProps {
	open: boolean;
	onClose: () => void;
	totalFans: number;
}

export function SendUpdateDialog({ open, onClose, totalFans }: SendUpdateDialogProps) {
	const t = useTranslations();
	const { intlLocale } = useLanguage();
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!subject.trim() || !message.trim()) {
			toast({
				title: t("sendUpdate.validationError"),
				description: t("sendUpdate.validationMessage"),
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast({
			title: t("sendUpdate.success"),
			description: t("sendUpdate.successMessage", { count: formatNumber(totalFans, intlLocale) }),
		});

		setIsSubmitting(false);
		setSubject("");
		setMessage("");
		onClose();
	};

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			setSubject("");
			setMessage("");
			onClose();
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{t("sendUpdate.title")}</DialogTitle>
					<DialogDescription>
						{t("sendUpdate.description", { count: formatNumber(totalFans, intlLocale) })}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="subject" className="text-sm font-medium">
							{t("sendUpdate.subjectLabel")} <span className="text-destructive">*</span>
						</label>
						<Input
							id="subject"
							placeholder={t("sendUpdate.subjectPlaceholder")}
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="message" className="text-sm font-medium">
							{t("sendUpdate.messageLabel")} <span className="text-destructive">*</span>
						</label>
						<textarea
							id="message"
							className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							placeholder={t("sendUpdate.messagePlaceholder")}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						/>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
							{t("common.cancel")}
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? t("sendUpdate.sending") : t("sendUpdate.sendButton")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
