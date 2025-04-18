import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { reportSchema } from "../schema";
import { db } from "@/db";
import { Report, Room, user } from "@/db/schema";
import type { Variables } from "@/app/api/[[...route]]/route";
import { desc, eq } from "drizzle-orm";

const app = new Hono<Variables>()
	.get("/", async (c) => {
		const reports = await db
			.select({
				id: Report.id,
				date: Report.date,
				room: {
					id: Room.id,
					name: Room.name,
				},
				time: Report.time,
				problem: Report.problem,
				needs: Report.needs,
				status: Report.status,
				user: {
					id: user.id,
					name: user.name,
				},
			})
			.from(Report)
			.orderBy(desc(Report.date))
			.leftJoin(user, eq(user.id, Report.userId))
			.leftJoin(Room, eq(Room.id, Report.roomId));
		return c.json(reports);
	})
	.post("/", zValidator("json", reportSchema), async (c) => {
		const user = c.var.user;
		const formData = c.req.valid("json");
		if (!user) {
			return c.json(
				{
					message: "Unauthorized",
				},
				500,
			);
		}

		await db.insert(Report).values({
			date: formData.date,
			time: formData.time,
			roomId: Number(formData.room),
			problem: formData.problem,
			needs: formData.needs,
			status: formData.status,
			notes: formData.notes,
			userId: user.id,
		});

		return c.json({
			message: "report added successfully.",
		});
	});

export default app;
