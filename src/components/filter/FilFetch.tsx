import { api } from "@/trpc/server";
import { type FilterProps } from "@/types";
import React from "react";
import NotFound from "../ui/not-found";
import FilProducts from "./FilProducts";

const FilFetch = async ({ searchParams }: FilterProps) => {
  const products = await api.product.filterProduct({
    category: searchParams.category?.split("+") ?? [],
    subCategory: searchParams.subCategory?.split("+") ?? [],
    min: searchParams.min,
    max: searchParams.max,
    title: searchParams.search,
    size: searchParams.size,
  });

  return (
    <React.Fragment>
      {!products || products.length === 0 ? (
        <NotFound />
      ) : (
        <FilProducts products={products} />
      )}
    </React.Fragment>
  );
};

export default FilFetch;
