import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@even/ui", "@even/shared"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.dicebear.com",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
		],
	},
};

export default nextConfig;
