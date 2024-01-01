"use client";

import { Image } from "@nextui-org/react";
import { type Products } from "@prisma/client";
import React from "react";

type Props = {
  products: Products[];
};

const HomeBentoGrid = ({ products }: Props) => {
  const post = products.at(1);

  return (
    <section className=" relative mb-10 grid h-[calc(100dvh-100px)] grid-cols-12 grid-rows-6 gap-5 overflow-hidden">
      <div className="col-span-3 row-start-1 rounded-2xl bg-content1 p-2">
        {products.at(0)?.name}
      </div>
      <div className="col-span-3 row-start-2 row-end-5 overflow-hidden rounded-2xl bg-content1 p-2">
        <div className="flex flex-col gap-2">
          <p className="text-lg text-default-400">{post?.name}</p>
          <p className="text-4xl font-semibold">${post?.price}</p>
          <Image
            src={post?.imageUrl.at(0) ?? ""}
            alt={post?.name ?? "image"}
            radius="sm"
            className="aspect-square object-cover"
          />
        </div>
      </div>
      <div className="col-span-9 row-start-5 row-end-7 rounded-2xl bg-content1"></div>
      <div className="col-span-3 row-start-5 row-end-7 rounded-2xl bg-content1"></div>
      <div className="col-span-6 row-start-1 row-end-5 rounded-2xl bg-content1"></div>
      <div className="col-span-3 row-start-1 row-end-5 rounded-2xl bg-content1"></div>
    </section>
  );
};

export default HomeBentoGrid;
