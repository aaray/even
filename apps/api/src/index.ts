import cors from "@fastify/cors";
import Fastify from "fastify";
import { artistRoutes } from "./routes/artist.js";
import { earningsRoutes } from "./routes/earnings.js";
import { fanActivityRoutes } from "./routes/fan-activity.js";
import { fansRoutes } from "./routes/fans.js";
import { healthRoutes } from "./routes/health.js";
import { productsRoutes } from "./routes/products.js";
import { releasesRoutes } from "./routes/releases.js";

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

const fastify = Fastify({
	logger: {
		level: "info",
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	},
});

// Register CORS
await fastify.register(cors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
});

// Register routes
await fastify.register(healthRoutes);
await fastify.register(artistRoutes, { prefix: "/api" });
await fastify.register(productsRoutes, { prefix: "/api" });
await fastify.register(earningsRoutes, { prefix: "/api" });
await fastify.register(fansRoutes, { prefix: "/api" });
await fastify.register(releasesRoutes, { prefix: "/api" });
await fastify.register(fanActivityRoutes, { prefix: "/api" });

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
	fastify.log.error(error);

	const statusCode = error.statusCode ?? 500;
	const message = statusCode === 500 ? "Internal Server Error" : error.message;

	reply.status(statusCode).send({
		error: {
			code:
				statusCode === 400
					? "VALIDATION_ERROR"
					: statusCode === 404
						? "NOT_FOUND"
						: "INTERNAL_ERROR",
			message,
			timestamp: new Date().toISOString(),
		},
	});
});

// Start server
try {
	await fastify.listen({ port, host });
	console.log(`🚀 EVEN API running at http://${host}:${port}`);
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
