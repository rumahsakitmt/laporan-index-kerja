import { db } from "@/db";
import { Room } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { roomSchema } from "../schema";

const app = new Hono()
	.get("/", async (c) => {
		const rooms = await db.select().from(Room).orderBy(asc(Room.name));
		return c.json(rooms);
	})
	.post("/", zValidator("json", roomSchema), async (c) => {
		const form = c.req.valid("json");

		const isRoomExist = await db
			.select()
			.from(Room)
			.where(eq(Room.name, form.name));

		if (isRoomExist.length === 1) {
			return c.json(
				{
					message: "Room already exist",
				},
				401,
			);
		}

		const room = await db.insert(Room).values(form).returning();

		return c.json(room);
	});

export default app;
