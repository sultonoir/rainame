"use client";
import {
  type Details,
  type ImageProduct,
  type Product,
} from "@/server/db/schema";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import ProductCard from "../products/ProductCard";

interface Pros {
  products: Array<
    Product & {
      imageUrl: ImageProduct[];
      details: Details[];
      lineitems: number;
    }
  >;
}

const FilProducts = ({ products }: Pros) => {
  const searchParams = useSearchParams();
  const sort = searchParams?.get("sort");

  const sortsProduct = useMemo(() => {
    const newProducts = [...products];

    switch (sort) {
      case "best-selling":
        return newProducts;

      case "price-low-to-high":
        return newProducts.sort((a, b) => a.price - b.price);

      case "price-high-to-low":
        return newProducts.sort((a, b) => b.price - a.price);

      case "date-old-to-new":
        return newProducts.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
        );

      case "date-new-to-old":
        return newProducts.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );

      default:
        return newProducts;
    }
  }, [products, sort]);

  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {sortsProduct.map((item) => (
        <ProductCard
          product={item}
          key={item.id}
          imageProduct={item.imageUrl}
          details={item.details}
        />
      ))}
    </div>
  );
};

export default FilProducts;
