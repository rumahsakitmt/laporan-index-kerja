import { z } from "zod";

export const userSchema = z.object({
	name: z.string(),
	image: z.string().optional(),
});

export type UserData = z.infer<typeof userSchema>;
