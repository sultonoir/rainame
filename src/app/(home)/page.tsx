import HomeCategory from "@/components/home/HomeCategory";
import HomeNewArrival from "@/components/home/HomeNewArrival";
import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";

const page = async () => {
  const products = await api.product.getAllProduct.query();
  return (
    <main className="container">
      <section className="relative mt-2 h-[30dvh] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 z-10 h-full w-full bg-content1 opacity-40"></div>
        <Image src="/Logo.png" alt="logo" fill className="object-cover" />
      </section>
      <HomeCategory />
      <HomeNewArrival products={products} />
    </main>
  );
};

export default page;
