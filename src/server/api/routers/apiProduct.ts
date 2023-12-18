import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const apiProduct = createTRPCRouter({
  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2, {
          message: "name must be at least 2 characters",
        }),
        desc: z.string(),
        price: z.number(),
        stock: z.number().min(1, {
          message: "form has not been filled out",
        }),
        discount: z.number().max(100).optional().nullable(),
        subcategory: z.string(),
        imageUrl: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        color: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        category: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        size: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        desc,
        price,
        stock,
        discount,
        subcategory,
        imageUrl,
        color,
        category,
        size,
      } = input;

      const storeId = ctx.session.user.id;
      const path = name.replaceAll(/[^a-zA-Z0-9]/g, "-");
      if (!storeId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "please login" });
      }
      await ctx.db.products.create({
        data: {
          storeId,
          name,
          desc,
          price,
          stock,
          discount,
          subcategory,
          imageUrl,
          color,
          path,
          category,
          size,
        },
      });
    }),
  getAllProduct: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.products.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return products;
  }),
  getProductById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.products.findUnique({
        where: {
          id: input.id,
        },
      });
      return products;
    }),
  deleteByid: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.products.delete({
        where: {
          id: input.id,
          storeId: ctx.session.user.id,
        },
      });
    }),
  updateByid: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2, {
          message: "name must be at least 2 characters",
        }),
        desc: z.string(),
        price: z.number(),
        stock: z.number().min(1, {
          message: "form has not been filled out",
        }),
        discount: z.number().max(100).optional().nullable(),
        subcategory: z.string(),
        imageUrl: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        color: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        category: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        size: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        path: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.products.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  deleteAll: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.products.deleteMany({
        where: {
          id: { in: input.map((item) => item.id) },
          storeId: ctx.session.user.id,
        },
      });
    }),
});
