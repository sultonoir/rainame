import CardProducts from "@/components/card/CardProducts";
import { api } from "@/trpc/server";
import React from "react";

const page = async () => {
  const product = await api.product.getAllProduct.query();
  return (
    <div>
      <a href="/" className="w-fit rounded-lg bg-primary px-2 py-1">
        back
      </a>
      {product.map((item) => (
        <CardProducts key={item.id} product={item} rattings={item.rattings} />
      ))}
    </div>
  );
};

export default page;
