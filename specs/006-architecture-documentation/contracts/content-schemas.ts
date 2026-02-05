/**
 * Content Schemas for Architecture Documentation Suite
 *
 * These Zod schemas validate MDX frontmatter at build time.
 * They define the contract between content authors and the documentation system.
 */

import { z } from "zod";

// =============================================================================
// Base Schemas
// =============================================================================

/**
 * Common frontmatter fields shared across all documentation types
 */
export const baseFrontmatterSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(200),
	lastUpdated: z.string().datetime().optional(),
	author: z.string().optional(),
	tags: z.array(z.string().max(30)).max(10).optional(),
	deprecated: z.boolean().optional(),
	deprecationNotice: z.string().optional(),
});

// =============================================================================
// Documentation Page Schema
// =============================================================================

export const documentationPageSchema = baseFrontmatterSchema.extend({
	category: z.enum(["architecture", "adr", "manual", "api"]),
	version: z.string().optional(),
	sidebarPosition: z.number().int().positive().optional(),
});

export type DocumentationPage = z.infer<typeof documentationPageSchema>;

// =============================================================================
// Architecture Diagram Schema
// =============================================================================

export const diagramTypeSchema = z.enum([
	"c4-context",
	"c4-container",
	"c4-component",
	"sequence",
	"flowchart",
	"er",
	"state",
]);

export const clickableNodeSchema = z.object({
	nodeId: z.string(),
	targetPage: z.string(),
});

export const architectureDiagramSchema = z.object({
	id: z.string(),
	title: z.string().min(1).max(100),
	type: diagramTypeSchema,
	linkedPages: z.array(z.string()).optional(),
	clickableNodes: z.array(clickableNodeSchema).optional(),
});

export type ArchitectureDiagram = z.infer<typeof architectureDiagramSchema>;

// =============================================================================
// ADR (Architecture Decision Record) Schema
// =============================================================================

export const adrStatusSchema = z.enum([
	"proposed",
	"accepted",
	"deprecated",
	"superseded",
]);

export const adrAlternativeSchema = z.object({
	name: z.string(),
	description: z.string(),
	rejectedBecause: z.string(),
});

export const adrConsequencesSchema = z.object({
	positive: z.array(z.string()),
	negative: z.array(z.string()),
});

export const adrFrontmatterSchema = baseFrontmatterSchema.extend({
	number: z.number().int().positive(),
	status: adrStatusSchema,
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	decisionMakers: z.array(z.string()).min(1),
	supersededBy: z.number().int().positive().optional(),
	supersedes: z.number().int().positive().optional(),
	relatedDecisions: z.array(z.number().int().positive()).optional(),
});

// Refinement: if status is 'superseded', supersededBy must be present
export const adrSchema = adrFrontmatterSchema.refine(
	(data) => {
		if (data.status === "superseded") {
			return data.supersededBy !== undefined;
		}
		return true;
	},
	{
		message: "supersededBy is required when status is 'superseded'",
		path: ["supersededBy"],
	},
);

export type ADR = z.infer<typeof adrSchema>;

// =============================================================================
// User Manual Schema
// =============================================================================

export const manualDifficultySchema = z.enum([
	"beginner",
	"intermediate",
	"advanced",
]);

export const manualStepSchema = z.object({
	number: z.number().int().positive(),
	instruction: z.string(),
	screenshot: z.string().optional(),
	tip: z.string().optional(),
	warning: z.string().optional(),
});

export const commonIssueSchema = z.object({
	problem: z.string(),
	solution: z.string(),
});

export const userManualFrontmatterSchema = baseFrontmatterSchema.extend({
	feature: z.string(),
	difficulty: manualDifficultySchema,
	estimatedTime: z.string().optional(),
	prerequisites: z.array(z.string()).optional(),
});

export type UserManual = z.infer<typeof userManualFrontmatterSchema>;

// =============================================================================
// API Endpoint Schema (for manual enhancements)
// =============================================================================

export const httpMethodSchema = z.enum([
	"GET",
	"POST",
	"PUT",
	"DELETE",
	"PATCH",
]);

export const apiEndpointEnhancementSchema = z.object({
	path: z.string().startsWith("/"),
	method: httpMethodSchema,
	useCases: z.array(z.string()).optional(),
	relatedEndpoints: z.array(z.string()).optional(),
	examples: z
		.array(
			z.object({
				title: z.string(),
				description: z.string(),
				request: z.unknown().optional(),
				response: z.unknown().optional(),
			}),
		)
		.optional(),
});

export type APIEndpointEnhancement = z.infer<
	typeof apiEndpointEnhancementSchema
>;

// =============================================================================
// Search Index Schema
// =============================================================================

export const searchIndexEntrySchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	category: z.string(),
	tags: z.array(z.string()),
	content: z.string(),
	headings: z.array(z.string()),
});

export const searchIndexSchema = z.object({
	pages: z.array(searchIndexEntrySchema),
	generatedAt: z.string().datetime(),
});

export type SearchIndex = z.infer<typeof searchIndexSchema>;
