"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCart from "@/hook/useCart";
import { ShoppingBag } from "lucide-react";
import useStore from "@/hook/useStore";
import CartSection from "../cart/CartSection";
import useCartSheet from "@/hook/useCartSheet";

export default function CartSheet() {
  const { onOpen, isOpen } = useCartSheet();
  const carts = useStore(useCart, (state) => state.cart);
  const items = carts?.reduce((acc, cur) => acc + cur.amount, 0);

  const ids = carts?.map((item) => item.id);

  return (
    <Sheet open={isOpen} onOpenChange={onOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group hover:bg-transparent"
          startContent={
            <ShoppingBag size={15} className="mr-2 group-hover:scale-110" />
          }
        >
          Shopping Cart
          <span className="ml-3 flex size-7 items-center justify-center rounded-full bg-secondary text-xs">
            {items}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>{items} items</SheetDescription>
        </SheetHeader>
        {isOpen && ids && ids.length !== 0 && <CartSection ids={ids} />}
      </SheetContent>
    </Sheet>
  );
}
