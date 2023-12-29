import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

export const apiCart = createTRPCRouter({
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role;
      const cart = await ctx.db.cart.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      if (admin === "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "admin cant do this",
        });
      }
      if (cart.some((item) => item.productId === input.productId)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "product is already in the cart",
        });
      }
      await ctx.db.cart.create({
        data: {
          userId: ctx.session.user.id,
          productId: input.productId,
        },
      });
    }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const cart = await ctx.db.cart.findMany({
      where: {
        userId: {
          equals: ctx.session.user.id,
        },
      },
      include: {
        products: true,
      },
    });

    return cart;
  }),
  deleteCart: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.cart.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  productPayment: protectedProcedure
    .input(
      z.object({
        totalPrice: z.number(),
        totalProduct: z.number(),
        name: z.string(),
        color: z.string(),
        productId: z.string(),
        size: z.string(),
        path: z.string(),
        imageUrl: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        productId,
        totalPrice,
        totalProduct,
        path,
        color,
        name,
        size,
        imageUrl,
      } = input;
      const successUrl = absoluteUrl("/");
      const cancelUrl = absoluteUrl(path);
      const userId = ctx.session.user.id;
      const admin = ctx.session.user.role;

      if (admin === "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "admin can't buy this",
        });
      }

      const payment = await ctx.db.payment.create({
        data: {
          dataPayment: {
            create: {
              productId,
              color,
              totalProduct,
              totalPrice,
              size,
              imageUrl,
              name,
            },
          },
          userId,
        },
      });

      const paymentId = payment.id;
      const paymentSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: input.name,
                images: input.imageUrl,
              },
              unit_amount: totalPrice * 100,
            },
            quantity: totalProduct,
          },
        ],
        metadata: {
          userId,
          paymentId,
        },
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      if (!paymentSession) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "error create payment",
        });
      }
      return paymentSession.url;
    }),
  cartPayment: protectedProcedure
    .input(
      z.object({
        path: z.string(),
        data: z.array(
          z.object({
            productId: z.string(),
            name: z.string(),
            imageUrl: z.array(z.string()),
            totalProduct: z.number(),
            totalPrice: z.number(),
            size: z.string().optional(),
            color: z.string().optional(),
            cartId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const successUrl = absoluteUrl("/");
      const cancelUrl = absoluteUrl(input.path);
      const userId = ctx.session.user.id;
      const payment = await ctx.db.payment.create({
        data: {
          dataPayment: {
            create: input.data,
          },
          userId,
        },
      });
      const paymentId = payment.id;
      const line_items = input.data.map((item) => ({
        price_data: {
          currency: "USD",
          product_data: {
            name: item.name,
            images: item.imageUrl,
          },
          unit_amount: item.totalPrice * 100,
        },
        quantity: item.totalProduct,
      }));
      const sessionPayment = await stripe.checkout.sessions.create({
        line_items,
        metadata: {
          userId,
          paymentId,
        },
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      if (!sessionPayment) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "error create payment",
        });
      }
      return sessionPayment.url;
    }),
  testHit: protectedProcedure.query(async () => {
    const num = 1;
    const count = 1 + num;
    return count;
  }),
});
