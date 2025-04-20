import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/lib/auth";

import report from "@/features/report/server";
import room from "@/features/room/server";
import profile from "@/features/profile/server";

export type Variables = {
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
};

const app = new Hono<Variables>().basePath("/api");

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		return await next();
	}

	c.set("user", session.user);
	c.set("session", session.session);
	return await next();
});

const routes = app
	.route("/reports", report)
	.route("/rooms", room)
	.route("/profile", profile);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
