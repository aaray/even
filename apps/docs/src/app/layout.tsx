import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "@even/ui/globals.css";

export const metadata = {
	title: {
		default: "EVEN Documentation",
		template: "%s - EVEN Documentation",
	},
	description: "EVEN Artist Dashboard Documentation",
};

const logo = <span className="font-bold text-xl">EVEN Docs</span>;

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Layout
					navbar={<Navbar logo={logo} projectLink="https://github.com/aaray/even" />}
					footer={
						<Footer>
							{new Date().getFullYear()} ©{" "}
							<a href="https://get.even.biz" target="_blank" rel="noreferrer">
								EVEN
							</a>
							. All rights reserved.
						</Footer>
					}
					editLink="Edit this page on GitHub"
					docsRepositoryBase="https://github.com/aaray/even/tree/main/apps/docs"
					sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
					toc={{ backToTop: true }}
					pageMap={await getPageMap()}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
