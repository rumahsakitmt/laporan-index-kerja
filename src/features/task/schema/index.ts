import { z } from "zod";

export const taskSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  type: z.string(),
})