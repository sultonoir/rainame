import { z } from "zod";

export const SubcategoryInput = z.object({
  name: z.string(),
  categoryId: z.string(),
});

export type SubcategoryInput = z.infer<typeof SubcategoryInput>;

export const FindByCategoryIdInput = z.object({
  categoryId: z.string(),
});

export type FindByCategoryIdInput = z.infer<typeof FindByCategoryIdInput>;
