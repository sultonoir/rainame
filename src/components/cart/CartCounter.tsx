import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { api } from "@/trpc/react";

interface CartCounterProps {
  id: string;
  amount: number;
}

const CartCounter = ({ id, amount }: CartCounterProps) => {
  const [value, setValue] = useState(amount);
  const [pendingValue, setPendingValue] = useState(amount);

  const ctx = api.useUtils();
  const { mutate } = api.cart.amountCart.useMutation({
    onSuccess: async () => {
      await ctx.cart.getCart.invalidate();
      await ctx.cart.getIndicator.invalidate();
    },
  });
  const increment = (incrementValue: number) => {
    setPendingValue((state) => state + incrementValue);
  };

  const decrement = (incrementValue: number) => {
    setPendingValue((state) => state - incrementValue);
  };

  // Delay the actual state update
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(pendingValue);
      mutate({
        id,
        amount: pendingValue,
      });
    }, 1000);

    // Cleanup timeout if pendingValue changes before the timeout completes
    return () => {
      clearTimeout(handler);
    };
  }, [id, mutate, pendingValue]);

  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-2 rounded-lg border p-0.5">
          <Button
            size="icon"
            variant="outline"
            className="size-6 border-none hover:bg-transparent"
            disabled={pendingValue <= 1}
            onClick={() => decrement(1)}
          >
            <Minus />
          </Button>
          <span className="size-6 flex-shrink-0 text-center">{value}</span>
          <Button
            size="icon"
            variant="outline"
            className="size-6 border-none hover:bg-transparent"
            onClick={() => increment(1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCounter;