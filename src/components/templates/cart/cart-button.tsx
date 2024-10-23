"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ShoppingBag } from "lucide-react";
import React, { useMemo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import CartCard from "./cart-card";
import Link from "next/link";
import CartSkeleton from "./cart-skeleton";
import CartEmpty from "./cart-empty";
import { calculateTotalPrice } from "@/lib/utils";

export default function CartButton() {
  const { data: count } = api.cart.getCount.useQuery();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag size={19} />
          {!!count && count !== 0 && (
            <div className="absolute -right-1 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {count < 99 ? count : 99}
            </div>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[20rem] max-w-screen-sm space-y-4 rounded-2xl lg:w-[30rem]">
        <h3 className="text-[20px] font-semibold leading-normal">
          Shopping Cart
        </h3>
        <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
          <CartContent />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function CartContent() {
  const { data, status } = api.cart.getCart.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const carts = useMemo(
    () => data?.pages.flatMap((page) => page.cart) ?? [],
    [data],
  );

  const subTotal = carts.reduce((total, cartItem) => {
    const { price, discount } = cartItem.product;
    const discountedPrice = calculateTotalPrice({ price, discount });
    return total + discountedPrice * cartItem.amount;
  }, 0);

  switch (status) {
    case "pending":
      return <CartSkeleton count={10} />;
    case "error":
      return <div>Something went wrong</div>;
    case "success":
      return (
        <React.Fragment>
          {carts.length < 1 ? (
            <CartEmpty />
          ) : (
            <React.Fragment>
              <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
                {carts.map((cart) => (
                  <div className="rounded-lg p-2" key={cart.id}>
                    <CartCard key={cart.id} cart={cart} />
                  </div>
                ))}
              </div>
              <div className="space-y-3 rounded-lg bg-accent/60 p-4">
                <p className="flex justify-between font-semibold">
                  <span>
                    <span>Subtotal</span>
                    <span className="block text-sm font-normal text-muted-foreground">
                      Shipping and taxes calculated at checkout.
                    </span>
                  </span>
                  <span>${subTotal}</span>
                </p>
                <div className="flex items-center space-x-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart">View cart</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      );
  }
}
