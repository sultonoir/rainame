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
import { HeartIcon, Star, Stars } from "lucide-react";

type Props = {
  product: ProductCard;
};

const CardProduct = ({ product }: Props) => {
  const discountedPrice = calculateTotalPrice({
    price: product.price,
    discount: product.discount,
  });

  return (
    <Card className="border-none bg-transparent shadow-none">
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="aspect-square overflow-hidden rounded-lg p-0">
          <Image
            alt={product.name}
            src={product.productImage.url}
            width={500}
            height={200}
            blurDataURL={product.productImage.thumbnail}
            placeholder="blur"
            className="relative -z-10 aspect-square object-cover"
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
          <div className="flex">
            <div className="flex flex-1 gap-1 leading-none">
              <CardDescription
                className={cn("text-lg", {
                  "text-destructive": product.discount > 0,
                  "font-bold": product.discount > 0,
                })}
              >
                ${product.price}
              </CardDescription>
              <CardDescription className="text-lg line-through">
                ${discountedPrice}
              </CardDescription>
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
        <div className="absolute right-0 top-0">
          <HeartIcon className="!size-8 fill-rose-600 stroke-red-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
