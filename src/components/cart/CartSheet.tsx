"use client";
import { ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useStore from "@/hook/useStore";
import useCart from "@/hook/useCart";
import Link from "next/link";
import { Separator } from "../ui/separator";
import React from "react";
import CartSection from "./CartSection";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CartSheet() {
  const carts = useStore(useCart, (state) => state.cart);
  const items = carts?.reduce((acc, cur) => acc + cur.amount, 0);

  const ids = carts?.map((item) => item.id);

  return (
    <HoverCard openDelay={1}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border bg-secondary text-xs">
            {items}
          </span>
          <ShoppingBag size={20} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="max-h-[550px] min-w-[450px] overflow-hidden">
        <div className="flex items-center justify-between font-semibold">
          <p>Cart</p>
          <Link href="/cart">View cart</Link>
        </div>
        <Separator className="my-2" />
        {ids && ids.length !== 0 ? (
          <CartSection ids={ids} />
        ) : (
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
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Start shopping
            </Link>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
