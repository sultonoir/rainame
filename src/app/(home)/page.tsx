import CardProducts from "@/components/card/CardProducts";
import HomeBentoGrid from "@/components/home/HomeBentoGrid";
import HomeCategory from "@/components/home/HomeCategory";
import { api } from "@/trpc/server";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import React from "react";

const page = async () => {
  const products = await api.product.filterProduct.query({});
  const promo = await api.promo.getPromoAndProduct.query();
  const discountProduct = products
    .filter((item) => item.discount! > 0)
    .slice(0, 5);
  return (
    <>
      <HomeBentoGrid promo={promo} />
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
          {products.slice(0, 5).map((product) => (
            <CardProducts
              key={product.id}
              product={product}
              rattings={product.rattings}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">Discount</p>
          <Button
            as={Link}
            href="/product?discount=true"
            variant="light"
            color="primary"
          >
            Show more
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {discountProduct.map((product) => (
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

export default page;
