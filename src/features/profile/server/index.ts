import type { Variables } from "@/app/api/[[...route]]/route";
import { db } from "@/db";
import { user } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const app = new Hono<Variables>()
	.get("/users", async (c) => {
		const profiles = await db.select().from(user).orderBy(asc(user.name));
		return c.json(profiles);
	})
	.get(
		"/users/:userId",
		zValidator(
			"param",
			z.object({
				userId: z.string(),
			}),
		),
		async (c) => {
			const { userId } = c.req.valid("param");
			const profiles = await db.select().from(user).where(eq(user.id, userId));

			if (profiles.length === 0) {
				return c.json(
					{
						message: "User not found",
					},
					404,
				);
			}

			return c.json(profiles[0]);
		},
	)
	.put(
		"/users/role/:userId",
		zValidator(
			"param",
			z.object({
				userId: z.string(),
			}),
		),
		zValidator(
			"json",
			z.object({
				role: z.string(),
			}),
		),
		async (c) => {
			const validForm = c.req.valid("json");
			const { userId } = c.req.valid("param");
			const currentUser = c.var.user;

			if (!currentUser || currentUser.role !== "admin") {
				return c.json(
					{
						message: "Unauthorized",
					},
					401,
				);
			}

			try {
				const updatedUser = await db
					.update(user)
					.set({ role: validForm.role })
					.where(eq(user.id, userId))
					.returning();

				if (updatedUser.length === 0) {
					return c.json(
						{
							message: "User not found.",
						},
						404,
					);
				}

				return c.json({
					message: "User role has been updated.",
				});
			} catch (error) {
				console.error("Failed to update user role:", error);
				return c.json(
					{
						message: "Failed to update user role.",
					},
					500,
				);
			}
		},
	)
	.put(
		"/users/:userId",
		zValidator(
			"param",
			z.object({
				userId: z.string(),
			}),
		),
		zValidator(
			"json",
			z.object({
				name: z.string(),
				image: z.string().optional(),
			}),
		),
		async (c) => {
			const validForm = c.req.valid("json");
			const { userId } = c.req.valid("param");
			const currentUser = c.var.user;

			if (!currentUser || currentUser.role !== "admin") {
				return c.json(
					{
						message: "Unauthorized",
					},
					401,
				);
			}

			try {
				const updatedUser = await db
					.update(user)
					.set({ name: validForm.name, image: validForm.image })
					.where(eq(user.id, userId))
					.returning();

				if (updatedUser.length === 0) {
					return c.json(
						{
							message: "User not found.",
						},
						404,
					);
				}

				return c.json({
					message: "User has been updated.",
				});
			} catch (error) {
				console.error("Failed to update user :", error);
				return c.json(
					{
						message: "Failed to update user.",
					},
					500,
				);
			}
		},
	);

export default app;
