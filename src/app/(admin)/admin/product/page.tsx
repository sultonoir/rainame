"use client";

import TableProduct from "@/components/table/TableProduct";
import { api } from "@/trpc/react";
import React from "react";

const Page = () => {
  const { data: Product } = api.product.getAllProduct.useQuery();
  if (!Product) return;
  return <TableProduct products={Product} />;
};

export default Page;
