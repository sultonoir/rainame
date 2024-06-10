"use client";
import React from "react";
import NotFound from "../ui/not-found";
import FilProducts from "./FilProducts";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import ProductLoading from "../loading/ProductLoading";

const FilFetch = () => {
  const searchParams = useSearchParams();
  const { data: products, isLoading } = api.product.filterProduct.useQuery({
    category: searchParams?.get("category")?.split("+") ?? [],
    subCategory: searchParams?.get("subCategory")?.split("+") ?? [],
    min: searchParams?.get("min") ?? undefined,
    max: searchParams?.get("max") ?? undefined,
    title: searchParams?.get("search") ?? undefined,
    size: searchParams?.get("size") ?? undefined,
  });

  return (
    <React.Fragment>
      {isLoading ? (
        <ProductLoading />
      ) : !products || products.length === 0 ? (
        <NotFound />
      ) : (
        <FilProducts products={products} />
      )}
    </React.Fragment>
  );
};

export default FilFetch;
