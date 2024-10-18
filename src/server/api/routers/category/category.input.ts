import { z } from "zod";

export const CategoryInput = z.object({
  name: z.string(),
});

export type CategoryInput = z.infer<typeof CategoryInput>;
