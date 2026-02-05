import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@even/ui/globals.css";
import { LanguageProvider } from "@/i18n/provider";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster, TooltipProvider } from "@even/ui";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "EVEN Artist Dashboard",
	description: "Direct-to-fan platform for music artists",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<QueryProvider>
					<LanguageProvider>
						<TooltipProvider>
							<main className="min-h-screen bg-background text-foreground">{children}</main>
							<Toaster />
						</TooltipProvider>
					</LanguageProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
