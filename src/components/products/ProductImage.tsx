"use client";
import { type ImageProduct } from "@/server/db/schema";
import Image from "next/image";
import React from "react";

interface Props {
  images: ImageProduct[] | undefined;
}

const ProductImage = ({ images }: Props) => {
  const [highligt, setHighligt] = React.useState<string | undefined>(
    images?.at(0)?.url,
  );
  return (
    <div
      className="grid h-fit gap-2"
      onMouseLeave={() => setHighligt(images?.at(0)?.url)}
    >
      <div className="relative aspect-square overflow-hidden rounded-md lg:text-white">
        <Image
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          src={highligt ?? "/placeholder.png"}
          fill
          placeholder="blur"
          loading="eager"
          sizes="(min-width: 1500px) 860px, (min-width: 1040px) 550px, calc(100vw - 64px)"
          blurDataURL={images?.at(0)?.blur}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images?.slice(0, 4).map((img) => (
          <div
            key={img.id}
            className="relative aspect-square"
            onMouseEnter={() => setHighligt(img.url)}
            onClick={() => setHighligt(img.url)}
          >
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              src={img.url}
              fill
              sizes="(min-width: 1480px) 200px, (min-width: 1040px) 9px, calc(40vw - 22px)"
              placeholder="blur"
              blurDataURL={img.blur}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
