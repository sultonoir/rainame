import { Prisma } from "prisma";
import { Media } from "../media/media.types";

// product.types.ts

export const productCardSelect = {
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

export type ProductCardRaw = Prisma.ProductGetPayload<{
  select: typeof productCardSelect;
}>;

export type ProductCardDto = Omit<ProductCardRaw, "media"> & {
  image: Media;
};

export type ProductFilterInput = {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: "latest" | "price-low" | "price-high" | "best-selling";
  page?: number;
  limit?: number;
};

export type ProductCardSort =
  | "newest"
  | "top-rated"
  | "best-selling"
  | "price-low"
  | "best-discount"
  | "price-high";
