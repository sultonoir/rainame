import { Prisma } from "prisma";
import { Media } from "../media/media.types";
import z from "zod";
import { productCardSelect, productDetailSelect } from "./product.select";
// product.types.ts

export type ProductCardRaw = Prisma.ProductGetPayload<{
  select: typeof productCardSelect;
}>;

export type ProductCardDto = Omit<ProductCardRaw, "media"> & {
  image: Media;
};

export type ProductDetailRaw = Prisma.ProductGetPayload<{
  select: typeof productDetailSelect;
}>;

export type ProductDetailDto = Omit<
  ProductDetailRaw,
  "media" | "productVariant"
> & {
  images: Media[];
  variants: Variant[];
};

export type Variant = {
  id: string;
  amount: number;
  name: string;
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

export const inputMetadata = z.object({
  slug: z.string(),
});
