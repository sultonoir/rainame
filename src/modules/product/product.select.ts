import { Prisma } from "prisma";

export const productDetailSelect = {
  id: true,
  name: true,
  slug: true,
  summary: true,
  normalPrice: true,
  discountedPrice: true,
  discount: true,
  category: true,
  ratingAverage: true,
  ratingCount: true,
  subcategory: true,
  selling: true,
  desc: true,

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

  productVariant: {
    select: {
      id: true,
      name: true,
      amount: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  },
} satisfies Prisma.ProductSelect;

export const productCardSelect = {
  id: true,
  name: true,
  slug: true,
  normalPrice: true,
  discountedPrice: true,
  discount: true,
  category: true,
  ratingAverage: true,
  ratingCount: true,
  subcategory: true,
  selling: true,

  media: {
    take: 1,
    orderBy: {
      createdAt: "asc",
    },
    select: {
      url: true,
      id: true,
      blur: true,
    },
  },
} satisfies Prisma.ProductSelect;
