import { z } from "zod";

export const addWishlistInput = z.object({
  productId: z.string(),
});

export type AddWishlistSchema = z.infer<typeof addWishlistInput>;
