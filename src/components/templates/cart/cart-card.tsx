import { Separator } from "@/components/ui/separator";
import { calculateTotalPrice } from "@/lib/utils";
import { type FormatCart } from "@/types";
import Image from "next/image";
import React from "react";
import CartRemoveButton from "./cart-remove-button";

interface Props {
  cart: FormatCart;
  action : boolean
}

export default function CartCard({ cart ,action}: Props) {
  const discountedPrice = calculateTotalPrice({
    price: cart.product.price,
    discount: cart.product.discount,
  });
  return (
    <div className="flex w-full space-x-4 rounded-2xl">
      <div
        style={{ height: "100px" }}
        className="relative h-[100px] w-20 flex-shrink-0 overflow-hidden rounded-sm"
      >
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
      <div className="flex flex-1 flex-col space-y-2">
        <h3 className="max-w-[10rem] truncate text-[16px] font-bold leading-normal">
          {cart.product.name}
        </h3>
        <div className="flex h-5 space-x-2">
          <p className="text-sm text-muted-foreground">Size: {cart.size}</p>
          <Separator orientation="vertical" className="h-full w-1" />
          <p className="text-sm text-muted-foreground">Qty: {cart.amount}</p>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end justify-between">
        <CartRemoveButton cartId={cart.id} />
        <p className="w-10 flex-shrink-0 text-center">${discountedPrice}</p>
      </div>
    </div>
  );
}
