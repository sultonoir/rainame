"use client";
import { Variant } from "@/modules/product/product.types";
import { Button } from "../../ui/button";
import { useState } from "react";
import QuantitySelector from "./quantity-selector";
import AddToCart from "./add-to-cart";

type Props = {
  variants: Variant[];
  productId: string;
};

const PurchasePanel = ({ variants, productId }: Props) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState<Variant | undefined>(undefined);

  // handle select
  const handleSelect = (variant: Variant) => {
    setSelect((prev) => (prev?.id === variant.id ? undefined : variant));
  };

  const handleAmountChange = (amount: number) => {
    setCount(amount);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row flex-wrap gap-2">
        <p className="text-lg font-semibold">Sizes •</p>
        <p className="text-muted-foreground text-base">International</p>
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            disabled={variant.amount === 0}
            variant={variant.id === select?.id ? "default" : "outline"}
            onClick={() => handleSelect(variant)}>
            {variant.name}
          </Button>
        ))}
      </div>
      <div className="flex gap-4 mt-2 w-full">
        <QuantitySelector
          max={select?.amount ?? 1}
          onAmountChange={handleAmountChange}
        />
        <div className="flex-1">
          <AddToCart
            productId={productId}
            quantity={count}
            size={select?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchasePanel;
