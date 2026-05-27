import { getProductCard } from "@/modules/product/product.action";
import { ProductCardSort } from "@/modules/product/product.types";
import React from "react";
import ProductCard from "./product-card";

type Props = {
  sort: ProductCardSort;
};

const ProductList = async ({ sort }: Props) => {
  const products = await getProductCard({ sort });
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
