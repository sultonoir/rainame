"use client";
import { Button } from "@/components/ui/button";
import useSizes from "@/hooks/useSizes";
import { type StockAndSize } from "@prisma/client";
import React from "react";

type Props = {
  sizes: StockAndSize[];
};

const SizesProduct = (props: Props) => {
  const { sizes, setSizes } = useSizes();
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">
        Sizes •{" "}
        <span className="text-base text-muted-foreground">International</span>
      </h3>
      <div className="flex flex-row flex-wrap gap-3">
        {props.sizes.map((size) => (
          <Button
            key={size.id}
            variant={sizes?.id === size.id ? "default" : "outline"}
            onClick={() => setSizes(size)}
          >
            {size.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SizesProduct;
