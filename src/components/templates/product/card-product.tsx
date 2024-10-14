"use client";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ProductCard } from "@/types";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "../button/wishlist-button";
import TotalRating from "../rating/total-rating";
import PriceProduct from "./price-product";

type Props = {
  product: ProductCard;
};

const CardProduct = ({ product }: Props) => {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="relative aspect-9/16 overflow-hidden rounded-lg p-0">
          <Image
            alt={product.name}
            src={product.productImage.url}
            fill
            sizes="(min-width: 1540px) 309px, (min-width: 1280px) 500px, (min-width: 1040px) calc(25vw - 28px), (min-width: 780px) calc(33.33vw - 32px), calc(50vw - 40px"
            blurDataURL={product.productImage.thumbnail}
            placeholder="blur"
            className="object-cover"
          />
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
          <div className="flex items-center">
            <PriceProduct
              discount={product.discount}
              price={product.price}
              className="flex-grow"
            />
            <TotalRating rating={product.rating} />
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
