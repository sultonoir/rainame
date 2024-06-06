import React from "react";
import ProductCard from "./ProductCard";
import { api } from "@/trpc/server";

const Products = async () => {
  const products = await api.product.getAllproducts();
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          imageProduct={product.imageUrl}
          details={product.details}
        />
      ))}
    </div>
  );
};

export default Products;
