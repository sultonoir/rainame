"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ProductCard } from "@/types";
import Image from "next/image";
import { calculateTotalPrice, cn } from "@/lib/utils";
import Link from "next/link";
import { Star, Stars } from "lucide-react";
import WishlistButton from "../button/wishlist-button";
import { Lens } from "@/components/ui/lens";

type Props = {
  product: ProductCard;
};

const CardProduct = ({ product }: Props) => {
  const [hovering, setHovering] = React.useState(false);
  const discountedPrice = calculateTotalPrice({
    price: product.price,
    discount: product.discount,
  });

  return (
    <Card className="border-none bg-transparent shadow-none">
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="aspect-square overflow-hidden rounded-lg p-0">
          <Lens hovering={hovering} setHovering={setHovering}>
            <Image
              alt={product.name}
              src={product.productImage.url}
              width={500}
              height={500}
              blurDataURL={product.productImage.thumbnail}
              placeholder="blur"
              className="relative -z-10 aspect-square object-cover"
            />
          </Lens>
        </CardHeader>
      </Link>
      <CardContent className="relative mt-4 p-0">
        <Link
          href={`/products/${product.slug}`}
          className="flex flex-col space-y-1.5"
        >
          <CardTitle className="w-[calc(100%-50px)] truncate text-lg font-bold">
            {product.name}
          </CardTitle>
          <div className="flex">
            <div className="flex flex-1 gap-1 leading-none">
              <CardDescription
                className={cn("text-lg", {
                  "text-destructive": product.discount > 0,
                  "font-bold": product.discount > 0,
                })}
              >
                ${discountedPrice}
              </CardDescription>
              {product.discount > 0 && (
                <CardDescription className="text-lg line-through">
                  ${product.price}
                </CardDescription>
              )}
            </div>
            <div className="flex-shrink-0">
              {product.rating > 0 ? (
                <div className="flex items-center space-x-1.5">
                  <Star size={13} />
                  <span>{product.rating}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-sm">
                  <Stars size={13} />
                  <span>New</span>
                </div>
              )}
            </div>
          </div>
        </Link>
        <WishlistButton
          variant="ghost"
          size="icon"
          className="absolute -top-1 right-0 hover:bg-transparent"
          isWislist={product.wishlist}
          productId={product.id}
        />
      </CardContent>
    </Card>
  );
};

export default CardProduct;
