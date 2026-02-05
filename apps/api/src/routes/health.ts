import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/health", async () => {
		return {
			status: "healthy",
			timestamp: new Date().toISOString(),
			version: "0.0.1",
		};
	});
};
