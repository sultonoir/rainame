import HomeClient from "@/components/home/HomeClient";
import { api } from "@/trpc/server";
import React from "react";

const page = async () => {
  const products = await api.product.getAllProduct.query();
  return <HomeClient products={products} />;
};

export default page;
