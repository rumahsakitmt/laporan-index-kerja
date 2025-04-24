import { z } from "zod";

export const reportSchema = z.object({
	date: z.coerce.date(),
	time: z.string(),
	room: z.string(),
	problem: z.string(),
	needs: z.string(),
	status: z.string(),
	notes: z.string().optional(),
});

export const queryReport = z.object({
	userId: z.string().optional(),
	q: z.string().optional(),
	date: z.coerce.date().optional(),
	dateFrom: z.coerce
		.date()
		.default(() => {
			const now = new Date();
			return new Date(now.getFullYear(), now.getMonth(), 1);
		})
		.optional(),
	dateTo: z.coerce
		.date()
		.default(() => {
			const now = new Date();
			return new Date(now.getFullYear(), now.getMonth() + 1, 0);
		})
		.optional(),
	status: z.string().optional(),
	roomId: z.string().optional(),
	limit: z.coerce.number().default(10),
	page: z.coerce.number().default(1),
});

export type reportData = z.infer<typeof reportSchema>;
