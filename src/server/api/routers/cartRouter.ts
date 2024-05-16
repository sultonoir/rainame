import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { cart } from "@/server/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const cartRouter = createTRPCRouter({
  createCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        totalPrice: z.number(),
        size: z.string(),
        totalProduct: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role === "admin";
      if (admin) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Admin can't do this",
        });
      }

      const exist = await ctx.db.query.cart.findMany({
        where: (q, { eq, and }) =>
          and(
            eq(q.productId, input.productId),
            eq(q.size, input.size),
            eq(q.userId, ctx.session.user.id),
          ),
      });
      if (exist.length > 0) {
        await ctx.db
          .update(cart)
          .set({
            totalProduct: sql`${cart.totalProduct} + ${input.totalProduct}`,
          })
          .where(
            and(eq(cart.productId, input.productId), eq(cart.size, input.size)),
          );
        return;
      }

      try {
        await ctx.db.insert(cart).values({
          productId: input.productId,
          size: input.size,
          totalPrice: input.totalPrice,
          totalProduct: input.totalProduct,
          userId: ctx.session.user.id,
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error add to cart",
          });
        }
      }
    }),
  getIndicator: protectedProcedure.query(async ({ ctx }) => {
    const product = await ctx.db.query.cart.findMany({
      where: (q, { eq }) => eq(q.userId, ctx.session.user.id),
    });
    const result = product.reduce((acc, cur) => acc + cur.totalProduct, 0);
    return result;
  }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.cart.findMany({
      where: (q, { eq }) => eq(q.userId, ctx.session.user.id),
      with: {
        product: {
          with: {
            imageUrl: {
              limit: 1,
            },
          },
        },
      },
    });

    return result;
  }),
  removeFromCart: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(cart).where(eq(cart.id, input.id));
    }),
});
