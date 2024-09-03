import { generateId } from "lucia";
import { type ProtectedTRPCContext } from "../../trpc";
import { type AddWishlistSchema } from "./wishlist.input";

export const toggleWishlist = async (
  ctx: ProtectedTRPCContext,
  { productId }: AddWishlistSchema,
) => {
  const userId = ctx.user.id;
  const wishlist = await ctx.db.wishlist.findFirst({
    where: {
      productId,
      userId,
    },
  });

  if (!wishlist) {
    await ctx.db.wishlist.create({
      data: {
        id: generateId(10),
        userId,
        productId,
      },
    });
    return true; // added to wishlist
  } else {
    await ctx.db.wishlist.delete({
      where: {
        id: wishlist.id,
      },
    });
    return false; // removed from wishlist
  }
};
