import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { stripe } from "@/lib/stripe";
import { type DataPayment } from "@prisma/client";

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
      const successUrl = "https://rainame.vercel.app/";
      const cancelUrl = `https://rainame.vercel.app/${path}`;
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
      const successUrl = "https://rainame.vercel.app/";
      const cancelUrl = `https://rainame.vercel.app/${input.path}`;
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
      const line_items = input.data.map((item) => {
        const res = item.totalPrice * 100;
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.name,
              images: item.imageUrl,
            },
            unit_amount: parseFloat(res.toFixed(2)),
          },
          quantity: item.totalProduct,
        };
      });
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
  getPaymentByUser: protectedProcedure.query(async ({ ctx }) => {
    const payments = await ctx.db.payment.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        dataPayment: true,
      },
    });

    return payments;
  }),
  getPayment: protectedProcedure.query(async ({ ctx }) => {
    const payment = await ctx.db.dataPayment.findMany({});
    const user = await ctx.db.user.findMany();
    // Calculate dates
    const currentDate: Date = new Date();
    const yesterday: Date = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastMonth: Date = new Date(currentDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastYear: Date = new Date(currentDate);
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    // Filter data based on dates
    const filterByDay = (date: Date) => (item: DataPayment) =>
      item.createdAt.getDay() === date.getDay();

    const daily: DataPayment[] = payment.filter(filterByDay(currentDate));
    const yesterdayData: DataPayment[] = payment.filter(filterByDay(yesterday));
    const prevanuallData = payment.filter(
      (item: DataPayment) =>
        item.createdAt.getFullYear() === lastYear.getFullYear(),
    );
    const annualData: DataPayment[] = payment.filter(
      (item: DataPayment) =>
        item.createdAt.getFullYear() === currentDate.getFullYear(),
    );
    const dataUserMonthly = user.filter(
      (item) => item.createdAt.getMonth() === currentDate.getMonth(),
    );
    const prevDatauser = user.filter(
      (item) => item.createdAt.getMonth() === lastMonth.getMonth(),
    );
    // Calculate total revenue
    const calculateTotalRevenue = (data: DataPayment[]) =>
      data.reduce((total, current) => total + current.totalPrice, 0);
    const totalRevenueYesterday: number = calculateTotalRevenue(yesterdayData);
    const totalRevenueDaily: number = calculateTotalRevenue(daily);
    const totalPrevAnual = calculateTotalRevenue(prevanuallData);
    const totalCurrentAnual = calculateTotalRevenue(annualData);
    console.log(totalCurrentAnual);
    // Calculate growth
    const calculateGrowth = (currentValue: number, previousValue: number) =>
      previousValue !== 0
        ? ((currentValue - previousValue) / previousValue) * 100
        : 0;

    const growDaily: number = calculateGrowth(
      totalRevenueDaily,
      totalRevenueYesterday,
    );

    const growUser = calculateGrowth(
      dataUserMonthly.length,
      prevDatauser.length,
    );

    const growAnual = calculateGrowth(totalCurrentAnual, totalPrevAnual);

    // Return the payment data
    return {
      growDaily,
      growAnual,
      growUser,
      totalRevenueDaily,
      totalCurrentAnual,
      dataUserMonthly,
    };
  }),
});
