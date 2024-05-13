"use client";
import { type ImageProduct, type Product } from "@/server/db/schema";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BadgePercent, ScanIcon, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import useCart from "@/hook/useCart";
import ButtonWishlist from "./ButtonWishlist";
import { cn } from "@/lib/utils";
interface Props {
  product: Product;
  imageProduct: ImageProduct[];
}

const CardProduct = ({ product, imageProduct }: Props) => {
  const { increment } = useCart();
  function calculated() {
    const price = product.price;
    const discount = product.discount;
    let total = price;

    if (discount && discount > 0) {
      const discountAmount = (price * discount) / 100;
      total = price - discountAmount;
    }
    total = parseFloat(total.toFixed(2));
    return total;
  }

  const totalPrice = calculated();

  const handleClick = () => {
    increment({ id: product.id, amount: 1, price: totalPrice });
  };

  return (
    <Card key={product.id} className="border-none shadow-none">
      <CardContent className="group relative p-0">
        <div className="absolute top-1 z-10 w-full px-4">
          <div
            className={cn("flex w-full items-center justify-end", {
              "justify-between": product.discount > 0,
            })}
          >
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border bg-background px-3 py-1",
                {
                  hidden: product.discount === 0,
                },
              )}
            >
              <BadgePercent size={14} />
              <span className="text-[12px]">{product.discount}% Discount</span>
            </div>
            <ButtonWishlist id={product.id} />
          </div>
        </div>
        <div className="invisible absolute inset-x-1 bottom-0 z-10 justify-center gap-1 opacity-0 transition-all group-hover:visible group-hover:bottom-4 group-hover:opacity-100 lg:flex">
          <Button
            className="h-min rounded-full bg-popover text-[12px] text-foreground hover:bg-secondary hover:text-foreground"
            startContent={<ShoppingBag size={15} className="mr-2" />}
            onClick={handleClick}
          >
            Add to bag
          </Button>
          <Button
            className="h-min rounded-full bg-foreground text-[12px] text-background hover:bg-foreground/80"
            startContent={<ScanIcon size={15} className="mr-2" />}
          >
            Quick view
          </Button>
        </div>
        {imageProduct.map((item) => (
          <div
            className="relative m-1 aspect-square overflow-hidden rounded-lg"
            key={item.id}
          >
            <Link
              href={`/product/${product.slug}`}
              title={product.title}
              className="absolute inset-0 z-[1]"
            />
            <Image
              src={item.url}
              alt={product.title}
              fill
              placeholder="blur"
              className="object-cover"
              blurDataURL={item.blur}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 p-1">
        <p className="max-w-[calc(100%-10px)] truncate text-[15px] font-semibold text-muted-foreground">
          {product.title}
        </p>
        {product.discount > 0 ? (
          <div className="flex items-center justify-start gap-2">
            <p className="text-destructive line-through">${product.price}</p>
            <p className="font-semibold">${totalPrice}</p>
          </div>
        ) : (
          <p className="font-semibold">${product.price}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
