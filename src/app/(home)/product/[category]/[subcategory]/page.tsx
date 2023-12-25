import CardProducts from "@/components/card/CardProducts";
import { api } from "@/trpc/server";
import React from "react";

const Page = async ({
  params,
}: {
  params: { subcategory: string; category: string };
}) => {
  const products = await api.product.getProductBycategory.query({
    category: params.category,
    subcategory: params.subcategory,
  });

  console.log(params);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {products.map((product) => (
        <CardProducts
          key={product.id}
          product={product}
          rattings={product.rattings}
        />
      ))}
    </div>
  );
};

export default Page;
