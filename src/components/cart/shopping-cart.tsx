"use client";

import { useTransition } from "react";
import { CartItemList } from "./cart-item-list";
import { OrderSummary } from "./order-summary";
import { CartItemDto } from "@/modules/cart/cart.types";
import { useCartQuantity } from "@/hooks/use-cart-quantity";
import { removeFromCart } from "@/modules/cart/cart.action";
import { useCartItemQuantity } from "@/hooks/use-cart-item-quantity";

type Props = {
  initialData: CartItemDto[];
};

export function ShoppingCart({ initialData }: Props) {
  const [isPending, startTransition] = useTransition();

  const removeItem = (id: string) => {
    startTransition(async () => {
      await removeFromCart({ itemId: id });
    });
  };

  const subtotal = initialData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const savings = initialData.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0,
  );

  const shipping = subtotal >= 500 ? 0 : 15.99;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col gap-8 lg:flex-row container my-10 mx-auto justify-center">
      <CartItemList
        items={initialData}
        isRemoving={isPending}
        onRemove={removeItem}
      />

      <div className="w-full lg:w-96 flex flex-col gap-4">
        <OrderSummary
          itemsLength={initialData.length}
          subtotal={subtotal}
          savings={savings}
          shipping={shipping}
          total={total}
        />
      </div>
    </div>
  );
}
