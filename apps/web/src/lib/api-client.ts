import { ApiErrorSchema } from "@even/shared";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export class ApiClientError extends Error {
	constructor(
		public readonly code: string,
		message: string,
		public readonly statusCode: number
	) {
		super(message);
		this.name = "ApiClientError";
	}
}

interface FetchOptions extends Omit<RequestInit, "body"> {
	body?: unknown;
}

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));

		// Try to parse as our API error format
		const parsed = ApiErrorSchema.safeParse(errorData.error);
		if (parsed.success) {
			throw new ApiClientError(parsed.data.code, parsed.data.message, response.status);
		}

		throw new ApiClientError(
			"UNKNOWN_ERROR",
			errorData.message || response.statusText || "An error occurred",
			response.status
		);
	}

	return response.json() as Promise<T>;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	const { body, ...restOptions } = options;

	const config: RequestInit = {
		...restOptions,
		headers: {
			"Content-Type": "application/json",
			...restOptions.headers,
		},
	};

	if (body) {
		config.body = JSON.stringify(body);
	}

	const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
	return handleResponse<T>(response);
}

// Convenience methods
export const api = {
	get: <T>(endpoint: string, options?: FetchOptions) =>
		apiClient<T>(endpoint, { ...options, method: "GET" }),

	post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
		apiClient<T>(endpoint, { ...options, method: "POST", body }),

	put: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
		apiClient<T>(endpoint, { ...options, method: "PUT", body }),

	delete: <T>(endpoint: string, options?: FetchOptions) =>
		apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
