import type { Variables } from "@/app/api/[[...route]]/route";
import { db } from "@/db";
import { Report, user } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { format } from "date-fns";
import { and, asc, eq, gte, lte } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

interface ReportCount {
	date: string;
	count: number;
}

const app = new Hono<Variables>()
	.get(
		"/users",
		zValidator(
			"query",
			z.object({
				role: z.string(),
			}),
		),
		async (c) => {
			const { role } = c.req.valid("query");
			const users = await db.select().from(user).where(eq(user.role, role));

			return c.json(users);
		},
	)
	.get(
		"/range",
		zValidator(
			"query",
			z.object({
				userId: z.string(),
				startDate: z.coerce.date(),
				endDate: z.coerce.date(),
			}),
		),
		async (c) => {
			const { userId, startDate, endDate } = c.req.valid("query");
			const userReports = await db
				.select()
				.from(Report)
				.where(
					and(
						eq(Report.userId, userId),
						gte(Report.date, startDate),
						lte(Report.date, endDate),
					),
				)
				.orderBy(asc(Report.date));

			const reportCounts: ReportCount[] = userReports.reduce<ReportCount[]>(
				(acc, report) => {
					const reportDate = report?.date
						? format(report.date ?? new Date(), "yyyy-MM-dd")
						: "";
					if (!reportDate) return acc;

					const existingEntry = acc.find((item) => item.date === reportDate);

					if (existingEntry) {
						existingEntry.count += 1;
					} else {
						acc.push({ date: reportDate, count: 1 });
					}

					return acc;
				},
				[],
			);

			return c.json(reportCounts);
		},
	);

export default app;
