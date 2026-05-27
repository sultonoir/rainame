import { AppError } from "../error/error.helper";
import { ProductCardDto, ProductCardRaw } from "./product.types";

export const toProductCardDto = (
  products: ProductCardRaw[],
): ProductCardDto[] => {
  return products.map((product) => {
    const image = product.media.at(0);
    if (!image) {
      throw new AppError(
        `product ${product.name} do not have any images`,
        404,
        "IMAGE_NOT_FOUND",
      );
    }
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      summary: product.summary,
      normalPrice: product.normalPrice,
      discountedPrice: product.discountedPrice,
      discount: product.discount,
      ratingAverage: product.ratingAverage,
      ratingCount: product.ratingCount,
      selling: product.selling,
      category : product.category,
      subcategory : product.subcategory,
      image,
    };
  });
};
