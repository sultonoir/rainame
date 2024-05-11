import { api } from "@/trpc/server";
import React from "react";
import ProductClient from "./ProductClient";

interface Props {
  path?: string;
  min?: string;
  max?: string;
  category?: string;
  colors?: string;
}

interface HomeProps {
  searchParams: Props;
}

const Page = async ({ searchParams }: HomeProps) => {
  const products = await api.product.filterProduct.query(searchParams);

  return <ProductClient products={products} />;
};

export default Page;
