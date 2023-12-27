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
        imageUrl: z.array(z.string()),
        color: z.array(z.string()).min(1, {
          message: "form has not been filled out",
        }),
        category: z.string(),
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

      const userId = ctx.session.user.id;
      const path = name.replaceAll(/[^a-zA-Z0-9]/g, "-");
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "please login" });
      }
      await ctx.db.products.create({
        data: {
          userId,
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
        createdAt: "desc",
      },
      include: {
        rattings: true,
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
      const admin = ctx.session.user.role;
      if (admin !== "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must be an admin to delete a product",
        });
      }
      await ctx.db.products.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
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
        category: z.string(),
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
      const admin = ctx.session.user.role;
      if (admin !== "admin") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You must be an admin to delete a product",
        });
      }
      await ctx.db.products.deleteMany({
        where: {
          id: { in: input.map((item) => item.id) },
          userId: ctx.session.user.id,
        },
      });
    }),
  getProductBycategory: publicProcedure
    .input(
      z.object({
        category: z.string(),
        subcategory: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.products.findMany({
        where: {
          OR: [
            {
              category: {
                equals: input.category,
              },
              subcategory: {
                equals: input.subcategory,
              },
            },
            {
              category: {
                equals: input.subcategory,
              },
              subcategory: {
                equals: input.category,
              },
            },
          ],
        },
        include: {
          rattings: true,
        },
      });

      return products;
    }),
  getProductByName: publicProcedure
    .input(
      z.object({
        path: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.products.findUnique({
        where: {
          path: input.path,
        },
        include: {
          rattings: true,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "product not found",
        });
      }
      return product;
    }),
});
