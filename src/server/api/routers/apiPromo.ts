import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const apiPromo = createTRPCRouter({
  createPromo: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2, {
          message: "name must be at least 2 characters",
        }),
        imageUrl: z.string(),
        discount: z.number().optional(),
        products: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            path: z.string(),
            desc: z.string(),
            imageUrl: z.array(z.string()),
            size: z.array(z.string()),
            color: z.array(z.string()),
            price: z.number(),
            discount: z.number().nullable(),
            subcategory: z.string(),
            stock: z.number(),
            selling: z.number(),
            category: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            userId: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.products.map((item) => item.id);
      const promo = await ctx.db.promo.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
        },
      });
      await ctx.db.products.updateMany({
        where: {
          id: { in: id },
        },
        data: {
          discount: input.discount,
          promoId: promo.id,
        },
      });
    }),
  getPromo: publicProcedure.query(async ({ ctx }) => {
    const promo = await ctx.db.promo.findMany();
    return promo;
  }),
  getPromoAndProduct: publicProcedure.query(async ({ ctx }) => {
    const promo = await ctx.db.promo.findMany({});
    return promo;
  }),
  deletePromo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const promo = await ctx.db.promo.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!promo) {
        throw new TRPCError({ code: "NOT_FOUND", message: "promo not found" });
      }

      await ctx.db.products.updateMany({
        where: {
          promoId: promo.id,
        },
        data: {
          discount: null,
        },
      });

      await ctx.db.promo.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
