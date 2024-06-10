import React from "react";
import Products from "@/components/products/Products";
import ProductLoading from "@/components/loading/ProductLoading";

const page = () => {
  return (
    <div className="container min-h-dvh py-5">
      <React.Suspense
        fallback={<ProductLoading className="lg:grid-cols-4" length={4} />}
      >
        <Products />
      </React.Suspense>
    </div>
  );
};

export default page;
