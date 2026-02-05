import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getEarnings } from "../data/mock-data.js";

const querySchema = z.object({
	range: z.enum(["7d", "30d", "90d", "1y"]).optional().default("30d"),
});

export const earningsRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/earnings", async (request) => {
		const query = querySchema.parse(request.query);

		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 200));

		return getEarnings(query.range);
	});
};
