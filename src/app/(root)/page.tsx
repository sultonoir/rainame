import { api } from "@/trpc/server";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const products = await api.product.filterProduct({});
  return (
    <div className="container py-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <Card key={product.id} className="border-none shadow-none">
            <CardContent className="p-0">
              <Carousel className="min-w-fit">
                <CarouselContent>
                  {product.imageUrl.map((item) => (
                    <CarouselItem key={item.id}>
                      <div className="relative m-1 aspect-square">
                        <Link
                          href={`/product/${product.slug}`}
                          title={product.title}
                          className="absolute inset-0 z-10"
                        />
                        <Image
                          src={item.url}
                          alt={product.title}
                          fill
                          placeholder="blur"
                          className="aspect-square rounded-sm object-cover"
                          blurDataURL={item.blur}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 disabled:hidden" />
                <CarouselNext className="right-2 disabled:hidden" />
              </Carousel>
            </CardContent>
            <CardFooter className="p-1">
              <p className="max-w-[calc(100%-10px)] truncate text-[15px] font-semibold">
                {product.title}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
