import { calculateTotalPrice, cn } from "@/lib/utils";
import React, { type HTMLAttributes } from "react";

interface PriceProductProps extends HTMLAttributes<HTMLDivElement> {
  discount: number;
  price: number;
}

const PriceProduct = ({
  price,
  discount,
  className,
  ...props
}: PriceProductProps) => {
  const discountedPrice = calculateTotalPrice({
    price: price,
    discount: discount,
  });
  return (
    <div
      className={cn("flex items-center gap-2 text-sm lg:text-lg", className)}
      {...props}
    >
      <div className="rounded-sm border border-green-500 px-2 py-0.5 font-bold text-green-500">
        ${discountedPrice}
      </div>
      {discount > 0 && (
        <>
          <p className="text-muted-foreground line-through">${price}</p>
          <p
            className={cn("hidden lg:block", {
              "text-foreground": discount > 0,
              "font-bold": discount > 0,
            })}
          >
            -{discount}%
          </p>
        </>
      )}
    </div>
  );
};

export default PriceProduct;
