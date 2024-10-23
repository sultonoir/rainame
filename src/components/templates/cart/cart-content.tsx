"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import useCart from "@/hooks/use-cart";
import { api } from "@/trpc/react";
import CartSkeleton from "./cart-skeleton";
import CartEmpty from "./cart-empty";
import CartCard from "./cart-card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export default function CartContent() {
  const { setCartOpen, cartOpen } = useCart();
  const { data, status } = api.cart.getCart.useQuery();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="flex-shrink-0 flex-row items-center justify-between">
          <div className="flex flex-grow items-center">
            <SheetTitle className="pr-2">My Cart</SheetTitle>
            {!!data?.count && data?.count !== 0 && (
              <div className="flex size-5 items-center justify-center rounded-lg bg-primary text-xs text-white">
                {data.count < 99 ? data.count : 99}
              </div>
            )}
          </div>
          <SheetClose className="mt-0">
            <XIcon size={19} />
          </SheetClose>
        </SheetHeader>
        <div className="flex min-w-0 flex-grow flex-col space-y-2 overflow-y-auto pt-3">
          {(() => {
            switch (status) {
              case "pending":
                return <CartSkeleton count={10} />;
              case "error":
                return <div>Something went wrong</div>;
              case "success":
                return (
                  <React.Fragment>
                    {data.carts.length < 1 ? (
                      <CartEmpty />
                    ) : (
                      <React.Fragment>
                        {data.carts.map((cart) => (
                          <CartCard cart={cart} key={cart.id} action />
                        ))}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
            }
          })()}
        </div>
        <SheetFooter className="mt-auto">
          <Button>Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
