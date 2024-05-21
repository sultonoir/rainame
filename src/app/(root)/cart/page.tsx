import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CartPage from "@/components/cart/CartPage";

export const metadata = {
  title: "Cart - Rainame",
  description:
    "Welcome to Rainame, where style meets convenience. Dive into a world of fashion-forward trends and timeless classics, all at your fingertips. Whether you're seeking the perfect outfit for a night out or elevating your everyday wardrobe, Rainame offers a curated selection of clothing, accessories, and footwear to suit every taste and occasion. With seamless navigation and hassle-free shopping, indulge in a personalized experience tailored to your preferences. Embrace your individuality and let your style shine with Rainame, where fashion is more than just clothing—it's an expression of self",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Page = () => {
  return (
    <div className="container min-h-dvh py-5">
      <div className="space-y-2 py-10">
        <h1 className="text-3xl font-bold">Shopping cart</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <CartPage />
    </div>
  );
};

export default Page;
