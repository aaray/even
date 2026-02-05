import type {
	Artist,
	EarningsResponse,
	EngagementData,
	FanActivity,
	FansResponse,
	Product,
	Release,
	TopCountry,
} from "@even/shared";

// Seeded random number generator for deterministic data
function createSeededRandom(seed: number) {
	return () => {
		seed = (seed * 9301 + 49297) % 233280;
		return seed / 233280;
	};
}

const random = createSeededRandom(42);

function randomInt(min: number, max: number): number {
	return Math.floor(random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
	const value = random() * (max - min) + min;
	return Number(value.toFixed(decimals));
}

function randomElement<T>(arr: T[]): T {
	return arr[Math.floor(random() * arr.length)];
}

// Artist mock data
export const mockArtist: Artist = {
	id: "artist_001",
	name: "Nova Chen",
	avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=NovaChen",
	bio: "Independent artist creating sounds that blur the lines between electronic, R&B, and experimental pop. Building a community, one fan at a time.",
	verified: true,
	totalEarnings: 247832.5,
	revenueRetainedPercent: 87,
	totalFans: 12847,
	engagementRate: 8.4,
	joinedAt: "2022-03-15T00:00:00Z",
};

// Product categories for mock generation
const musicProducts = [
	{ title: "Midnight Dreams EP", format: "EP" as const },
	{ title: "Echoes", format: "Single" as const },
	{ title: "Neon Horizons", format: "Album" as const },
	{ title: "Summer Vibes", format: "Single" as const },
	{ title: "Lost in Time", format: "Album" as const },
	{ title: "Acoustic Sessions Vol. 1", format: "EP" as const },
	{ title: "Digital Heart", format: "Single" as const },
	{ title: "Starlight", format: "Single" as const },
];

const videoProducts = [
	{ title: "Behind the Scenes: Neon Horizons", videoType: "Behind The Scenes" as const },
	{ title: "Live at The Roxy", videoType: "Concert Recording" as const },
	{ title: "Making of Echoes", videoType: "Documentary" as const },
	{ title: "Midnight Dreams Music Video", videoType: "Music Video" as const },
	{ title: "Studio Sessions 2024", videoType: "Behind The Scenes" as const },
	{ title: "Fan Q&A - Winter Edition", videoType: "Behind The Scenes" as const },
];

const merchProducts = [
	{ title: "Neon Tour T-Shirt", merchType: "Apparel" as const },
	{ title: "Nova Chen Hoodie", merchType: "Apparel" as const },
	{ title: "Limited Edition Vinyl Bundle", merchType: "Collectible" as const },
	{ title: "Signed Poster Set", merchType: "Collectible" as const },
	{ title: "Enamel Pin Collection", merchType: "Accessory" as const },
	{ title: "Tote Bag - Midnight Design", merchType: "Accessory" as const },
];

const experienceProducts = [
	{
		title: "Private Acoustic Session",
		experienceType: "Virtual Meet & Greet" as const,
		maxAttendees: 10,
	},
	{
		title: "Songwriting Workshop",
		experienceType: "Workshop" as const,
		maxAttendees: 25,
	},
	{
		title: "VIP Concert Package - NYC",
		experienceType: "VIP Package" as const,
		maxAttendees: 50,
	},
	{
		title: "Production Masterclass",
		experienceType: "Workshop" as const,
		maxAttendees: 30,
	},
	{
		title: "Virtual Listening Party",
		experienceType: "Virtual Meet & Greet" as const,
		maxAttendees: 100,
	},
];

// Generate mock products
function generateProducts(): Product[] {
	const products: Product[] = [];
	const id = 1;

	// Music products
	for (const music of musicProducts) {
		const unitsSold = randomInt(100, 5000);
		const price = randomInt(799, 2499); // cents
		products.push({
			id: crypto.randomUUID(),
			title: music.title,
			category: "music",
			price,
			imageUrl: `https://picsum.photos/seed/${music.title.replace(/\s/g, "")}/400/400`,
			listingDate: new Date(Date.now() - randomInt(30, 365) * 24 * 60 * 60 * 1000).toISOString(),
			unitsSold,
			totalEarnings: Math.floor(unitsSold * price * 0.87), // 87% artist cut
			releaseType: music.format === "Album" ? "album" : music.format === "EP" ? "ep" : "single",
			trackCount:
				music.format === "Album" ? randomInt(8, 14) : music.format === "EP" ? randomInt(4, 6) : 1,
			streams: randomInt(10000, 500000),
		});
	}

	// Video products
	for (const video of videoProducts) {
		const unitsSold = randomInt(50, 2000);
		const price = randomInt(499, 1999); // cents
		products.push({
			id: crypto.randomUUID(),
			title: video.title,
			category: "video",
			price,
			imageUrl: `https://picsum.photos/seed/${video.title.replace(/\s/g, "")}/400/400`,
			listingDate: new Date(Date.now() - randomInt(30, 300) * 24 * 60 * 60 * 1000).toISOString(),
			unitsSold,
			totalEarnings: Math.floor(unitsSold * price * 0.87),
			duration: randomInt(600, 7200),
			viewCount: randomInt(1000, 50000),
		});
	}

	// Merch products
	for (const merch of merchProducts) {
		const unitsSold = randomInt(50, 1500);
		const price = randomInt(1499, 7999); // cents
		products.push({
			id: crypto.randomUUID(),
			title: merch.title,
			category: "merch",
			price,
			imageUrl: `https://picsum.photos/seed/${merch.title.replace(/\s/g, "")}/400/400`,
			listingDate: new Date(Date.now() - randomInt(30, 200) * 24 * 60 * 60 * 1000).toISOString(),
			unitsSold,
			totalEarnings: Math.floor(unitsSold * price * 0.87),
			variant: merch.merchType,
			inventory: randomInt(0, 200),
		});
	}

	// Experience products
	for (const exp of experienceProducts) {
		const unitsSold = randomInt(5, 100);
		const price = randomInt(4999, 29999); // cents
		products.push({
			id: crypto.randomUUID(),
			title: exp.title,
			category: "experience",
			price,
			imageUrl: `https://picsum.photos/seed/${exp.title.replace(/\s/g, "")}/400/400`,
			listingDate: new Date(Date.now() - randomInt(30, 180) * 24 * 60 * 60 * 1000).toISOString(),
			unitsSold,
			totalEarnings: Math.floor(unitsSold * price * 0.87),
			eventDate: new Date(Date.now() + randomInt(7, 90) * 24 * 60 * 60 * 1000).toISOString(),
			capacity: exp.maxAttendees,
			attendees: Math.min(unitsSold, exp.maxAttendees),
		});
	}

	return products;
}

export const mockProducts: Product[] = generateProducts();

// Generate earnings data
function generateEarnings(range: "7d" | "30d" | "90d" | "1y"): EarningsResponse {
	const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 365;
	const data: Array<{
		date: string;
		grossRevenue: number;
		artistCut: number;
		platformFee: number;
		byCategory: { music: number; video: number; merch: number; experience: number };
	}> = [];

	let totalGross = 0;
	const categoryTotals = { music: 0, video: 0, merch: 0, experience: 0 };
	const weights = { music: 0.45, video: 0.15, merch: 0.25, experience: 0.15 };

	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
		const dayOfWeek = date.getDay();

		// Higher earnings on weekends (in cents)
		const grossRevenue =
			dayOfWeek === 0 || dayOfWeek === 6 ? randomInt(80000, 150000) : randomInt(40000, 90000);
		const artistCut = Math.floor(grossRevenue * 0.87);
		const platformFee = grossRevenue - artistCut;

		const byCategory = {
			music: Math.floor(grossRevenue * weights.music),
			video: Math.floor(grossRevenue * weights.video),
			merch: Math.floor(grossRevenue * weights.merch),
			experience: Math.floor(grossRevenue * weights.experience),
		};

		data.push({
			date: date.toISOString(),
			grossRevenue,
			artistCut,
			platformFee,
			byCategory,
		});

		totalGross += grossRevenue;
		categoryTotals.music += byCategory.music;
		categoryTotals.video += byCategory.video;
		categoryTotals.merch += byCategory.merch;
		categoryTotals.experience += byCategory.experience;
	}

	const totalArtistCut = Math.floor(totalGross * 0.87);
	const totalPlatformFee = totalGross - totalArtistCut;

	// Calculate period comparison
	const previousPeriodRatio = randomFloat(0.85, 1.25);
	const previousPeriodTotal = totalGross / previousPeriodRatio;
	const changePercent = Number(
		(((totalGross - previousPeriodTotal) / previousPeriodTotal) * 100).toFixed(1)
	);

	return {
		range,
		data,
		summary: {
			totalGross,
			totalArtistCut,
			totalPlatformFee,
			revenueRetainedPercent: 87,
			averageDaily: Math.floor(totalGross / days),
			changePercent,
			byCategory: categoryTotals,
		},
	};
}

export function getEarnings(range: "7d" | "30d" | "90d" | "1y"): EarningsResponse {
	return generateEarnings(range);
}

// Generate fans data
function generateFans(range: "7d" | "30d" | "90d" | "1y"): FansResponse {
	const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 365;
	const data: Array<{ date: string; totalFans: number; newFans: number; repeatBuyers: number }> =
		[];

	let totalNewFans = 0;
	let baseFans = mockArtist.totalFans - randomInt(500, 2000);

	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
		const dailyNewFans = randomInt(5, 50);
		const repeatBuyers = randomInt(10, 100);

		baseFans += dailyNewFans;
		totalNewFans += dailyNewFans;

		data.push({
			date: date.toISOString(),
			totalFans: baseFans,
			newFans: dailyNewFans,
			repeatBuyers,
		});
	}

	const topLocations = [
		{
			location: "United States",
			fanCount: Math.floor(mockArtist.totalFans * 0.35),
			percentage: 35,
		},
		{
			location: "United Kingdom",
			fanCount: Math.floor(mockArtist.totalFans * 0.15),
			percentage: 15,
		},
		{ location: "Canada", fanCount: Math.floor(mockArtist.totalFans * 0.12), percentage: 12 },
		{ location: "Australia", fanCount: Math.floor(mockArtist.totalFans * 0.1), percentage: 10 },
		{ location: "Germany", fanCount: Math.floor(mockArtist.totalFans * 0.08), percentage: 8 },
	];

	// Calculate period comparison
	const previousPeriodRatio = randomFloat(0.9, 1.3);
	const previousPeriodTotal = totalNewFans / previousPeriodRatio;
	const changePercent = Number(
		(((totalNewFans - previousPeriodTotal) / previousPeriodTotal) * 100).toFixed(1)
	);

	return {
		range,
		data,
		summary: {
			totalFans: mockArtist.totalFans,
			newFansInPeriod: totalNewFans,
			repeatBuyers: randomInt(2000, 5000),
			emailSubscribers: randomInt(8000, 10000),
			changePercent,
			// Extended engagement metrics (T014)
			monthlyListeners: 890000,
			monthlyListenersChange: 8.3,
			engagementRate: 4.2,
			engagementRateChange: -0.3,
			avgStreamTime: 3.5,
			avgStreamTimeChange: 0.5,
		},
		topLocations,
	};
}

export function getFans(range: "7d" | "30d" | "90d" | "1y"): FansResponse {
	return generateFans(range);
}

// Mock releases data (T008)
export const mockReleases: Release[] = [
	{
		id: "rel-1",
		title: "Midnight Sessions",
		type: "Album",
		releaseDate: "2025-11-15T00:00:00Z",
		streams: 2450000,
		sales: 4520000, // $45,200
		coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
		featured: true,
	},
	{
		id: "rel-2",
		title: "Electric Dreams",
		type: "Single",
		releaseDate: "2025-12-01T00:00:00Z",
		streams: 890000,
		sales: 1230000, // $12,300
		coverArt: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
	},
	{
		id: "rel-3",
		title: "Neon Lights EP",
		type: "EP",
		releaseDate: "2025-10-20T00:00:00Z",
		streams: 1250000,
		sales: 2100000, // $21,000
		coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
	},
	{
		id: "rel-4",
		title: "Summer Vibes",
		type: "Single",
		releaseDate: "2025-08-15T00:00:00Z",
		streams: 3100000,
		sales: 980000, // $9,800
		coverArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
		featured: true,
	},
	{
		id: "rel-5",
		title: "Urban Stories",
		type: "Album",
		releaseDate: "2025-06-01T00:00:00Z",
		streams: 4800000,
		sales: 7650000, // $76,500
		coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
	},
	{
		id: "rel-6",
		title: "Acoustic Sessions",
		type: "EP",
		releaseDate: "2025-04-10T00:00:00Z",
		streams: 720000,
		sales: 890000, // $8,900
		coverArt: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
	},
];

// Mock fan activity data (T009)
export const mockFanActivity: FanActivity[] = [
	{
		id: "act-1",
		type: "purchase",
		user: "Sarah M.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
		action: 'purchased "Midnight Sessions" album',
		timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
	},
	{
		id: "act-2",
		type: "stream",
		user: "Mike L.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mike",
		action: 'streamed "Electric Dreams" 5 times',
		timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 mins ago
	},
	{
		id: "act-3",
		type: "share",
		user: "Emma W.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma",
		action: 'shared "Neon Lights" on social media',
		timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
	},
	{
		id: "act-4",
		type: "follow",
		user: "James K.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James",
		action: "started following you",
		timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
	},
	{
		id: "act-5",
		type: "comment",
		user: "Lisa R.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa",
		action: 'commented on "Summer Vibes"',
		timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
	},
	{
		id: "act-6",
		type: "purchase",
		user: "Alex T.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex",
		action: 'purchased "Neon Lights EP"',
		timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
	},
	{
		id: "act-7",
		type: "stream",
		user: "Rachel B.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rachel",
		action: 'streamed "Urban Stories" album',
		timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
	},
	{
		id: "act-8",
		type: "share",
		user: "David C.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David",
		action: "shared your profile on Twitter",
		timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
	},
	{
		id: "act-9",
		type: "follow",
		user: "Sophia P.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sophia",
		action: "started following you",
		timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
	},
	{
		id: "act-10",
		type: "comment",
		user: "Chris H.",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Chris",
		action: 'commented on "Acoustic Sessions"',
		timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
	},
];

// Mock top countries data (T010)
export const mockTopCountries: TopCountry[] = [
	{ country: "United States", percentage: 35, listeners: 4500 },
	{ country: "United Kingdom", percentage: 18, listeners: 2300 },
	{ country: "Germany", percentage: 12, listeners: 1540 },
	{ country: "Canada", percentage: 10, listeners: 1285 },
	{ country: "Australia", percentage: 8, listeners: 1028 },
];

// Mock engagement data
export const mockEngagementData: EngagementData = {
	metrics: [
		{ metric: "Total Followers", value: 12847, change: 12.5, trend: "up", format: "number" },
		{ metric: "Monthly Listeners", value: 890000, change: 8.3, trend: "up", format: "number" },
		{ metric: "Engagement Rate", value: 4.2, change: -0.3, trend: "down", format: "percent" },
		{ metric: "Avg. Stream Time", value: 3.5, change: 0.5, trend: "up", format: "time" },
	],
	topCountries: mockTopCountries,
};

// Get releases with optional limit
export function getReleases(limit = 4): { releases: Release[]; total: number } {
	const releases = mockReleases.slice(0, limit);
	return { releases, total: mockReleases.length };
}

// Get fan activity with optional limit
export function getFanActivity(limit = 10): { activities: FanActivity[] } {
	const activities = mockFanActivity.slice(0, limit);
	return { activities };
}

// Get engagement data
export function getEngagement(): EngagementData {
	return mockEngagementData;
}

// Product filtering and sorting
export function getProducts(options: {
	category?: string;
	sortBy?: "newest" | "revenue" | "sales";
	page?: number;
	limit?: number;
}): { products: Product[]; total: number; page: number; limit: number } {
	const { category, sortBy = "newest", page = 1, limit = 12 } = options;

	let filtered = [...mockProducts];

	// Filter by category
	if (category && category !== "all") {
		filtered = filtered.filter((p) => p.category === category);
	}

	// Sort
	switch (sortBy) {
		case "revenue":
			filtered.sort((a, b) => b.totalEarnings - a.totalEarnings);
			break;
		case "sales":
			filtered.sort((a, b) => b.unitsSold - a.unitsSold);
			break;
		case "newest":
		default:
			filtered.sort(
				(a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime()
			);
	}

	// Paginate
	const total = filtered.length;
	const start = (page - 1) * limit;
	const paginated = filtered.slice(start, start + limit);

	return {
		products: paginated,
		total,
		page,
		limit,
	};
}
