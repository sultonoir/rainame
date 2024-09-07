import { type ProductPage } from "@/types";
import React from "react";
import ImagesProduct from "./images-product";
import PriceProduct from "./price-product";
import CouponProduct from "./coupon-product";
import AboutProduct from "./about-product";
import SizesProduct from "./sizes-product";
import PaymentProduct from "./payment-product";
import TitleProduct from "./title-product";

interface Props {
  data: ProductPage;
}

const PageProduct = ({ data }: Props) => {
  return (
    <div className="container my-10 min-h-screen space-y-4">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="relative basis-7/12">
          <ImagesProduct images={data.productImage} />
        </div>
        <div className="basis-5/12 space-y-4">
          <TitleProduct title={data.name} rating={data.rating} />
          <PriceProduct discount={data.discount} price={data.price} />
          <CouponProduct
            coupon={data.coupon[0]!}
            amount={data.coupon.length}
            type="multiple"
          />
          <AboutProduct about={data.desc} />
          <SizesProduct sizes={data.stockandsize} />
          <PaymentProduct id={data.id} />
          <div className="h-screen"></div>
        </div>
      </div>
    </div>
  );
};

export default PageProduct;
