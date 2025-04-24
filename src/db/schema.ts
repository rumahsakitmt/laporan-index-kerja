import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Report = sqliteTable("report", {
	id: int("id").primaryKey({ autoIncrement: true }),
	date: text("date").notNull(),
	time: text("time").notNull(),
	roomId: integer("room_id").references(() => Room.id, {
		onDelete: "set null",
	}),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "no action" }),
	taskId: integer("task_id").references(() => Task.id, {
		onDelete: "set null",
	}),
	problem: text("problem").notNull(),
	status: text("status").notNull(),
	needs: text("needs"),
	notes: text("notes"),
	createdAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

export type ReportType = typeof Report.$inferSelect;

export const reportRelations = relations(Report, ({ one }) => ({
	room: one(Room, {
		fields: [Report.roomId],
		references: [Room.id],
	}),
	user: one(user, {
		fields: [Report.userId],
		references: [user.id],
	}),
	task: one(Task, {
		fields: [Report.taskId],
		references: [Task.id],
	}),
}));

export const Room = sqliteTable("room", {
	id: int("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	createdAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

export type RoomType = typeof Room.$inferSelect;

export const RoomRelations = relations(Room, ({ many }) => ({
	reports: many(Report),
}));

export const Task = sqliteTable("task", {
	id: int("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	type: text("type").notNull(), // "main" | "additional"
	description: text("description"),
	createdAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const TaskRelations = relations(Task, ({ many }) => ({
	reports: many(Report),
}));

// Auth Schema

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	role: text("role"),
	banned: integer("banned", { mode: "boolean" }),
	banReason: text("ban_reason"),
	banExpires: integer("ban_expires", { mode: "timestamp" }),
});

export const userRelations = relations(user, ({ many }) => ({
	reports: many(Report),
}));

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	impersonatedBy: text("impersonated_by"),
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", {
		mode: "timestamp",
	}),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", {
		mode: "timestamp",
	}),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
});
