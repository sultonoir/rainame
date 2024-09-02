import { generateId } from "lucia";
import { type ProtectedTRPCContext } from "../../trpc";
import { type PostProductSchema } from "./product.input";
import slugify from "slugify";
import { createBlurHash } from "@/lib/blur";
import { TRPCError } from "@trpc/server";

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
    data: stocks.map((item) => ({
      stockandsizeId: item.id,
      productId: item.productId,
      categoryId: category.value,
      subcategoryId: subcategory.value,
    })),
  });

  if (productDetail.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create product",
    });
  }

  return product.slug;
};
