"use client";

import { api } from "@/trpc/react";
import React from "react";
import CartLoading from "./CartLoading";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CartItem from "./CartItem";
import CartHeader from "./CartHeader";
import { buttonVariants } from "../ui/button";
import CartPayment from "./CartPayment";

const CartPage = () => {
  const { data, isLoading, isError } = api.cart.getCart.useQuery();
  const cart = data?.map((item) => item.id);
  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex-1 overflow-hidden rounded-lg">
        <div className="flex size-full flex-col gap-2 divide-y overflow-y-auto overflow-x-hidden">
          {isLoading && <CartLoading />}
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
          {!isLoading && data?.length !== 0 && <CartHeader cart={cart ?? []} />}
          {data?.map((item) => (
            <CartItem
              key={item.id}
              product={item.product}
              imageProduct={item.product.imageUrl}
              size={item.size}
              isSelected
              cartId={item.id}
            />
          ))}
        </div>
      </div>
      <div className="relative hidden max-w-xs flex-1 lg:flex">
        <div className="sticky top-20 h-fit w-full">
          {data && data.length !== 0 && <CartPayment cart={data} />}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
