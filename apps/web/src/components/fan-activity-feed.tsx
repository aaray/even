"use client";

import { useFanActivity } from "@/hooks/use-api";
import { formatRelativeTime } from "@even/shared";
import type { FanActivity } from "@even/shared";
import { Avatar, AvatarFallback, AvatarImage, Badge, Skeleton } from "@even/ui";
import { motion } from "framer-motion";
import { MessageCircle, Play, Share2, ShoppingCart, UserPlus } from "lucide-react";

const activityIcons = {
	purchase: ShoppingCart,
	stream: Play,
	share: Share2,
	follow: UserPlus,
	comment: MessageCircle,
};

const activityColors = {
	purchase: "bg-green-500/20 text-green-300",
	stream: "bg-blue-500/20 text-blue-300",
	share: "bg-purple-500/20 text-purple-300",
	follow: "bg-orange-500/20 text-orange-300",
	comment: "bg-pink-500/20 text-pink-300",
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.05 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0 },
};

export function FanActivityFeed() {
	const { data, isLoading } = useFanActivity(6);

	if (isLoading) return <FanActivitySkeleton />;

	const activities = data?.activities ?? [];

	return (
		<div className="glass-card p-4" data-testid="fan-activity-feed">
			<h3 className="font-semibold mb-4">Recent Fan Activity</h3>
			{activities.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
					<MessageCircle className="h-8 w-8 mb-2 opacity-50" />
					<p className="text-sm">No recent activity</p>
				</div>
			) : (
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="space-y-3 max-h-[300px] overflow-y-auto"
				>
					{activities.map((activity) => (
						<FanActivityItem key={activity.id} activity={activity} />
					))}
				</motion.div>
			)}
		</div>
	);
}

function FanActivityItem({ activity }: { activity: FanActivity }) {
	const Icon = activityIcons[activity.type];

	return (
		<motion.div
			variants={itemVariants}
			className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
			data-testid="activity-item"
		>
			<Avatar className="h-10 w-10">
				<AvatarImage src={activity.avatar} alt={activity.user} />
				<AvatarFallback>{activity.user[0]}</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<p className="text-sm">
					<span className="font-medium">{activity.user}</span>{" "}
					<span className="text-muted-foreground">{activity.action}</span>
				</p>
				<p className="text-xs text-muted-foreground">{formatRelativeTime(activity.timestamp)}</p>
			</div>
			<Badge className={activityColors[activity.type]}>
				<Icon className="h-3 w-3" />
			</Badge>
		</motion.div>
	);
}

function FanActivitySkeleton() {
	return (
		<div className="glass-card p-4" data-testid="fan-activity-feed">
			<Skeleton className="h-6 w-40 mb-4" />
			<div className="space-y-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="flex items-center gap-3 p-2 animate-pulse">
						<Skeleton className="h-10 w-10 rounded-full" />
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-1/4" />
						</div>
						<Skeleton className="h-6 w-6 rounded" />
					</div>
				))}
			</div>
		</div>
	);
}
