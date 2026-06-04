import CartPage from "@/components/cart/cart-page";
import ReviewSkeleton from "@/components/review/review-skeleton";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<ReviewSkeleton />}>
      <CartPage />
    </Suspense>
  );
};

export default Page;
