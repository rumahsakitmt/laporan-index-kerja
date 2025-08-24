import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { db } from "@/db";
import { Report, user } from "@/db/schema";
import type { Variables } from "@/app/api/[[...route]]/route";
import { and, desc, eq, gte, lte, sql, count, asc } from "drizzle-orm";
import { z } from "zod";

interface ReportCount {
  date: string;
  count: number;
  reportIds: number[];
}

const app = new Hono<Variables>()
  .get(
    "/users",
    zValidator(
      "query",
      z.object({
        role: z.string(),
      })
    ),
    async (c) => {
      const { role } = c.req.valid("query");
      const users = await db.select().from(user).where(eq(user.role, role));

      return c.json(users);
    }
  )
  .get(
    "/user-reports",
    zValidator(
      "query",
      z.object({
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
      })
    ),
    async (c) => {
      const { startDate, endDate } = c.req.valid("query");

      const conditions = [];

      if (startDate && endDate) {
        conditions.push(
          and(
            gte(Report.date, new Date(startDate).toISOString().split("T")[0]),
            lte(Report.date, new Date(endDate).toISOString().split("T")[0])
          )
        );
      }

      const whereCondition =
        conditions.length > 0 ? and(...conditions) : undefined;

      const userReportCounts = await db
        .select({
          userId: user.id,
          userName: user.name,
          reportCount: count(Report.id),
        })
        .from(user)
        .leftJoin(Report, eq(user.id, Report.userId))
        .where(whereCondition)
        .groupBy(user.id, user.name)
        .orderBy(desc(count(Report.id)));

      return c.json(userReportCounts);
    }
  )
  .get(
    "/range",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
      })
    ),
    async (c) => {
      const { userId, startDate, endDate } = c.req.valid("query");
      const userReports = await db
        .select()
        .from(Report)
        .where(
          and(
            eq(Report.userId, userId),
            gte(Report.date, new Date(startDate).toISOString().split("T")[0]),
            lte(
              Report.date,
              new Date(endDate).toISOString().split("T")[0] ?? ""
            )
          )
        )
        .orderBy(asc(Report.date));

      const reportCounts: ReportCount[] = userReports.reduce<ReportCount[]>(
        (acc, report) => {
          const reportDate = report?.date
            ? new Date(report.date).toISOString().split("T")[0]
            : "";
          if (!reportDate) return acc;

          const existingEntry = acc.find((item) => item.date === reportDate);

          if (existingEntry) {
            existingEntry.count += 1;
            existingEntry.reportIds.push(report.id);
          } else {
            acc.push({
              date: reportDate,
              count: 1,
              reportIds: [report.id],
            });
          }

          return acc;
        },
        []
      );

      return c.json(reportCounts);
    }
  );

export default app;
