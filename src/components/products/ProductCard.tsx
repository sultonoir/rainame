"use client";
import {
  type Details,
  type ImageProduct,
  type Product,
} from "@/server/db/schema";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ScanIcon, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import ButtonWishlist from "./ButtonWishlist";
import { api } from "@/trpc/react";
import { toast } from "sonner";
interface Props {
  product: Product;
  imageProduct: ImageProduct[];
  details: Details[];
}

const ProductCard = ({ product, imageProduct, details }: Props) => {
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
  const ctx = api.useUtils();
  const { mutate, isPending } = api.cart.createCart.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: () => {
      toast.success("Product Successfully Added");
    },
    onSettled: async () => {
      await ctx.cart.getCart.invalidate();
      await ctx.cart.getIndicator.invalidate();
    },
  });
  const handleClick = () => {
    {
      mutate({
        productId: product.id,
        totalPrice,
        size: details.at(0)?.sizeId ?? "",
        totalProduct: 1,
      });
    }
  };

  return (
    <Card key={product.id} className="border-none shadow-none">
      <CardContent className="group relative p-0">
        <div className="absolute top-1 z-10 w-full px-4">
          <div className="flex w-full items-center justify-end">
            <ButtonWishlist
              id={product.id}
              size="icon"
              className="rounded-full border-slate-200 bg-slate-200 hover:bg-slate-300"
            />
          </div>
        </div>
        <div className="invisible absolute inset-x-1 bottom-0 z-10 justify-center gap-1 opacity-0 transition-all group-hover:visible group-hover:bottom-4 group-hover:opacity-100 lg:flex">
          <Button
            className="h-min rounded-full bg-popover text-[12px] text-foreground hover:bg-secondary hover:text-foreground"
            disabled={isPending}
            isLoading={isPending}
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
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold">${totalPrice}</p>
            <div className="flex items-center gap-1 text-sm">
              <p className="text-sm leading-none text-muted-foreground line-through">
                ${product.price}
              </p>
              <p className="rounded-lg bg-red-50 px-2 py-0.5 text-[13px] font-medium leading-none text-red-600">
                {product.discount}%
              </p>
            </div>
          </div>
        ) : (
          <p className="font-semibold">${product.price}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
