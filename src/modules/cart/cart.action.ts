"use server";
import { cacheTag, updateTag } from "next/cache";
import { CartService } from "./cart.service";
import { failure, success } from "../error/error.helper";
import { cookies } from "next/headers";

const carts = new CartService();

export const getCartId = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("cartId")?.value ?? null;
};

export const getOrCreateCartId = async () => {
  const cookieStore = await cookies();

  const cartId = cookieStore.get("cartId")?.value;

  if (cartId) {
    return cartId;
  }

  const cart = await carts.createCartId();

  cookieStore.set("cartId", cart.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return cart.id;
};

export const addToCart = async (input: unknown) => {
  try {
    const cartId = await getOrCreateCartId();

    await carts.addToCart(input, cartId);

    updateTag(`cart-items-${cartId}`);

    return success({
      message: "Product add to cart",
    });
  } catch (error) {
    return failure(error);
  }
};

export const updateCartItem = async (input: unknown) => {
  try {
    const cartId = await getOrCreateCartId();

    await carts.updateCartItem(input, cartId);

    updateTag(`cart-items-${cartId}`);

    return success({
      message: "Product quantity updated",
    });
  } catch (error) {
    return failure(error);
  }
};

export const removeFromCart = async (input: unknown) => {
  try {
    const cartId = await getOrCreateCartId();

    await carts.removeFromCart(input, cartId);

    updateTag(`cart-items-${cartId}`);

    return success({
      message: "Product has been removed",
    });
  } catch (error) {
    return failure(error);
  }
};

export const getCartItems = async () => {
  const cartId = await getCartId();

  if (!cartId) {
    return [];
  }

  return getCartItemsCached(cartId);
};

async function getCartItemsCached(cartId: string) {
  "use cache";

  cacheTag(`cart-items-${cartId}`);

  return carts.getCartItems(cartId);
}
