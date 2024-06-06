import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { cart, details, lineItems, notifi, payment } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq, inArray, sql } from "drizzle-orm";

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
        totalProduct: input.amount,
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
        cartId: item.id,
      }));

      await ctx.db.insert(lineItems).values(line_items);
      return paymentId;
    }),
  getPayment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.payment.findFirst({
        where: (q, { eq }) => eq(q.id, input.id),
        with: {
          items: {
            orderBy: (comments, { asc }) => [asc(comments.createdAt)],
            with: {
              product: {
                with: {
                  imageUrl: {
                    limit: 1,
                  },
                },
              },
            },
          },
        },
      });
      return result;
    }),
  calcelPayment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(payment)
        .set({ status: "cancel" })
        .where(
          and(
            eq(payment.id, input.id),
            eq(payment.userId, ctx.session.user.id),
          ),
        );
    }),
  paidPayment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const findPayment = await ctx.db.query.payment.findFirst({
        where: (q, { eq }) => eq(q.id, input.id),
        with: {
          items: {
            with: {
              product: true,
            },
          },
        },
      });

      if (!findPayment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Payment notfound",
        });
      }

      //get cart id and delete from cart
      const cartId = findPayment.items.flatMap((item) => {
        if (!item.cartId) {
          return []; // Return an empty array if there is no cartId
        }
        return [item.cartId]; // Return an array with the cartId
      });

      if (cartId.length !== 0) {
        await ctx.db.delete(cart).where(inArray(cart.id, cartId));
      }

      //decrement stock
      await Promise.all(
        findPayment.items.map((item) =>
          ctx.db
            .update(details)
            .set({ stock: sql`${details.stock} - ${item.totalProduct}` })
            .where(eq(details.productId, item.productId)),
        ),
      );

      //update payment to paid
      await ctx.db
        .update(payment)
        .set({ status: "paid" })
        .where(eq(payment.id, findPayment.id));

      await ctx.db.insert(notifi).values({
        title: "Successful purchases",
        details:
          "Thank you for your purchase, we will deliver the goods immediately.",
        userId: ctx.session.user.id,
        category: "payment",
        paymentId: input.id,
      });
      const admin = await ctx.db.query.users.findFirst({
        where: (q, { eq }) => eq(q.role, "admin"),
      });

      await ctx.db.insert(notifi).values({
        title: "New order received",
        details: "New order received",
        userId: admin?.id,
        category: "payment",
        paymentId: input.id,
      });
    }),
});
