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
    <div className="sticky top-24 flex flex-col gap-5">
      <div className="aspect-9/16 flex max-h-[600px] justify-center">
        <Lens>
          <Image
            src={picture.url}
            alt={picture.id}
            width={500}
            height={600}
            placeholder="blur"
            blurDataURL={picture.thumbnail}
            className="object-cover"
          />
        </Lens>
      </div>

      <div className="flex w-full flex-row justify-center gap-x-5">
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
