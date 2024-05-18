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
});
