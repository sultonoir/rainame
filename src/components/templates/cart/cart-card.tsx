import { Separator } from "@/components/ui/separator";
import { calculateTotalPrice } from "@/lib/utils";
import { type FormatCart } from "@/types";
import Image from "next/image";
import React from "react";
import CartRemoveButton from "./cart-remove-button";

interface Props {
  cart: FormatCart;
}

export default function CartCard({ cart }: Props) {
  const discountedPrice = calculateTotalPrice({
    price: cart.product.price,
    discount: cart.product.discount,
  });
  return (
    <div className="flex w-full space-x-4 rounded-2xl">
      <div className="relative aspect-square size-20 flex-shrink-0 overflow-hidden rounded-sm">
        {cart.product.productImage.map((src) => (
          <Image
            key={src.id}
            src={src.url}
            alt="avatar"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={src.thumbnail}
          />
        ))}
      </div>
      <div className="flex min-w-0 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="w-[calc(100%-3rem)] truncate">{cart.product.name}</h3>
          <p className="w-10 flex-shrink-0 text-center">${discountedPrice}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex h-5 space-x-2">
            <p className="text-sm text-muted-foreground">Size: {cart.size}</p>
            <Separator orientation="vertical" className="h-full w-1" />
            <p className="text-sm text-muted-foreground">Qty: {cart.amount}</p>
          </div>
          <CartRemoveButton cartId={cart.id} />
        </div>
      </div>
    </div>
  );
}
