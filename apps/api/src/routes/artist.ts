import type { FastifyPluginAsync } from "fastify";
import { mockArtist } from "../data/mock-data.js";

export const artistRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/artist", async () => {
		// Simulate network latency for realistic loading states
		await new Promise((resolve) => setTimeout(resolve, 100));
		return mockArtist;
	});
};
