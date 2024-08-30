import { ComboboxDemo } from "@/components/templates/category/select-category";
import { CreateProduct } from "@/components/templates/form/product/create-product";
import React from "react";

const Page = () => {
  return (
    <div>
      <CreateProduct />
      <ComboboxDemo />
    </div>
  );
};

export default Page;
