import { db } from "@/lib/db";
import { InputAddTocart } from "./cart.types";

export class CartRepository {
  async findById(id: string) {
    return db.cart.findUnique({
      where: { id },
    });
  }

  async create() {
    return db.cart.create({
      data: {},
      select: {
        id: true,
      },
    });
  }
  async upsertItem({ productId, size, quantity, cartId }: InputAddTocart) {
    return db.cartItem.upsert({
      where: {
        cartId_productId_size: {
          cartId,
          productId,
          size,
        },
      },

      create: {
        cartId,
        productId,
        size,
        quantity,
      },

      update: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }
  async findCartItem(cartId: string) {
    return await db.cartItem.findMany({
      where: {
        cartId,
      },
      select: {
        id: true,
        quantity: true,
        size: true,
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            discount: true,
            discountedPrice: true,
            normalPrice: true,
            media: {
              select: {
                id: true,
                url: true,
                blur: true,
              },
              orderBy :{
                createdAt : "asc"
              }
            },
          },
        },
      },
    });
  }
}
