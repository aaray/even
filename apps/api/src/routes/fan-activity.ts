import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getFanActivity } from "../data/mock-data.js";

const querySchema = z.object({
	limit: z.coerce.number().int().positive().default(10),
});

export const fanActivityRoutes: FastifyPluginAsync = async (fastify) => {
	// Get fan activity with optional limit
	fastify.get("/fan-activity", async (request) => {
		const { limit } = querySchema.parse(request.query);

		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 150));

		return getFanActivity(limit);
	});
};
