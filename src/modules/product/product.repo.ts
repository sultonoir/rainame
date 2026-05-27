import { db } from "@/lib/db";
import { productCardSelect, ProductCardSort } from "./product.types";
import { Prisma } from "prisma";

export class ProductRepo {
  async findCards(sort: ProductCardSort = "newest") {
    return db.product.findMany({
      take: 8,

      orderBy: this.buildCardOrder(sort),

      select: productCardSelect,
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
