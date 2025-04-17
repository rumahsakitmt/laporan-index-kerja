import { z } from "zod";

export const roomSchema = z.object({
	name: z.string().min(4, "Nama ruangan minimal 4 karakter."),
});

export type roomData = z.infer<typeof roomSchema>;
