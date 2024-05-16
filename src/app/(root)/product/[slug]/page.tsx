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
import ProductPayment from "@/components/products/ProductPayment";
import ProductDesc from "@/components/products/ProductDesc";
import Feature from "@/components/ui/feature";
import ProductSizes from "@/components/products/ProductSizes";
import ProductRecom from "@/components/products/ProductRecom";

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
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-10">
        <div className="col-span-2 space-y-5">
          <div className="grid grid-cols-1 space-y-5 lg:grid-cols-2 lg:gap-x-10">
            <ProductImage images={product?.imageUrl} />
            <div className="col-span-1 space-y-5">
              <h1 className="text-lg font-semibold lg:text-3xl">
                {product?.title}
              </h1>
              <div className="flex items-center space-x-2">
                {product.discount > 0 ? (
                  <div className="flex items-center gap-2 ">
                    <p className="text-3xl font-semibold leading-none">
                      ${totalPrice}
                    </p>
                    <p className="text-sm leading-none text-muted-foreground line-through">
                      ${product.price}
                    </p>
                    <p className="rounded-lg bg-red-50 px-2 py-0.5 text-sm text-red-600">
                      {product.discount}%
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2"></div>
                )}
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2 font-medium">
                  <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
                  {product.ratings > 0 ? product.ratings : "New"}
                </div>
              </div>
              <ProductSizes details={product.details} />
              <ProductDesc product={product} />
              <div className="hidden xl:block">
                <Feature />
              </div>
            </div>
          </div>
          <div className="block xl:hidden">
            <Feature />
          </div>
        </div>
        <div className="relative row-span-2 hidden lg:block">
          <div className="sticky top-[125px]">
            <ProductPayment id={product.id} price={totalPrice} />
          </div>
        </div>
      </div>
      <ProductRecom />
    </div>
  );
};

export default Page;
