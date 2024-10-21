import { FormProduct } from "@/components/templates/form/product/form-product";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create product page",
};

const Page = () => {
  return (
    <React.Fragment>
      <FormProduct />
    </React.Fragment>
  );
};

export default Page;
