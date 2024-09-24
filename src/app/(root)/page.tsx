import CardProduct from "@/components/templates/product/card-product";
import { api } from "@/trpc/server";
import React from "react";

const Page = async () => {
  const products = await api.product.list();
  return (
    <main className="container relative z-0 min-h-screen py-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <CardProduct product={item} key={item.id} />
        ))}
      </div>
    </main>
  );
};

export default Page;
