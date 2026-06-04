import { CartRepository } from "./cart.repository";
import { ValidationHelper } from "../validation/validation.helper";
import {
  inputAddtoCart,
  inputRemoveCartItem,
  inputUpdateQuantity,
} from "./cart.types";
import { AppError } from "../error/error.helper";
import { toCartDto } from "./cart.mapper";

export class CartService {
  constructor(
    private readonly cartRepo: CartRepository = new CartRepository(),
  ) {}

  async createCartId() {
    return await this.cartRepo.create();
  }

  async addToCart(input: unknown, cartId: string) {
    const value = ValidationHelper.validateOrThrow(inputAddtoCart, input);

    try {
      await this.cartRepo.upsertItem({
        ...value,
        cartId,
      });
    } catch (error) {
      throw new AppError(
        "Failed to add product to cart",
        500,
        "CART_ADD_FAILED",
        error,
      );
    }
  }

  async getCartItems(cartId: string) {
    const rawCartItems = await this.cartRepo.findCartItem(cartId);
    return toCartDto(rawCartItems);
  }

  async updateCartItem(input: unknown, cartId: string) {
    const value = ValidationHelper.validateOrThrow(inputUpdateQuantity, input);

    try {
      await this.cartRepo.updateQuantity({
        ...value,
        cartId,
      });
    } catch (error) {
      throw new AppError(
        "Failed to update quantity",
        500,
        "UPDATE_FAILED",
        error,
      );
    }
  }

  async removeFromCart(input: unknown, cartId: string) {
    const data = ValidationHelper.validateOrThrow(inputRemoveCartItem, input);

    try {
      await this.cartRepo.removeCartItemById(data.itemId, cartId);
    } catch (error) {
      throw new AppError("Failed to revome item", 500, "REMOVE_FAILED", error);
    }
  }
}
