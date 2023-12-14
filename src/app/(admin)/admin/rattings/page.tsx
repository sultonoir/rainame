"use client";

import Test from "@/components/test";
import { api } from "@/trpc/react";
import React from "react";

const Page = () => {
  const { data } = api.product.getAllProduct.useQuery();
  return <Test Products={data} />;
};

export default Page;
