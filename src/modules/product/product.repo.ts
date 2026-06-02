import { db } from "@/lib/db";
import { InputRecommend, ProductCardSort } from "./product.types";
import { Prisma } from "prisma";
import { productCardSelect, productDetailSelect } from "./product.select";

export class ProductRepo {
  async findCards(sort: ProductCardSort = "newest") {
    return await db.product.findMany({
      take: 8,

      orderBy: this.buildCardOrder(sort),

      select: productCardSelect,
    });
  }

  async findDetail(slug: string) {
    return await db.product.findUnique({
      where: {
        slug,
      },
      select: productDetailSelect,
    });
  }

  async findMetadata(slug: string) {
    return await db.product.findUnique({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    });
  }

  async findRecommend({ filter, productId }: InputRecommend) {
    return await db.product.findMany({
      where: {
        ...filter,
        id: {
          not: productId,
        },
      },
      select: productCardSelect,
      take: 8,
    });
  }

  async hasSubCategory(subcategory: string) {
    const product = await db.product.findFirst({
      where: {
        subcategory,
      },
      select: {
        id: true,
      },
    });

    return !!product;
  }

  private buildCardOrder(
    sort: ProductCardSort,
  ): Prisma.ProductOrderByWithRelationInput {
    const orderMap: Record<
      ProductCardSort,
      Prisma.ProductOrderByWithRelationInput
    > = {
      newest: {
        createdAt: "desc",
      },
      "best-discount": {
        discount: "desc",
      },

      "top-rated": {
        ratingAverage: "desc",
      },

      "best-selling": {
        selling: "desc",
      },

      "price-low": {
        discountedPrice: "asc",
      },

      "price-high": {
        discountedPrice: "desc",
      },
    };

    return orderMap[sort];
  }
}
