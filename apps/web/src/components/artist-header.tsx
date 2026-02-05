"use client";
import type { Artist } from "@even/shared";
import { Avatar, AvatarFallback, AvatarImage, Button, Input, Skeleton } from "@even/ui";
import { Bell, Search, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./language-selector";

interface ArtistHeaderProps {
	artist: Artist | undefined;
	isLoading: boolean;
}

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
}

export function ArtistHeader({ artist, isLoading }: ArtistHeaderProps) {
	const t = useTranslations();

	if (isLoading) {
		return <ArtistHeaderSkeleton />;
	}

	if (!artist) {
		return null;
	}

	const greeting = getGreeting();

	return (
		<header
			className="glass-card p-6 flex flex-col gap-6 lg:flex-row lg:items-center"
			data-testid="artist-header"
		>
			{/* Left: Avatar and greeting */}
			<div className="flex items-center gap-4 flex-1">
				<Avatar className="h-16 w-16 border-2 border-primary/20">
					<AvatarImage src={artist.avatarUrl} alt={`${artist.name} avatar`} />
					<AvatarFallback className="text-lg font-semibold">
						{artist.name.slice(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="text-2xl font-bold flex items-center gap-2">
						{greeting}, {artist.name.split(" ")[0]}
						{artist.verified && (
							<span
								className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground"
								role="img"
								aria-label={t("artist.verified")}
								title={t("artist.verified")}
							>
								<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
						)}
					</h1>
					<p className="text-sm text-muted-foreground">Welcome back to your dashboard</p>
				</div>
			</div>

			{/* Center: Search */}
			<div className="flex-1 max-w-md">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input type="search" placeholder="Search..." className="pl-10 glass-subtle" />
				</div>
			</div>

			{/* Right: Actions */}
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon" className="relative" aria-label="notifications">
					<Bell className="h-5 w-5" />
					{/* Notification indicator */}
					<span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
				</Button>
				<Button variant="ghost" size="icon" aria-label="settings">
					<Settings className="h-5 w-5" />
				</Button>
				<LanguageSelector />
			</div>
		</header>
	);
}

function ArtistHeaderSkeleton() {
	return (
		<header
			className="glass-card p-6 flex flex-col gap-6 lg:flex-row lg:items-center animate-pulse"
			data-testid="artist-header"
		>
			<div className="flex items-center gap-4 flex-1">
				<Skeleton className="h-16 w-16 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-64" />
				</div>
			</div>
			<div className="flex-1 max-w-md">
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="flex items-center gap-2">
				<Skeleton className="h-10 w-10 rounded-md" />
				<Skeleton className="h-10 w-10 rounded-md" />
				<Skeleton className="h-10 w-[140px]" />
			</div>
		</header>
	);
}
