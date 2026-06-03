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
        select: {
          id: true,
          url: true,
          blur: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  },
} satisfies Prisma.CartItemSelect;
