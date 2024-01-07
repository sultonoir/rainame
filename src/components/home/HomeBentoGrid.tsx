"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Promo } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: Promo[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative overflow-hidden rounded-large">
      <div className="flex">
        {slides.map((item, index) => (
          <Link
            href={`/product?promo=${item.name}`}
            key={item.id}
            className={`ease relative h-[200px] duration-1000 lg:h-[500px] ${
              index === curr ? "w-full" : "w-0"
            }`}
            style={{
              transitionProperty: "all",
            }}
          >
            <Image
              alt={item?.name ?? "image"}
              fill
              objectFit="cover"
              src={item.imageUrl}
              priority
              placeholder="blur"
              blurDataURL="www"
            />
          </Link>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 rounded-full  bg-white/80 p-2 text-gray-800 shadow hover:bg-white"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow hover:bg-white"
      >
        <ChevronRight size={40} />
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurr(i)}
            className={`
              mx-1 h-3 w-3 rounded-full bg-white transition-all
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
