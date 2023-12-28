"use client";

import { type Rattings, type Products } from "@prisma/client";
import React from "react";
import { Card, CardBody, Image, CardFooter, Link } from "@nextui-org/react";
import { Star } from "lucide-react";
import NextImage from "next/image";
import { calculateTotalPrice } from "@/lib/utils";

type TProducts = {
  product: Products;
  rattings: Rattings[];
};

const CardProducts = ({ product, rattings }: TProducts) => {
  let totalRating = 0;
  let jumlahRatings = 0;

  // Iterasi melalui setiap objek rating
  for (const rating of rattings) {
    totalRating += rating.value;
    jumlahRatings++;
  }
  const rataRataRating = () => {
    if (jumlahRatings === 0) {
      return 0; // Menghindari pembagian oleh nol jika tidak ada ratings
    } else {
      const ratting = totalRating / jumlahRatings;
      return ratting;
    }
  };
  const rataRata = rataRataRating();
  const result = calculateTotalPrice({
    price: product.price,
    discount: product.discount,
  });
  return (
    <Card as={Link} href={`/product/${product.path}`} shadow="sm" isPressable>
      <CardBody className="relative overflow-visible p-0">
        {product.discount && product.discount > 0 && (
          <div className="absolute right-2.5 top-2.5 z-20 rounded-lg bg-danger px-2 py-1 text-small text-white">
            {product.discount}% off
          </div>
        )}
        <div className="w-full overflow-hidden p-2">
          <Image
            isZoomed
            radius="sm"
            as={NextImage}
            src={product.imageUrl.at(0)}
            width={400}
            height={400}
            alt={product?.name}
            className="aspect-square"
          />
        </div>
      </CardBody>
      <CardFooter className="flex-col gap-0.5 pt-0">
        <div className="flex h-auto w-full items-center">
          <p className="truncate text-small text-foreground">{product.name}</p>
        </div>
        <div className="flex w-full justify-between">
          {product.discount && product.discount > 0 ? (
            <div className="w-full text-start text-medium font-semibold">
              <span className="text-foreground-200 line-through">
                ${result.price}
              </span>{" "}
              ${result.discountedPrice}
            </div>
          ) : (
            <div className="w-full text-start text-medium font-semibold">
              ${result.price}
            </div>
          )}
          <p className="flex flex-row flex-nowrap items-center gap-x-1 text-xs">
            <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
            <span>{rataRata}</span>
            <span>{`(${rattings.length})`}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardProducts;
