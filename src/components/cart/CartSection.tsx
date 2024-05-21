"use client";
import React from "react";
import { api } from "@/trpc/react";
import CartLoading from "./CartLoading";
import CartItem from "./CartItem";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import CartHeader from "./CartHeader";

interface Props {
  isSeleceted?: boolean;
}

const CartSection = ({ isSeleceted }: Props) => {
  const { data, isLoading, isError } = api.cart.getCart.useQuery();
  const cart = data?.map((item) => item.id);
  return (
    <>
      {isLoading && <CartLoading />}
      <div
        className={cn(
          "flex max-h-[550px] w-full flex-col gap-2 divide-y overflow-y-auto overflow-x-hidden *:pt-2",
          {
            "h-full max-h-full *:pt-4 ": isSeleceted === true,
          },
        )}
      >
        {isError ||
          (data?.length === 0 && (
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-52 w-full">
                <Image
                  src="/empty.png"
                  alt="empty-image"
                  fill
                  className="size-full object-contain"
                />
              </div>
              <p className="text-lg font-semibold">
                Wow, your shopping cart is empty
              </p>
              <p className="text-muted-foreground">
                Let&apos;s fill it with your dream items!
              </p>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                )}
              >
                Start shopping
              </Link>
            </div>
          ))}
        {isSeleceted && !isLoading && <CartHeader cart={cart ?? []} />}
        {data?.map((item) => (
          <CartItem
            key={item.id}
            product={item.product}
            imageProduct={item.product.imageUrl}
            size={item.size}
            isSelected={isSeleceted}
            cartId={item.id}
          />
        ))}
      </div>
    </>
  );
};

export default CartSection;
