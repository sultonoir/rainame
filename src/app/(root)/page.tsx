import { api } from "@/trpc/server";
import React from "react";
import CardProduct from "@/components/products/CardProduct";
import Test from "@/components/Test";

const page = async () => {
  const products = await api.product.getAllproducts();
  return (
    <div className="container py-5">
      <Test />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            imageProduct={product.imageUrl}
            details={product.details}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
