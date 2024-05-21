"use client";
import React from "react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const CartRemoveIAllitem = () => {
  const ctx = api.useUtils();
  const { mutate } = api.cart.removeAllcart.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: async () => {
      await ctx.cart.getCart.invalidate();
    },
  });
  return (
    <Button
      variant="link"
      className="text-primary no-underline"
      onClick={() => mutate()}
    >
      Remove
    </Button>
  );
};

export default CartRemoveIAllitem;
