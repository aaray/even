import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getProducts, mockProducts } from "../data/mock-data.js";

const querySchema = z.object({
	category: z.enum(["all", "music", "video", "merch", "experience"]).optional(),
	sortBy: z.enum(["newest", "revenue", "sales"]).optional(),
	page: z.coerce.number().int().positive().optional(),
	limit: z.coerce.number().int().positive().max(100).optional(),
});

export const productsRoutes: FastifyPluginAsync = async (fastify) => {
	// Get all products with filtering and sorting
	fastify.get("/products", async (request) => {
		const query = querySchema.parse(request.query);

		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 150));

		return getProducts({
			category: query.category,
			sortBy: query.sortBy,
			page: query.page,
			limit: query.limit,
		});
	});

	// Get single product by ID
	fastify.get<{ Params: { id: string } }>("/products/:id", async (request, reply) => {
		const { id } = request.params;

		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 100));

		const product = mockProducts.find((p) => p.id === id);

		if (!product) {
			reply.status(404);
			return {
				error: {
					code: "NOT_FOUND",
					message: `Product with id "${id}" not found`,
					timestamp: new Date().toISOString(),
				},
			};
		}

		return product;
	});
};
