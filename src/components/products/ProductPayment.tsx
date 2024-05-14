"use client";
import React from "react";
import Counter from "../ui/counter";
import { Button } from "../ui/button";
import useCart from "@/hook/useCart";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

interface Props {
  id: string;
  price: number;
}

const ProductPayment = ({ id, price }: Props) => {
  const { amount, size } = useCart();

  const ctx = api.useUtils();
  const { mutate, isPending } = api.cart.createCart.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: () => {
      toast.success("Product Successfully Added");
    },
    onSettled: async () => {
      await ctx.cart.getCart.invalidate();
      await ctx.cart.getIndicator.invalidate();
    },
  });

  const handleClick = () => {
    mutate({
      size,
      productId: id,
      totalPrice: price,
      totalProduct: amount,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Counter />
      <Button
        className="w-full rounded-full"
        disabled={isPending}
        isLoading={isPending}
        onClick={handleClick}
        startContent={<ShoppingBag size={20} className="mr-2" />}
      >
        Checkout
      </Button>
    </div>
  );
};

export default ProductPayment;
