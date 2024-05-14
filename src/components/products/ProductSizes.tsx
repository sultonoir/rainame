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
  const { changeSize } = useCart();
  const findDetail = details.find((item) => item.id === size);

  React.useEffect(() => {
    changeSize(size);
  }, [changeSize, size]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center gap-2">
        <p className="font-medium text-muted-foreground">Stock :</p>
        <p>{findDetail?.stock}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium text-muted-foreground">Size :</p>
        <p className="uppercase">{findDetail?.sizeId}</p>
      </div>
      <div className="flex flex-wrap items-center space-x-2">
        {details.map((item) => (
          <Button
            key={item.id}
            onClick={() => setSize(item.sizeId)}
            className="h-10 w-20 rounded-2xl lg:h-11"
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
