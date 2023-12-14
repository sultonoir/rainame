"use client";

import TableProduct from "@/components/table/TableProduct";
import { api } from "@/trpc/react";
import { Spinner } from "@nextui-org/react";
import React from "react";

const Page = () => {
  const { data: Product, isLoading } = api.product.getAllProduct.useQuery();
  if (isLoading) {
    return (
      <main className="relative">
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      </main>
    );
  }
  if (!Product) return;
  return <TableProduct products={Product} />;
};

export default Page;
