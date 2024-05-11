import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormCreateProduct from "@/components/form/createproduct/FormCreateProduct";
import FormCreateSizes from "@/components/form/createsize/CreateSizes";
import FormCreateCategory from "@/components/form/createcategory/FormCreateCategory";

export const metadata = {
  title: "Create product - Rainame",
  description:
    "Welcome to Rainame, where style meets convenience. Dive into a world of fashion-forward trends and timeless classics, all at your fingertips. Whether you're seeking the perfect outfit for a night out or elevating your everyday wardrobe, Rainame offers a curated selection of clothing, accessories, and footwear to suit every taste and occasion. With seamless navigation and hassle-free shopping, indulge in a personalized experience tailored to your preferences. Embrace your individuality and let your style shine with Rainame, where fashion is more than just clothing—it's an expression of self",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const Page = () => {
  return (
    <div className="container py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FormCreateProduct />
      <FormCreateSizes />
      <FormCreateCategory />
    </div>
  );
};

export default Page;
