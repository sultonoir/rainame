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
      <div className="relative w-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CarouselPrevious className="bg-background/10 backdrop-blur-lg" />
      </div>
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

      <div className="relative w-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CarouselNext className="" />
      </div>
    </Carousel>
  );
}
