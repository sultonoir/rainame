"use client";
import React from "react";
import { Button } from "../ui/button";
import useCart from "@/hook/useCart";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { MessageSquareText, Minus, Plus, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import ButtonWishlist from "./ButtonWishlist";
interface Props {
  id: string;
  price: number;
}

const ProductPayment = ({ id, price }: Props) => {
  const { amount, size, increment, decrement, setInitial } = useCart();

  const ctx = api.useUtils();
  const { mutate, isPending } = api.cart.createCart.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: () => {
      toast.success("Product Successfully Added");
      setInitial(size, 1);
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

  const totalPrice = amount * price;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 rounded-full border bg-secondary p-1">
          <Button
            size="icon"
            variant="ghost"
            className="size-6 rounded-full border"
            disabled={amount <= 1}
            onClick={() => decrement(1)}
          >
            <Minus />
          </Button>
          <span className="size-6 flex-shrink-0 text-center">{amount}</span>
          <Button
            size="icon"
            variant="ghost"
            className="size-6 rounded-full border"
            onClick={() => increment(1)}
          >
            <Plus />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="font-medium text-muted-foreground">Size :</p>
          <p className="uppercase">{size}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-muted-foreground">Subtotal :</p>
          <p className="text-lg font-semibold uppercase">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          className="h-9 w-full"
          variant="outline"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleClick}
          size="icon"
        >
          Add to cart
        </Button>
        <Button
          className="h-9 w-full"
          disabled={isPending}
          isLoading={isPending}
          onClick={handleClick}
          size="icon"
        >
          Buy now
        </Button>
        <div className="mt-2 flex w-full items-center gap-2">
          <Button
            className="w-full gap-2"
            variant="ghost"
            startContent={<MessageSquareText size={20} />}
          >
            Chat
          </Button>
          <Separator orientation="vertical" className="h-10" />
          <ButtonWishlist
            id={id}
            variant="ghost"
            className="gap-2"
            heart="stroke-foreground/80"
          >
            Wishlist
          </ButtonWishlist>
          <Separator orientation="vertical" className="h-10" />
          <Button
            className="w-full gap-2"
            variant="ghost"
            startContent={<Share2 size={20} />}
          >
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductPayment;
