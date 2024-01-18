"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Button } from "@nextui-org/react";
import { type Products, type Promo } from "@prisma/client";

export default function Carousel({
  slides,
}: {
  slides: Array<
    Promo & {
      products: Products[];
    }
  >;
}) {
  return (
    <>
      <Swiper
        cssMode={true}
        loop={true}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper container"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <a
              href={`/product?promo=${item.name}`}
              className="relative block h-[30dvh] w-full lg:h-[calc(100dvh-200px)]"
            >
              <Image
                fill
                src={item.imageUrl}
                alt={item.name}
                className="aspect-video object-cover"
                priority
                sizes="(max-width: 640px) 100dvw, (max-width: 1200px) 50dvw, 1400px"
              />
            </a>
          </SwiperSlide>
        ))}
        <Button
          isIconOnly
          className="swiper-button-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer  rounded-full hover:bg-white/75"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          isIconOnly
          className="swiper-button-next absolute right-2 top-1/2 z-10  -translate-y-1/2 cursor-pointer rounded-full hover:bg-white/75"
        >
          <ChevronRight size={20} />
        </Button>
      </Swiper>
    </>
  );
}
