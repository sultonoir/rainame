import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductImage from "@/components/products/ProductImage";
import { calculate } from "@/lib/totalprice";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import ProductSizes from "@/components/products/ProductSizes";
import ProductPayment from "@/components/products/ProductPayment";

interface Props {
  params: { slug: string };
}

const Page = async ({ params }: Props) => {
  const product = await api.product.getProduct({
    id: params.slug,
  });

  if (!product) {
    notFound();
  }

  const totalPrice = calculate({
    discount: product.discount,
    price: product.price,
  });

  return (
    <div className="container space-y-5 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/product/${product?.category?.id}`}>
              {product?.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/product/${product?.subCategory?.id}`}>
              {product?.subCategory?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col space-x-10 lg:flex-row">
        <div className="w-[55%] ">
          <ProductImage images={product?.imageUrl} />
        </div>
        <div className="w-[45%] space-y-5">
          <h1 className="font-semibold lg:text-2xl">{product?.title}</h1>
          <div className="flex  items-center space-x-2">
            <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
              <span className="!leading-none text-green-500">
                ${totalPrice}
              </span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 font-medium">
              <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
              {product.ratings > 0 ? product.ratings : "New"}
            </div>
          </div>
          <ProductSizes details={product.details} />
          <ProductPayment id={product.id} price={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Page;
