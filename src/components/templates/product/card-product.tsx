import React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <Card className="relative rounded-2xl border border-border/50 p-2 shadow-lg dark:bg-muted/50">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10"
        title={product.name}
      />
      <div className="relative block aspect-9/16 overflow-hidden rounded-lg p-0">
        <WishlistButton
          size="icon"
          className="absolute right-2 top-2 z-10 rounded-full border border-border/10 bg-white px-2 py-1 backdrop-blur-lg hover:bg-transparent hover:opacity-80"
          isWislist={product.wishlist}
          title="add to wishlist"
          productId={product.id}
        />
        <Image
          alt={product.name}
          src={product.productImage.url}
          fill
          sizes="(min-width: 1540px) 309px, (min-width: 1280px) 500px, (min-width: 1040px) calc(25vw - 28px), (min-width: 780px) calc(33.33vw - 32px), calc(50vw - 40px"
          blurDataURL={product.productImage.thumbnail}
          placeholder="blur"
          className="object-cover"
        />
      </div>
      <CardContent className="relative mt-4 rounded-lg bg-accent p-2 dark:bg-muted">
        <CardTitle className="w-[calc(100%-1px)] truncate text-[16px] font-bold leading-normal">
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
      </CardContent>
    </Card>
  );
};

export default CardProduct;
