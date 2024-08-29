import { z } from "zod";

export const getUserSchema = z.object({
  id: z.string(),
});

export type GetUserInput = z.infer<typeof getUserSchema>;
