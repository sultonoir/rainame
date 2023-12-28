"use client";
import { Preview } from "@/components/shared/Preview";
import ProductImage from "@/components/shared/ProductImage";
import ProductPayment from "@/components/shared/ProductPayment";
import { calculateTotalPrice } from "@/lib/utils";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { type Products, type Rattings } from "@prisma/client";
import { Star } from "lucide-react";
import React, { useState } from "react";

type TName = {
  product: Products & {
    rattings: Rattings[];
  };
};

const NameClient = ({ product }: TName) => {
  const [readmore, setReadmore] = useState<boolean>(true);
  const [selectColor, setSelectColor] = useState(product.color.at(0) ?? "");
  const [selectSize, setSelectSize] = useState(product.size.at(0));

  const selling = product.selling ? product.selling : 0;

  let totalRating = 0;
  let jumlahRatings = 0;

  // Iterasi melalui setiap objek rating
  for (const rating of product.rattings) {
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

  const discount = result.discountedPrice;
  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <div className="relative">
        <ProductImage product={product} />
      </div>
      <div className="flex flex-col">
        <Breadcrumbs>
          <BreadcrumbItem href="/product">product</BreadcrumbItem>
          <BreadcrumbItem href={`/product/${product.path}`}>
            {product.name}
          </BreadcrumbItem>
        </Breadcrumbs>
        <h1 className="border-b border-default-100 py-3 text-xl font-semibold">
          {product?.name}
        </h1>
        <div className="flex w-full flex-col gap-y-5 border-b border-default-100 pb-3">
          <div className="flex w-full flex-row items-center justify-between gap-x-2">
            <div className="flex items-center justify-center">
              <p className="text-medium">
                Selling {selling}
                <span className="text-2xl">.</span>
              </p>
            </div>
            <p className="text-me flex flex-row flex-nowrap items-center gap-x-1">
              <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
              <span>{rataRata}</span>
              <span>{`(${product.rattings.length})`}</span>
            </p>
          </div>
          {product.discount && product.discount > 0 ? (
            <div className="flex flex-col">
              <h2 className="text-3xl font-semibold">${discount}</h2>
              <p className="flex items-center gap-2 text-2xl">
                <span className="text-foreground-200 line-through">
                  ${product.price}
                </span>
                <span className="rounded-lg bg-primary/60 px-2 py-1.5 text-medium">
                  {product.discount}% off
                </span>
              </p>
            </div>
          ) : (
            <h2 className="text-3xl font-semibold">${discount}</h2>
          )}
        </div>
        <div className="flex flex-col gap-y-3 border-b border-default-100 py-5">
          <h2>
            <span className="font-semibold text-default-400">
              Choice color :
            </span>{" "}
            {product.color.length}
          </h2>
          <div className="flex w-full flex-row flex-wrap gap-2">
            {product?.color.map((e) => (
              <Button
                key={e}
                variant="bordered"
                className={`${
                  e === selectColor &&
                  "border border-primary bg-primary text-white"
                } hover:border hover:border-primary hover:bg-primary hover:text-white dark:text-white `}
                onPress={() => setSelectColor(e)}
              >
                {e}
              </Button>
            ))}
          </div>
          {product.size.length > 0 && (
            <>
              <h2>Choice Size</h2>
              <div className="flex w-full flex-row flex-wrap gap-2">
                {product.size.map((e) => (
                  <Button
                    key={e}
                    variant="bordered"
                    className={`${
                      e === selectSize &&
                      "border border-primary bg-primary text-white"
                    } hover:border hover:border-primary hover:bg-primary hover:text-white dark:text-white `}
                    onPress={() => setSelectSize(e)}
                  >
                    {e}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="relative flex w-full border-b border-default-100 py-5">
          <div className="absolute bottom-[-1px] border-b border-primary px-2 py-1">
            Details
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-3 border-b border-default-100 py-3">
          {readmore && product.desc.length > 150 ? (
            <Preview value={product.desc} readmore={readmore} />
          ) : (
            <Preview value={product.desc} readmore={readmore} />
          )}
          {product.desc.length > 150 && (
            <span
              className="cursor-pointer font-semibold text-primary hover:opacity-80"
              onClick={() => {
                setReadmore(!readmore);
              }}
            >
              View more
            </span>
          )}
        </div>
      </div>
      <div className="relative">
        <ProductPayment
          product={product}
          color={selectColor}
          size={selectSize}
        />
      </div>
    </section>
  );
};

export default NameClient;
