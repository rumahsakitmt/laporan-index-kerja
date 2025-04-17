import type React from "react";

import MainNavigation from "@/components/main-nav";

export default function HomeLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="max-w-6xl mx-auto px-8">
			<MainNavigation />
			{children}
		</div>
	);
}
