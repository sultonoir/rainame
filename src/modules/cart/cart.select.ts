import { Prisma } from "prisma";

export const cartItemSelect = {
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
        orderBy: {
          createdAt: "asc",
        },
        select: {
          url: true,
          id: true,
          blur: true,
        },
      },
    },
  },
} satisfies Prisma.CartItemSelect;
