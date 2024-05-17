import React from "react";
import ProductCard from "./ProductCard";
import { api } from "@/trpc/server";

const Products = async () => {
  const products = await api.product.getAllproducts();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
