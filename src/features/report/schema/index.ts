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

export type reportData = z.infer<typeof reportSchema>;
