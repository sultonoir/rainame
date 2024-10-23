"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { api } from "@/trpc/react";
import { ShoppingBag } from "lucide-react";
import React from "react";

export default function CartButton() {
  const { data: count } = api.cart.getCount.useQuery();
  const { setCartOpen } = useCart();

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={setCartOpen}>
      <ShoppingBag size={19} />
      {!!count && count !== 0 && (
        <div className="absolute -right-1 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
          {count < 99 ? count : 99}
        </div>
      )}
    </Button>
  );
}
