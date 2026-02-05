import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getReleases } from "../data/mock-data.js";

const querySchema = z.object({
	limit: z.coerce.number().int().positive().default(4),
});

export const releasesRoutes: FastifyPluginAsync = async (fastify) => {
	// Get releases with optional limit
	fastify.get("/releases", async (request) => {
		const { limit } = querySchema.parse(request.query);

		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 200));

		return getReleases(limit);
	});
};
