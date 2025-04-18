import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/query-provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Session } from "@/lib/auth-client";
import { AuthProvider } from "@/provider/auth-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Laporan Index Kerja",
	description: "Laporan Index Kerja RSUD Mamuju Tengah",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = (await auth.api.getSession({
		headers: await headers(),
	})) as Session | null;

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<AuthProvider initialSession={session}>{children}</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
