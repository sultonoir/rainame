import React from "react";
import Products from "@/components/products/Products";
import ProductLoading from "@/components/loading/ProductLoading";

const page = async () => {
  return (
    <div className="container py-5">
      <React.Suspense fallback={<ProductLoading />}>
        <Products />
      </React.Suspense>
    </div>
  );
};

export default page;
