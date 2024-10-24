import { Separator } from "@/components/ui/separator";
import { calculateTotalPrice } from "@/lib/utils";
import { type FormatCart } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CartRemoveButton from "./cart-remove-button";
import QtyProduct from "../product/qty-product";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { api } from "@/trpc/react";

interface Props {
  cart: FormatCart;
  action: boolean;
}

export default function CartCard({ cart, action }: Props) {
  const [count, setCount] = useState(1);
  const discountedPrice = calculateTotalPrice({
    price: cart.product.price,
    discount: cart.product.discount,
  });

  const utils = api.useUtils();
  const increment = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      // Update amount di TRPC setelah count di-update
      utils.cart.getCart.setData(undefined, (oldData) => {
        if (!oldData) return [];
        return oldData.map((item) =>
          item.id === cart.id ? { ...item, amount: cart.amount + 1 } : item,
        );
      });
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      if (prevCount <= 1) return prevCount;
      const newCount = prevCount - 1;
      // Update amount di TRPC setelah count di-update
      utils.cart.getCart.setData(undefined, (oldData) => {
        if (!oldData) return [];
        return oldData.map((item) =>
          item.id === cart.id ? { ...item, amount: cart.amount - 1 } : item,
        );
      });
      return newCount;
    });
  };

  return (
    <div className="flex w-full space-x-4 rounded-2xl">
      <div className="relative h-[100px] w-20 flex-shrink-0 overflow-hidden rounded-sm">
        {cart.product.productImage.map((src) => (
          <Image
            key={src.id}
            src={src.url}
            alt="avatar"
            fill
            className="object-cover"
            sizes="100%"
            placeholder="blur"
            blurDataURL={src.thumbnail}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <h3 className="max-w-[10rem] truncate text-[16px] font-bold leading-normal">
          {cart.product.name}
        </h3>
        <div className="flex h-5 space-x-2">
          <p className="text-sm text-muted-foreground">Size: {cart.size}</p>
          <Separator orientation="vertical" className="h-full w-0.5" />
          <p className="text-sm text-muted-foreground">Qty: {cart.amount}</p>
        </div>
        <div className="mt-auto flex w-fit gap-3 rounded-lg bg-muted p-1 dark:bg-muted/50">
          <Button
            className="size-6"
            onClick={decrement}
            disabled={count === 1}
            variant="ghost"
            size="icon"
          >
            <MinusIcon className="size-4" />
          </Button>
          <div className="flex size-6 flex-shrink-0 items-center justify-center">
            {count}
          </div>
          <Button
            onClick={increment}
            className="size-6"
            disabled={count >= 10}
            variant="ghost"
            size="icon"
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end justify-between">
        {action && <CartRemoveButton cartId={cart.id} />}
        <p className="w-10 flex-shrink-0 text-center text-base">
          ${discountedPrice * cart.amount}
        </p>
      </div>
    </div>
  );
}
