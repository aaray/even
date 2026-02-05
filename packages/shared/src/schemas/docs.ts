import { z } from "zod";

/**
 * Base frontmatter schema for all documentation pages
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

export type BaseFrontmatter = z.infer<typeof baseFrontmatterSchema>;

/**
 * Documentation page categories
 */
export const documentationCategorySchema = z.enum(["architecture", "adr", "manual", "api"]);

export type DocumentationCategory = z.infer<typeof documentationCategorySchema>;

/**
 * Full documentation page frontmatter
 */
export const documentationPageSchema = baseFrontmatterSchema.extend({
	category: documentationCategorySchema.optional(),
	version: z.string().optional(),
	sidebarPosition: z.number().int().positive().optional(),
});

export type DocumentationPage = z.infer<typeof documentationPageSchema>;

/**
 * ADR status values
 */
export const adrStatusSchema = z.enum(["proposed", "accepted", "deprecated", "superseded"]);

export type ADRStatus = z.infer<typeof adrStatusSchema>;

/**
 * ADR frontmatter schema
 */
export const adrFrontmatterSchema = baseFrontmatterSchema.extend({
	number: z.number().int().positive(),
	status: adrStatusSchema,
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	decisionMakers: z.array(z.string()).min(1),
	supersededBy: z.number().int().positive().optional(),
	supersedes: z.number().int().positive().optional(),
	relatedDecisions: z.array(z.number().int().positive()).optional(),
});

// Validation: if status is 'superseded', supersededBy must be present
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
	}
);

export type ADRFrontmatter = z.infer<typeof adrFrontmatterSchema>;

/**
 * User manual difficulty levels
 */
export const manualDifficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

export type ManualDifficulty = z.infer<typeof manualDifficultySchema>;

/**
 * User manual frontmatter
 */
export const userManualFrontmatterSchema = baseFrontmatterSchema.extend({
	feature: z.string(),
	difficulty: manualDifficultySchema,
	estimatedTime: z.string().optional(),
	prerequisites: z.array(z.string()).optional(),
});

export type UserManualFrontmatter = z.infer<typeof userManualFrontmatterSchema>;

/**
 * Diagram type classification
 */
export const diagramTypeSchema = z.enum([
	"c4-context",
	"c4-container",
	"c4-component",
	"sequence",
	"flowchart",
	"er",
	"state",
]);

export type DiagramType = z.infer<typeof diagramTypeSchema>;

/**
 * Search index entry schema
 */
export const searchIndexEntrySchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	category: z.string(),
	tags: z.array(z.string()),
	content: z.string(),
	headings: z.array(z.string()),
});

export type SearchIndexEntry = z.infer<typeof searchIndexEntrySchema>;
