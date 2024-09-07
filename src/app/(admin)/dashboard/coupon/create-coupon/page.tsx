
import { CreateCoupon } from "@/components/templates/form/coupon/create-coupon";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Coupon",
  description: "Create coupon page",
};

const Page = () => {
  return (
    <React.Fragment>
      <CreateCoupon/>
    </React.Fragment>
  );
};

export default Page;
