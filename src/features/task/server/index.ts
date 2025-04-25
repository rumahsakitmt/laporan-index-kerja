import { db } from "@/db";
import { Task } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { asc } from "drizzle-orm";
import { Hono } from "hono";
import { taskSchema } from "../schema";

const app = new Hono().get("/", async (c) => {
  const tasks = await db.select().from(Task).orderBy(
    asc(Task.name)
  )
  return c.json(tasks);
}).post("/", zValidator("json", taskSchema), async (c) => {
  const task = c.req.valid("json");
  const newTask = await db.insert(Task).values(task).returning();
  return c.json(newTask);
});

export default app;