import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { queryReport, reportSchema } from "../schema";
import { db } from "@/db";
import { Report, Room, user } from "@/db/schema";
import type { Variables } from "@/app/api/[[...route]]/route";
import { and, desc, eq, sql, type SQL } from "drizzle-orm";
import { z } from "zod";

const app = new Hono<Variables>()
	.get("/", zValidator("query", queryReport), async (c) => {
		const query = c.req.valid("query");

		const conditions: SQL<unknown>[] = [];

		if (query.userId) {
			conditions.push(eq(Report.userId, query.userId));
		}

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
				notes: Report.notes,
				user: {
					id: user.id,
					name: user.name,
				},
			})
			.from(Report)
			.orderBy(desc(Report.date))
			.leftJoin(user, eq(user.id, Report.userId))
			.leftJoin(Room, eq(Room.id, Report.roomId))
			.where(conditions.length > 0 ? and(...conditions) : sql`1=1`);

		return c.json(reports);
	})
	.get(
		"/:reportId",
		zValidator(
			"param",
			z.object({
				reportId: z.coerce.number(),
			}),
		),
		async (c) => {
			const { reportId } = c.req.valid("param");

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
					notes: Report.notes,
					user: {
						id: user.id,
						name: user.name,
					},
				})
				.from(Report)
				.orderBy(desc(Report.date))
				.leftJoin(user, eq(user.id, Report.userId))
				.leftJoin(Room, eq(Room.id, Report.roomId))
				.where(eq(Report.id, reportId))
				.limit(1);

			return c.json(reports[0]);
		},
	)
	.post("/", zValidator("json", reportSchema), async (c) => {
		const user = c.var.user;
		if (!user) {
			return c.json(
				{
					message: "Unauthorized",
				},
				401,
			);
		}

		const formData = c.req.valid("json");

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
	})
	.put(
		"/:reportId",
		zValidator(
			"param",
			z.object({
				reportId: z.coerce.number(),
			}),
		),
		zValidator("json", reportSchema),
		async (c) => {
			const user = c.var.user;
			if (!user) {
				return c.json({ message: "Unauthorized" }, 401);
			}

			const { reportId } = c.req.valid("param");
			const formData = c.req.valid("json");

			try {
				const currentReport = await db
					.select({
						id: Report.id,
						userId: Report.userId,
					})
					.from(Report)
					.where(eq(Report.id, reportId))
					.limit(1);

				if (currentReport.length === 0) {
					return c.json({ message: "Report not found" }, 404);
				}

				if (currentReport[0].userId !== user.id) {
					return c.json(
						{ message: "Not authorized to modify this report" },
						403,
					);
				}

				const result = await db
					.update(Report)
					.set({
						date: formData.date,
						time: formData.time,
						roomId: Number(formData.room),
						problem: formData.problem,
						needs: formData.needs,
						status: formData.status,
						notes: formData.notes,
						userId: user.id,
					})
					.where(eq(Report.id, reportId))
					.returning({ id: Report.id });

				if (result.length === 0) {
					return c.json({ message: "Update failed" }, 500);
				}

				return c.json({ message: "Report updated successfully" });
			} catch (error) {
				console.error("Error updating report:", error);
				return c.json({ message: "Error updating report" }, 500);
			}
		},
	)
	.delete(
		"/:reportId",
		zValidator(
			"param",
			z.object({
				reportId: z.coerce.number(),
			}),
		),
		async (c) => {
			const { reportId } = c.req.valid("param");
			const user = c.var.user;
			if (!user) {
				return c.json(
					{
						message: "Unauthorized",
					},
					401,
				);
			}

			try {
				const currentReport = await db
					.select({
						id: Report.id,
						userId: Report.userId,
					})
					.from(Report)
					.where(eq(Report.id, reportId))
					.limit(1);

				if (currentReport.length === 0) {
					return c.json({ message: "Report not found" }, 404);
				}

				if (currentReport[0].userId !== user.id) {
					return c.json(
						{ message: "Not authorized to modify this report" },
						403,
					);
				}

				await db.delete(Report).where(eq(Report.id, reportId));

				return c.json({ message: "Report successfully deleted" });
			} catch (error) {
				console.error("Error deleting report:", error);
				return c.json({ message: "Error deleting report" }, 500);
			}
		},
	);

export default app;
