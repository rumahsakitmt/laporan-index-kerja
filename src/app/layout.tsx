import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/query-provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Session } from "@/lib/auth-client";
import { AuthProvider } from "@/provider/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

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
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Laporan Index Kerja",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="Laporan Index Kerja"
          />
          <link rel="apple-touch-icon" href="/images/logo_mateng.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Providers>
              <AuthProvider initialSession={session}>{children}</AuthProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
