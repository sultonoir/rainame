"use client";
import useSelected from "@/hook/useSelected";
import { type Cart, type ImageProduct, type Product } from "@/server/db/schema";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { navigate } from "@/lib/navigate";

interface Props {
  cart: Array<
    Cart & {
      product: Product & {
        imageUrl: ImageProduct[];
      };
    }
  >;
}

const CartPayment = ({ cart }: Props) => {
  const { selected } = useSelected();

  const isSeleceted = cart.filter((item) => selected.includes(item.id));

  const amount = isSeleceted.reduce((acc, cur) => acc + cur.totalProduct, 0);

  const price = isSeleceted.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const productId = cart.map((item) => item.product.id);

  const ctx = api.useUtils();
  const { mutate, isPending } = api.payment.paymentFromCart.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (e) => {
      navigate(`/payment/${e}`);
    },
    onSettled: async () => {
      await ctx.cart.getCart.invalidate();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Total</p>
          <p className="text-lg font-semibold">${price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        {selected.length !== 0 && (
          <Button
            className="w-full"
            isLoading={isPending}
            disabled={isPending}
            onClick={() => {
              mutate({
                id: selected,
                productId,
              });
            }}
          >
            {amount}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CartPayment;
