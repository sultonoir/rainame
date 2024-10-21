"use client";
import { Button } from "@/components/ui/button";
import useSizes from "@/hooks/useSizes";
import React from "react";
import WishlistButton from "../button/wishlist-button";
import { MinusIcon, PlusIcon, ShoppingBag } from "lucide-react";

type Props = {
  id: string;
};

const PaymentProduct = (props: Props) => {
  const [count, setCount] = React.useState(1);
  const { sizes } = useSizes();

  const decrement = () => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
  };

  const increment = () => {
    if (count === 10) return;
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex gap-2">
      <div className="flex rounded-2xl bg-muted/50 p-2">
        <Button
          size="icon"
          variant="outline"
          disabled={count === 1}
          className="size-9 rounded-lg"
          onClick={decrement}
        >
          <MinusIcon />
        </Button>
        <div className="flex size-9 flex-shrink-0 items-center justify-center">
          {count}
        </div>
        <Button
          size="icon"
          disabled={count === 10}
          variant="outline"
          className="size-9"
          onClick={increment}
        >
          <PlusIcon />
        </Button>
      </div>
      <Button className="h-auto w-full gap-2">
        <ShoppingBag />
        Add to cart
      </Button>
      <WishlistButton
        variant="outline"
        className="h-auto"
        isWislist={false}
        productId={props.id}
      />
    </div>
  );
};

export default PaymentProduct;
