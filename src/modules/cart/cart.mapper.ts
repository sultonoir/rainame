import { AppError } from "../error/error.helper";
import { CartItemDto, CartItemRaw } from "./cart.types";

export const toCartDto = (carts: CartItemRaw[]): CartItemDto[] => {
  return carts.map((cart) => {
    const image = cart.product.media[0];
    if (!image) {
      throw new AppError(
        `product ${cart.product.name} do not have any images`,
        404,
        "IMAGE_NOT_FOUND",
      );
    }

    return {
      id: cart.id,
      size: cart.size,
      quantity: cart.quantity,
      slug: cart.product.slug,
      discount: cart.product.discount,
      price: cart.product.discountedPrice,
      originalPrice: cart.product.normalPrice,
      name: cart.product.name,
      image,
    };
  });
};
