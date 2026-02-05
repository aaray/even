import type { DocsThemeConfig } from "nextra-theme-docs";

// Version configuration for future versioning support
const DOCS_VERSION = "1.0.0";
// Future versions can be added here and the selector UI can be implemented:
// const AVAILABLE_VERSIONS = [
//   { version: "1.0.0", label: "v1.0 (Current)", path: "/" },
//   { version: "2.0.0", label: "v2.0 (Next)", path: "/v2" },
// ];

const config: DocsThemeConfig = {
	logo: (
		<div className="flex items-center gap-2">
			<span className="font-bold text-xl">EVEN Docs</span>
			<span className="text-xs px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded">
				v{DOCS_VERSION}
			</span>
		</div>
	),
	project: {
		link: "https://github.com/aaray/even",
	},
	docsRepositoryBase: "https://github.com/aaray/even/tree/main/apps/docs",
	useNextSeoProps() {
		return {
			titleTemplate: "%s - EVEN Documentation",
		};
	},
	head: (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content="EVEN Artist Dashboard Documentation" />
			<link rel="icon" href="/favicon.ico" />
		</>
	),
	primaryHue: 270, // Purple to match EVEN brand
	sidebar: {
		defaultMenuCollapseLevel: 1,
		toggleButton: true,
	},
	toc: {
		backToTop: true,
	},
	editLink: {
		content: "Edit this page on GitHub",
	},
	feedback: {
		content: "Questions? Give us feedback →",
		labels: "feedback",
	},
	footer: {
		content: (
			<span>
				{new Date().getFullYear()} ©{" "}
				<a href="https://get.even.biz" target="_blank" rel="noreferrer">
					EVEN
				</a>
				. All rights reserved.
			</span>
		),
	},
	search: {
		placeholder: "Search documentation...",
	},
	navigation: {
		prev: true,
		next: true,
	},
	darkMode: true,
	nextThemes: {
		defaultTheme: "dark",
	},
};

export default config;
