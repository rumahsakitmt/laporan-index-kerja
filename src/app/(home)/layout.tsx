import type React from "react";

import MainNavigation from "@/components/main-nav";
import { Toaster } from "@/components/ui/sonner";
import SheetProvider from "@/provider/sheet-provider";

export default function HomeLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="max-w-6xl mx-auto px-8">
			<MainNavigation />
			{children}
			<SheetProvider />
			<Toaster position="top-center" duration={1500} />
		</div>
	);
}
