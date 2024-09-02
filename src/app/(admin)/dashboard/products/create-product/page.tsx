import { CreateProduct } from "@/components/templates/form/product/create-product";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create product page",
};

const Page = () => {
  return (
    <React.Fragment>
      <CreateProduct />
    </React.Fragment>
  );
};

export default Page;
