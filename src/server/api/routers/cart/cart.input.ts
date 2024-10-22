import { z } from "zod";

export const CartInput = z.object({
  userId: z.string(),
  amount: z.number(),
  size: z.string(),
  productId: z.string(),
});

export type CartInput = z.infer<typeof CartInput>;

export const CartItemInput = z.object({
  cursor: z.string().optional(),
  limit: z.number(),
});

export type CartItemInput = z.infer<typeof CartItemInput>;
