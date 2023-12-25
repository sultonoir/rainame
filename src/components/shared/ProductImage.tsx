import { Image } from "@nextui-org/react";
import { type Products } from "@prisma/client";
import React, { useState } from "react";

type Props = {
  product: Products;
};

const ProductImage = ({ product }: Props) => {
  const imageUrl = product?.imageUrl.map((e) => ({
    image: e,
  }));
  const [picture, setPicture] = useState<string>(imageUrl.at(0)?.image ?? "");
  return (
    <div className="sticky top-24 flex flex-col gap-5">
      <div className="ml-auto w-full overflow-hidden">
        <Image
          classNames={{
            wrapper: "mx-auto",
          }}
          isZoomed
          src={picture}
          width={400}
          height={400}
          alt={product?.name}
          loading="eager"
          className="aspect-square"
        />
      </div>
      <div className="flex w-full flex-row justify-center gap-x-5">
        {product?.imageUrl.map((e) => (
          <Image
            isZoomed
            isBlurred={picture === e}
            key={e}
            src={e}
            width={80}
            height={80}
            alt={product?.name}
            onMouseEnter={() => setPicture(e)}
            onClick={() => setPicture(e)}
            className="aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
