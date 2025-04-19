import { db } from "@/db";
import { Report, type ReportType, Room } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { roomSchema } from "../schema";
import type { Variables } from "@/app/api/[[...route]]/route";
import { z } from "zod";

interface GroupedRoom {
	id: number;
	name: string;
	reports: ReportType[];
}

const app = new Hono<Variables>()
	.get("/", async (c) => {
		const roomsWithReports = await db
			.select({
				id: Room.id,
				name: Room.name,
				reports: Report,
			})
			.from(Room)
			.leftJoin(Report, eq(Room.id, Report.roomId))
			.orderBy(asc(Room.name));

		const groupedRooms: GroupedRoom[] = roomsWithReports.reduce(
			(acc: GroupedRoom[], item) => {
				const existingRoom = acc.find((room) => room.id === item.id);

				if (existingRoom) {
					if (item.reports) {
						existingRoom.reports.push(item.reports);
					}
				} else {
					acc.push({
						id: item.id,
						name: item.name,
						reports: item.reports ? [item.reports] : [],
					});
				}

				return acc;
			},
			[],
		);

		return c.json(groupedRooms);
	})
	.get(
		"/:roomId",
		zValidator(
			"param",
			z.object({
				roomId: z.coerce.number(),
			}),
		),
		async (c) => {
			const { roomId } = c.req.valid("param");

			const roomsWithReports = await db
				.select({
					id: Room.id,
					name: Room.name,
					reports: Report,
				})
				.from(Room)
				.leftJoin(Report, eq(Room.id, Report.roomId))
				.where(eq(Room.id, roomId));

			const groupedRooms: GroupedRoom[] = roomsWithReports.reduce(
				(acc: GroupedRoom[], item) => {
					const existingRoom = acc.find((room) => room.id === item.id);

					if (existingRoom) {
						if (item.reports) {
							existingRoom.reports.push(item.reports);
						}
					} else {
						acc.push({
							id: item.id,
							name: item.name,
							reports: item.reports ? [item.reports] : [],
						});
					}

					return acc;
				},
				[],
			);

			return c.json(groupedRooms[0]);
		},
	)
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
	})
	.put(
		"/",
		zValidator("json",z.object({
			name: z.string(),
			roomId: z.number()
		})),
		async (c) => {
			const validForm = c.req.valid("json");


			const user = c.var.user;

			if (!user) {
				return c.json(
					{
						message: "Unauthorized",
					},
					401,
				);
			}

			const updatedRoom = await db
				.update(Room)
				.set({
					name: validForm.name,
				})
				.where(eq(Room.id, +validForm.roomId)).returning({ id: Room.id});


				if(updatedRoom.length === 0) {
					return c.json({
						message: "Room not found"
					}, 404)
				}

			return c.json({
				message: "Room edited successfully.",
			});
		},
	)
	.delete(
		"/:roomId",
		zValidator(
			"param",
			z.object({
				roomId: z.coerce.number(),
			}),
		),
		async (c) => {
			const { roomId } = c.req.valid("param");

			const user = c.var.user;

			if (!user) {
				return c.json(
					{
						message: "Unauthorized",
					},
					401,
				);
			}

			await db.delete(Room).where(eq(Room.id, roomId));

			return c.json({
				message: "Room deleted.",
			});
		},
	);

export default app;
