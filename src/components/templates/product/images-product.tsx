"use client";
import { Lens } from "@/components/ui/lens";
import { type ProductImage } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  images: ProductImage[];
};

const ImagesProduct = ({ images }: Props) => {
  const [picture, setPicture] = React.useState(images[0]!);
  return (
    <div className="flex flex-col gap-5">
      <Lens className="aspect-square max-w-[660px]">
        <Image
          src={picture.url}
          alt={picture.id}
          fill
          placeholder="blur"
          blurDataURL={picture.thumbnail}
          className="rounded-lg object-cover"
        />
      </Lens>
      <div className="flex w-full max-w-[660px] flex-row justify-between">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg">
            <Image
              src={image.url}
              alt={image.id}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={image.thumbnail}
              onMouseEnter={() => setPicture(image)}
              onClick={() => setPicture(image)}
              className="aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesProduct;
