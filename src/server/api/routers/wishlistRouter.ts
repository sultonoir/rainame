import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { wishlist } from "@/server/db/schema";

export const wishlistRouter = createTRPCRouter({
  isWishlist: publicProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const wishlist = await ctx.db.query.wishlist.findMany({
        where: (q, { eq }) => eq(q.userId, userId ?? ""),
      });

      const result = wishlist.some(
        (item) => item.productId === input.productId,
      );
      return result;
    }),
  toggleWishlist: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const mywishlist = await ctx.db.query.wishlist.findFirst({
        where: (q, { eq, and }) =>
          and(eq(q.productId, input.productId), eq(q.userId, userId)),
      });

      if (mywishlist) {
        await ctx.db
          .delete(wishlist)
          .where(
            and(
              eq(wishlist.productId, input.productId),
              eq(wishlist.userId, userId),
            ),
          );
        return "Wishlist deleted";
      }

      await ctx.db
        .insert(wishlist)
        .values({ productId: input.productId, userId });
      return "Add to wishlist";
    }),
});
