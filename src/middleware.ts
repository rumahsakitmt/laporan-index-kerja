import { type NextRequest, NextResponse } from "next/server";
import { allowedRole } from "./lib/utils";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "./lib/auth-client";

// Cache session responses to reduce redundant API calls
const SESSION_CACHE = new Map<
	string,
	{ session: Session | null; timestamp: number }
>();
const CACHE_TTL = 30 * 1000; // 30 seconds cache validity

export async function middleware(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const homeUrl = new URL("/", requestUrl.origin);
	const cookies = request.headers.get("cookie") || "";

	// Check for cached session
	const cacheKey = cookies;
	const cachedData = SESSION_CACHE.get(cacheKey);
	const now = Date.now();

	let session: Session | null = null;

	// Use cached session if valid
	if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
		session = cachedData.session;
	} else {
		// Fetch new session data
		try {
			const { data: fetchedSession } = await betterFetch<Session>(
				"/api/auth/get-session",
				{
					baseURL: requestUrl.origin,
					headers: { cookie: cookies },
				},
			);

			session = fetchedSession;

			// Cache the result
			SESSION_CACHE.set(cacheKey, {
				session: fetchedSession,
				timestamp: now,
			});
		} catch (error) {
			console.error("Session fetch error:", error);
			return NextResponse.redirect(homeUrl);
		}
	}

	// Redirect to home if no session
	if (!session) {
		return NextResponse.redirect(homeUrl);
	}

	// Redirect if user role is not allowed
	if (!allowedRole(session.user.role ?? "")) {
		return NextResponse.redirect(homeUrl);
	}

	// Check if user is trying to access their own reports
	if (requestUrl.pathname.startsWith("/laporan/")) {
		// Extract userId from the URL
		const urlParts = requestUrl.pathname.split("/");
		if (urlParts.length >= 3) {
			const requestedUserId = urlParts[2];

			// If userId in URL doesn't match the logged-in userId, redirect to home
			if (requestedUserId && requestedUserId !== session.user.id) {
				return NextResponse.redirect(homeUrl);
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/laporan/:path*", "/ruangan"],
};
