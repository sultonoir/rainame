import CardProducts from "@/components/card/CardProducts";
import HomeBentoGrid from "@/components/home/HomeBentoGrid";
import HomeCategory from "@/components/home/HomeCategory";
import { api } from "@/trpc/server";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import React from "react";
import { getPlaiceholder } from "plaiceholder";
const page = async () => {
  const products = await api.product.filterProduct.query({});
  const promo = await api.promo.getPromo.query();
  const women = products
    .filter((item) => item.category === "Women")
    .slice(6, 12);
  const manProducts = products
    .filter((item) => item.category === "Man")
    .slice(0, 6);
  const promoForWoment = promo.find(
    (item) => item.name === "Women's shopping time",
  );

  const newPromo = await Promise.all(
    promo.map(async (item) => {
      const res = await fetch(item.imageUrl);
      const buffer = Buffer.from(await res.arrayBuffer());

      const { base64 } = await getPlaiceholder(buffer);
      return { ...item, base64 }; // Menggabungkan color ke dalam objek item
    }),
  );

  return (
    <>
      <HomeBentoGrid slides={newPromo} />

      <section className="my-10 flex flex-col justify-items-center gap-5">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">New Arrival</p>
          <Button as={Link} href="/product" variant="light" color="primary">
            Show more
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {products.slice(0, 6).map((product) => (
            <CardProducts
              key={product.id}
              product={product}
              rattings={product.rattings}
            />
          ))}
        </div>
        <HomeCategory />
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">Shop men</p>
          <Button
            as={Link}
            href="/product?category=Man"
            variant="light"
            color="primary"
          >
            Show more
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {manProducts.map((product) => (
            <CardProducts
              key={product.id}
              product={product}
              rattings={product.rattings}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">For women</p>
          <Button
            as={Link}
            href="/product?category=Women"
            variant="light"
            color="primary"
          >
            Show more
          </Button>
        </div>
        <Button
          as={Link}
          href="/product?category=Women"
          className="relative grid h-[500px] grid-cols-1 grid-rows-[500px] overflow-hidden rounded-large"
        >
          <Image
            fill
            src={promoForWoment?.imageUrl ?? ""}
            alt={promoForWoment?.name ?? "image"}
            className="object-cover"
          />
        </Button>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {women.reverse().map((product) => (
            <CardProducts
              key={product.id}
              product={product}
              rattings={product.rattings}
            />
          ))}
        </div>
        <div className="flex w-full justify-center gap-2">
          <Button
            size="md"
            color="primary"
            as={Link}
            href="/test"
            className="w-full max-w-xs"
          >
            View more
          </Button>
          <a
            href="/test"
            className="w-full max-w-xs rounded-large bg-danger px-2 py-1"
          >
            View more
          </a>
        </div>
      </section>
    </>
  );
};

export default page;
