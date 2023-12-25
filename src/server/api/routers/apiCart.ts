import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const apiCart = createTRPCRouter({
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const admin = ctx.session.user.role;
      if (admin === "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "admin cant do this",
        });
      }
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const cart = [...(user.cart || [])];
      if (cart.includes(user.id)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Store has been Followed",
        });
      } else {
        cart.push(productId);
        await ctx.db.user.update({
          where: {
            id: user.id,
          },
          data: {
            cart,
          },
        });
      }
    }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const products = await ctx.db.products.findMany({
      where: {
        id: { in: user.cart.map((item) => item) },
      },
    });
    return { user, products };
  }),
});
