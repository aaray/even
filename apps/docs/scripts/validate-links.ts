#!/usr/bin/env bun
/**
 * Link Validation Script
 *
 * Validates all internal links in documentation files to ensure they point to
 * existing pages. Run this in CI to catch broken links before deployment.
 *
 * Usage:
 *   bun run scripts/validate-links.ts
 */

import { glob } from "glob";
import { readFile } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";

const DOCS_ROOT = resolve(import.meta.dirname, "../src/pages");

interface LinkInfo {
	href: string;
	file: string;
	line: number;
}

interface ValidationResult {
	valid: LinkInfo[];
	broken: LinkInfo[];
	external: LinkInfo[];
}

// Regex patterns for finding links
const MARKDOWN_LINK = /\[([^\]]*)\]\(([^)]+)\)/g;
const JSX_HREF = /href=["']([^"']+)["']/g;

async function findAllMdxFiles(): Promise<string[]> {
	const pattern = join(DOCS_ROOT, "**/*.mdx");
	return glob(pattern);
}

function extractLinks(content: string, filePath: string): LinkInfo[] {
	const links: LinkInfo[] = [];
	const lines = content.split("\n");

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];

		// Find markdown links using matchAll
		const markdownMatches = line.matchAll(MARKDOWN_LINK);
		for (const match of markdownMatches) {
			links.push({
				href: match[2],
				file: filePath,
				line: lineIndex + 1,
			});
		}

		// Find JSX href attributes using matchAll
		const jsxMatches = line.matchAll(JSX_HREF);
		for (const match of jsxMatches) {
			links.push({
				href: match[1],
				file: filePath,
				line: lineIndex + 1,
			});
		}
	}

	return links;
}

function isExternalLink(href: string): boolean {
	return (
		href.startsWith("http://") ||
		href.startsWith("https://") ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:")
	);
}

function isAnchorLink(href: string): boolean {
	return href.startsWith("#");
}

async function fileExists(path: string): Promise<boolean> {
	try {
		await Bun.file(path).text();
		return true;
	} catch {
		return false;
	}
}

async function resolveInternalLink(href: string, sourceFile: string): Promise<boolean> {
	// Remove anchor from href
	const [path] = href.split("#");

	if (!path || path === "") {
		return true; // Just an anchor
	}

	// Handle absolute paths (starting with /)
	const targetPath = path.startsWith("/") ? join(DOCS_ROOT, path) : join(dirname(sourceFile), path);

	// Try different extensions
	const extensions = ["", ".mdx", ".md", "/index.mdx", "/index.md"];

	for (const ext of extensions) {
		if (await fileExists(targetPath + ext)) {
			return true;
		}
	}

	return false;
}

async function validateLinks(): Promise<ValidationResult> {
	const result: ValidationResult = {
		valid: [],
		broken: [],
		external: [],
	};

	const files = await findAllMdxFiles();

	for (const file of files) {
		const content = await readFile(file, "utf-8");
		const links = extractLinks(content, file);

		for (const link of links) {
			// Skip external links
			if (isExternalLink(link.href)) {
				result.external.push(link);
				continue;
			}

			// Skip pure anchor links
			if (isAnchorLink(link.href)) {
				result.valid.push(link);
				continue;
			}

			// Validate internal link
			const exists = await resolveInternalLink(link.href, link.file);
			if (exists) {
				result.valid.push(link);
			} else {
				result.broken.push(link);
			}
		}
	}

	return result;
}

function formatRelativePath(absolutePath: string): string {
	return absolutePath.replace(DOCS_ROOT, "").replace(/^\//, "");
}

async function main() {
	console.log("Validating documentation links...\n");

	const result = await validateLinks();

	// Report broken links
	if (result.broken.length > 0) {
		console.log(`\x1b[31mBroken Links (${result.broken.length}):\x1b[0m\n`);
		for (const link of result.broken) {
			console.log(`  ${formatRelativePath(link.file)}:${link.line}`);
			console.log(`    → ${link.href}\n`);
		}
	}

	// Summary
	console.log("---");
	console.log(`\x1b[32mValid links:\x1b[0m     ${result.valid.length}`);
	console.log(`\x1b[33mExternal links:\x1b[0m  ${result.external.length}`);
	console.log(`\x1b[31mBroken links:\x1b[0m    ${result.broken.length}`);

	// Exit with error if broken links found
	if (result.broken.length > 0) {
		console.log("\n\x1b[31mLink validation failed!\x1b[0m");
		process.exit(1);
	}

	console.log("\n\x1b[32mAll links valid!\x1b[0m");
}

main();
