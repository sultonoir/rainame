import { db } from "@/lib/db";
import { ProductCardSort } from "./product.types";
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
