"use client";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Separator } from "../ui/separator";
import React from "react";
import CartSection from "./CartSection";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

export default function CartSheet() {
  const [open, setOpen] = React.useState(false);

  const { data } = api.cart.getIndicator.useQuery();

  return (
    <HoverCard openDelay={1} open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span
            className={cn(
              "absolute -right-1 -top-1 hidden size-5 items-center justify-center rounded-full border bg-secondary text-xs",
              {
                flex: data && data > 0,
              },
            )}
          >
            {data}
          </span>
          <ShoppingBag size={20} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="h-fit w-dvw overflow-hidden md:max-w-[450px]">
        <div className="flex items-center justify-between font-semibold">
          <p>Cart</p>
          <Link href="/cart">View cart</Link>
        </div>
        <Separator className="my-2" />
        {open && <CartSection />}
      </HoverCardContent>
    </HoverCard>
  );
}
