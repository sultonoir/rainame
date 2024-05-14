import { z } from "zod";
import slugify from "slugify";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { product, imageProduct, details } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  filterProduct: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        size: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.product.findMany({
        with: {
          imageUrl: {
            limit: 1,
          },
          details: {
            where: (q, { or, eq, isNotNull }) =>
              or(eq(q.sizeId, input.size ?? ""), isNotNull(q.sizeId)),
          },
        },
        where: (q, { or, isNotNull, eq }) =>
          or(eq(q.categoryId, input.category ?? ""), isNotNull(q.categoryId)),
      });
      return result;
    }),
  createProduct: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2, {
          message: "Title must be at least 2 characters.",
        }),
        desc: z.string().min(1, { message: "Required" }),
        price: z.string(),
        stocks: z
          .array(
            z.object({
              stock: z.string().min(1, { message: "Required" }),
              size: z.string().min(1, { message: "Required" }),
            }),
          )
          .min(1, { message: "Required" }),
        category: z.string().min(1, { message: "Required" }),
        subCategory: z.string().min(1, { message: "Required" }),
        discount: z.string().optional(),
        images: z.array(
          z.object({
            url: z.string(),
            blur: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.title, {
        lower: true,
      });
      const discount = parseInt(input.discount ?? "0");
      const products = await ctx.db
        .insert(product)
        .values({
          title: input.title,
          slug,
          desc: input.desc,
          categoryId: input.category,
          subCategoryId: input.subCategory,
          discount,
          price: parseFloat(input.price),
          userId: ctx.session.user.id,
        })
        .returning({ id: product.id, slug: product.slug });

      const id = products[0]!.id;

      if (products.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "error create product",
        });
      }

      const images = input.images.map((item) => ({
        productId: id,
        url: item.url,
        blur: item.blur,
      }));

      const createImage = await ctx.db
        .insert(imageProduct)
        .values(images)
        .returning({ id: imageProduct.id });

      if (createImage.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "error create product image",
        });
      }

      const productDetail = input.stocks.map((item) => ({
        sizeId: item.size,
        productId: id,
        stock: parseInt(item.stock),
      }));

      await ctx.db.insert(details).values(productDetail);

      const slugs = products[0]!.slug;
      return {
        id: slugs,
        message: "Product created",
      };
    }),
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.product.findFirst({
        where: (q, { eq }) => eq(q.slug, input.id),
        with: {
          category: true,
          subCategory: true,
          imageUrl: true,
          ratings: true,
          details: {
            with: {
              sizes: true,
            },
          },
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const totalrating = result?.ratings.reduce(
        (acc, cure) => acc + cure.value,
        0,
      );
      const newResult = {
        ...result,
        ratings: totalrating,
      };
      return newResult;
    }),
  getAllproducts: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.product.findMany({
      with: {
        details: true,
        imageUrl: {
          limit: 1,
        },
      },
    });
    return result;
  }),
  getProductsByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.product.findMany({
        where: (q, { inArray }) => inArray(q.id, input.ids),
        with: {
          imageUrl: {
            limit: 1,
          },
          details: true,
        },
      });
      return result;
    }),
});
