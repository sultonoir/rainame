"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-v2";
import { categoriesMobile } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function MenuNavbarMobile({ className }: Props) {
  return (
    <Carousel className={cn("", className)}>
      <CarouselPrevious
        isShadow
        className="bg-background/10 backdrop-blur-lg"
      />
      <CarouselNext isShadow className="bg-background/10 backdrop-blur-lg" />
      <CarouselContent className="space-x-2 py-2">
        {categoriesMobile.map((item) => (
          <Link
            href={{
              pathname: "/product",
              query: {
                category: item.name,
              },
            }}
            key={item.id}
            className="text-nowrap rounded-lg border border-border px-3 py-1"
          >
            {item.name}
          </Link>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
