import { relations, sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Report = sqliteTable("report", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: integer({ mode: "timestamp" }),
  time: text("time").notNull(),
  roomId: integer("room_id")
    .notNull()
    .references(() => Room.id, { onDelete: "set null" }),
  problem: text("problem").notNull(),
  status: text("status").notNull(),
  needs: text("needs"),
  notes: text("notes"),
  createdAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const reportRelations = relations(Report, ({ one }) => ({
  room: one(Room, {
    fields: [Report.roomId],
    references: [Room.id],
  }),
}));

export const Room = sqliteTable("room", {
  id: int("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  name: text("name").notNull(),
  createdAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const RoomRelations = relations(Room, ({ many }) => ({
  reports: many(Report),
}));
