import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
import report from "@/features/report/server/route";

const routes = app.route("/report", report);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
