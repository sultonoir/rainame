"use client";
import React from "react";
import { api } from "@/trpc/react";
import ProductLoading from "../loading/ProductLoading";
import ProductCard from "../products/ProductCard";

const Recomendation = () => {
  const { data: products, isLoading } = api.product.getAllproducts.useQuery();
  return (
    <React.Fragment>
      {isLoading && <ProductLoading />}
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
    </React.Fragment>
  );
};

export default Recomendation;