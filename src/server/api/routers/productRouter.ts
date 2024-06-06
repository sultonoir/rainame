import { z } from "zod";
import slugify from "slugify";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { product, imageProduct, details } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { stringToNumber } from "@/lib/stringtonumber";
import { between, ilike, inArray, or, sql } from "drizzle-orm";

export const productRouter = createTRPCRouter({
  filterProduct: publicProcedure
    .input(
      z.object({
        category: z.array(z.string()).optional(),
        subCategory: z.array(z.string()).optional(),
        size: z.string().optional(),
        title: z.string().optional(),
        min: z.string().optional(),
        max: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const max = input.max ? stringToNumber(input.max) : undefined;
      const min = input.min ? stringToNumber(input.min) : undefined;
      const categoryCondition =
        input.category && input.category.length > 0
          ? inArray(product.categoryId, input.category)
          : undefined;
      const subCategoryCondition =
        input.subCategory && input.subCategory.length > 0
          ? inArray(product.subCategoryId, input.subCategory)
          : undefined;
      const titleCondition = input.title
        ? ilike(product.title, `%${input.title}%`)
        : undefined;

      const priceCondition =
        min && max ? between(product.price, min, max) : undefined;

      const products = await ctx.db.query.product.findMany({
        with: {
          imageUrl: {
            limit: 1,
          },
          lineitems: {
            columns: {
              totalProduct: true,
            },
          },
          details: {
            where: (q, { gt }) => gt(q.stock, 0),
          },
        },
        where: or(
          categoryCondition,
          subCategoryCondition,
          titleCondition,
          priceCondition,
        ),
        orderBy: (q, { desc }) => desc(q.createdAt),
        extras: {
          priceWithDiscount:
            sql`(${product.price} - (${product.price} * ${product.discount} / 100))`.as(
              "priceWithDiscount",
            ),
        },
      });

      const result = products
        .map((item) => {
          const totalProduct = item.lineitems.reduce(
            (acc, cur) => acc + cur.totalProduct,
            0,
          );
          return {
            ...item,
            lineitems: totalProduct,
          };
        })
        .filter((item) => item.details.some((detail) => detail.stock > 0));

      if (input.size) {
        return products
          .map((item) => {
            const totalProduct = item.lineitems.reduce(
              (acc, cur) => acc + cur.totalProduct,
              0,
            );
            return {
              ...item,
              lineitems: totalProduct,
            };
          })
          .filter((item) =>
            item.details.some(
              (detail) => detail.stock > 0 && detail.sizeId === input.size,
            ),
          );
      }

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
        details: {
          where: (q, { gt }) => gt(q.stock, 0),
        },
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
