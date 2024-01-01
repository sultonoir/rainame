"use client";

import { type Products, type Rattings } from "@prisma/client";
import React from "react";
import HomeCategory from "./HomeCategory";
import { Button, Link } from "@nextui-org/react";
import CardProducts from "../card/CardProducts";
import HomeBentoGrid from "./HomeBentoGrid";

type THome = {
  products: Array<
    Products & {
      rattings: Rattings[];
    }
  >;
};

const HomeClient = ({ products }: THome) => {
  return (
    <>
      <HomeBentoGrid products={products} />
      {/* home category */}
      <HomeCategory />
      <section className="my-10 flex flex-col gap-5">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">New Arrival</p>
          <Button as={Link} href="/product" variant="light" color="primary">
            Show more
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <CardProducts
              key={product.id}
              product={product}
              rattings={product.rattings}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeClient;
