import { z } from "zod";

export const roomSchema = z.object({
	name: z.string().min(2, "Nama ruangan minimal 2 karakter."),
});

export type roomData = z.infer<typeof roomSchema>;
