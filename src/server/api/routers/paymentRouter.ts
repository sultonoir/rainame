import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { lineItems, payment } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const paymentRouter = createTRPCRouter({
  createPayment: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        amount: z.number(),
        price: z.number(),
        size: z.string(),
        cartId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const paymentUser = await ctx.db
        .insert(payment)
        .values({ userId: ctx.session.user.id })
        .returning({ id: payment.id });
      const paymentId = paymentUser.at(0)?.id;

      if (!paymentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error create payment",
        });
      }

      await ctx.db.insert(lineItems).values({
        paymentId,
        productId: input.productId,
        totalPrice: input.price,
        totlaProduct: input.amount,
        size: input.size,
      });
      return paymentId;
    }),
  paymentFromCart: protectedProcedure
    .input(
      z.object({
        id: z.array(z.string()),
        productId: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.query.cart.findMany({
        where: (q, { inArray }) => inArray(q.id, input.id),
      });

      const checkStock = await ctx.db.query.details.findMany({
        where: (q, { inArray, and, ne }) =>
          and(inArray(q.id, input.productId), ne(q.stock, 0)),
      });

      if (checkStock.length !== 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "there is a product that has been sold",
        });
      }

      const paymentUser = await ctx.db
        .insert(payment)
        .values({ userId: ctx.session.user.id })
        .returning({ id: payment.id });

      const paymentId = paymentUser.at(0)?.id;

      if (!paymentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Error create payment",
        });
      }

      const line_items = cart.map((item) => ({
        paymentId,
        productId: item.productId,
        totalPrice: item.totalPrice,
        totlaProduct: item.totalProduct,
        size: item.size,
      }));

      await ctx.db.insert(lineItems).values(line_items);
      return paymentId;
    }),
});
