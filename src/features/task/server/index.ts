import { db } from "@/db";
import { Task } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const tasks = await db.select().from(Task).orderBy(
    asc(Task.name)
  )
  return c.json(tasks)
});

export default app;