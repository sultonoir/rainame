import CardProduct from "@/components/templates/product/card-product";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

export const metadata : Metadata ={
  title : "Home"
}

const Page = async () => {
  const products = await api.product.list();
  return (
    <main className="container relative z-0 min-h-screen py-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((item) => (
          <CardProduct product={item} key={item.id} />
        ))}
      </div>
    </main>
  );
};

export default Page;
