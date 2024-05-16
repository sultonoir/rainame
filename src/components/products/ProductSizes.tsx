"use client";
import { type Details } from "@/server/db/schema";
import React from "react";
import { Button } from "../ui/button";
import useCart from "@/hook/useCart";

interface Props {
  details: Details[];
}

const ProductSizes = ({ details }: Props) => {
  const [size, setSize] = React.useState(details.at(0)!.sizeId);
  const { changeSize, setInitial } = useCart();
  const findDetail = details.find((item) => item.sizeId === size);

  React.useEffect(() => {
    setInitial(size, 1);
  }, [setInitial, size]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center gap-2">
        <p className="font-medium text-muted-foreground">Size :</p>
        <p className="uppercase">{findDetail?.sizeId}</p>
      </div>
      <div className="flex w-full flex-row  items-center gap-2">
        {details.map((item) => (
          <Button
            key={item.id}
            disabled={item.stock === 0}
            onClick={() => {
              setSize(item.sizeId);
              changeSize(item.sizeId);
            }}
            className="w-full"
            size="icon"
            variant={item.sizeId === size ? "default" : "outline"}
          >
            {item.sizeId.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizes;
