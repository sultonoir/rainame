import { Prisma } from "prisma";
import z from "zod";
import { cartItemSelect } from "./cart.select";
import { Media } from "../media/media.types";

export const inputAddtoCart = z.object({
  productId: z.string(),
  size: z.string(),
  quantity: z.number(),
});

export type InputAddTocart = z.infer<typeof inputAddtoCart> & {
  cartId: string;
};

export type CartItemRaw = Prisma.CartItemGetPayload<{
  select: typeof cartItemSelect;
}>;

export type CartItemDto = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  size: string;
  image: Media;
};

export const inputUpdateQuantity = z.object({
  itemId: z.string(),
  quantity: z.number(),
});

export type InputUpdateQuantity = z.infer<typeof inputUpdateQuantity> & {
  cartId: string;
};

export const inputRemoveCartItem = z.object({
  itemId: z.string(),
});
