import { generateId } from "lucia";
import { type TRPCContext, type ProtectedTRPCContext } from "../../trpc";
import {
  type SlugProductSchema,
  type PostProductSchema,
} from "./product.input";
import slugify from "slugify";
import { createBlurHash } from "@/lib/blur";
import { TRPCError } from "@trpc/server";
import { getTotalRating } from "@/lib/total-rating";

export const postProduct = async (
  ctx: ProtectedTRPCContext,
  {
    title,
    images,
    category,
    subcategory,
    desc,
    discount,
    price,
    stockAdnSize,
  }: PostProductSchema,
) => {
  const slug = slugify(title, {
    lower: true,
  });
  const product = await ctx.db.product.create({
    data: {
      id: generateId(10),
      name: title,
      slug,
      price,
      discount,
      desc,
    },
  });

  if (!product.id) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const thumbnails = await Promise.all(
    images.map((item) => createBlurHash(item)),
  );

  const productImages = await ctx.db.productImage.createManyAndReturn({
    data: images.map((item, index) => ({
      id: generateId(10),
      url: item,
      thumbnail: thumbnails[index]!,
      productId: product.id,
    })),
  });

  if (productImages.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create image product",
    });
  }

  const stocks = await ctx.db.stockAndSize.createManyAndReturn({
    data: stockAdnSize.map((item) => ({
      id: generateId(10),
      amount: parseInt(item.stock),
      name: item.size,
      productId: product.id,
    })),
  });

  if (stocks.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create image product",
    });
  }

  const productDetail = await ctx.db.productDetails.createManyAndReturn({
    data: {
      productId: product.id,
      categoryId: category.value,
      subcategoryId: subcategory.value,
    },
  });

  if (productDetail.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create product",
    });
  }

  return product.slug;
};

export const getBySlug = async (
  ctx: TRPCContext,
  { slug }: SlugProductSchema,
) => {
  const product = await ctx.db.productDetails.findFirst({
    where: {
      product: {
        slug,
      },
    },
    include: {
      product: {
        include: {
          productImage: true,
          stockandsize: true,
          rating: true,
        },
      },
      subcategory: true,
      category: true,
    },
  });

  const coupon = await ctx.db.coupon.findMany({
    where: {
      OR: [
        {
          minOrder: 0,
        },
        {
          minOrder: {
            lte: product?.product.price,
          },
        },
      ],
    },
  });
  if (!product) {
    return null;
  }
  const newProduct = {
    ...product?.product,
    categories: product?.category.name,
    subcategories: product?.subcategory.name,
    coupon: coupon,
  };

  return newProduct;
};

export const listProduct = async (ctx: TRPCContext) => {
  const products = await ctx.db.product.findMany({
    include: {
      productImage: {
        take: 1,
      },
      rating: true,
    },
  });

  const checkWishlist = async (productId: string) => {
    const userId = ctx.user?.id;
    if (!userId) {
      return false; // or throw an error, depending on your use case
    }

    const wishlist = await ctx.db.wishlist.findFirst({
      where: {
        userId,
        productId,
      },
    });

    return !!wishlist; // returns true if wishlist is found, false otherwise
  };

  const newProducts = await Promise.all(
    products.map(async (item) => {
      const totalRating = getTotalRating(item.rating);
      const averageRating = totalRating / item.rating.length;
      const wishlistExists = await checkWishlist(item.id);

      return {
        ...item,
        rating: averageRating,
        productImage: item.productImage[0]!,
        wishlist: wishlistExists,
      };
    }),
  );

  return newProducts;
};
