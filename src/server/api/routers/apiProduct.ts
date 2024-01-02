/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
          rattings: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
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
  getProductMeta: publicProcedure
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
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "product not found",
        });
      }
      return product;
    }),
  getSearch: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.name === "") {
        return null;
      }
      const products = await ctx.db.products.findMany({
        where: {
          name: {
            contains: input.name,
            mode: "insensitive",
          },
        },
      });
      return products;
    }),
  filterProduct: publicProcedure
    .input(
      z.object({
        min: z.string().optional(),
        max: z.string().optional(),
        category: z.string().optional(),
        subcategory: z.string().optional(),
        colors: z.string().optional(),
        size: z.string().optional(),
        page: z.string().optional(),
        take: z.string().optional(),
        discount: z.string().optional(),
        hot: z.string().optional(),
        promo: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input.colors) {
        where.color = {
          has: input.colors,
        };
      }
      if (input.min && input.max) {
        const minNumber = parseFloat(input.min);
        const maxNumber = parseFloat(input.max);

        if (!isNaN(minNumber)) {
          where.price = {
            gte: minNumber,
            lte: maxNumber,
          };
        }
      }
      if (input.category) {
        where.category = input.category;
      }
      if (input.subcategory) {
        where.subcategory = {
          contains: input.subcategory,
        };
      }

      if (input.size) {
        where.size = {
          has: input.size,
        };
      }

      if (input.discount === "true") {
        where.discount = {
          gte: 1,
        };
      }

      if (input.hot === "true") {
        where.selling = {
          gte: 10,
        };
      }

      if (input.promo) {
        console.log(input.promo);
        const name = decodeURIComponent(input.promo);
        const promo = await ctx.db.promo.findUnique({
          where: {
            name,
          },
        });

        if (!promo) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Promo not found",
          });
        }
        const products = await ctx.db.products.findMany({
          where: {
            promoId: promo.id,
          },
          include: {
            rattings: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return products;
      }

      const page = input.page ? parseFloat(input.page) : 1;
      const take = input.take ? parseFloat(input.take) : 50;
      const skip = (page - 1) * take;

      const products = await ctx.db.products.findMany({
        where,
        include: {
          rattings: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      });

      return products;
    }),
});
