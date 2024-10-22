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

export default function CartButton() {
  const { data: count } = api.cart.getCount.useQuery();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag />
          {!!count && count !== 0 && (
            <div className="absolute -right-1 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {count < 99 ? count : 99}
            </div>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[20rem] max-w-screen-sm space-y-4 rounded-2xl lg:w-[30rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <Link
            href="/cart"
            className="text-sm text-muted-foreground transition-all hover:underline"
          >
            View all
          </Link>
        </div>
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

  switch (status) {
    case "pending":
      return <CartSkeleton count={10} />;
    case "error":
      return <div>Something went wrong</div>;
    case "success":
      return (
        <React.Fragment>
          {carts.length < 1 ? (
            <div className="flex flex-col place-items-center">
              <ShoppingBag size={40} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <React.Fragment>
              {carts.map((cart) => (
                <Link
                  key={cart.id}
                  href={`/product/${cart.product.slug}`}
                  className="rounded-lg p-2 hover:bg-muted"
                >
                  <CartCard key={cart.id} cart={cart} />
                </Link>
              ))}
            </React.Fragment>
          )}
        </React.Fragment>
      );
  }
}
