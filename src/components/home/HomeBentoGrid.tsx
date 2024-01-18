"use client";

import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Button } from "@nextui-org/react";

const HomeBentoGrid = () => {
  const hero = [
    {
      image: "/hero-right.png",
      title: "hero1",
    },
    {
      image: "/hero-right-3.png",
      title: "hero2",
    },
    {
      image: "/promo2.png",
      title: "hero3",
    },
    {
      image: "/promo3.png",
      title: "hero4",
    },
  ];
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
        {hero.map((item) => (
          <SwiperSlide
            className="container relative px-10 pb-0 pt-14 sm:pt-20 lg:py-44"
            key={item.title}
          >
            <div className="relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14">
              <div className="space-y-5 sm:space-y-6">
                <span className="nc-SectionHero2Item__subheading block text-base font-medium md:text-xl">
                  In this season, find the best 🔥
                </span>
                <a
                  href="/profile"
                  className="nc-SectionHero2Item__heading text-3xl font-semibold !leading-[114%] sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
                >
                  Exclusive collection for everyone
                </a>
              </div>
              <a
                className="nc-Button ttnc-ButtonPrimary nc-SectionHero2Item__button focus:ring-primary-6000 relative z-10 inline-flex h-auto items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm  font-medium text-slate-50 shadow-xl transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-90 dark:bg-content1 dark:focus:ring-offset-0 sm:px-9 sm:py-5 sm:text-base "
                href={`/product`}
              >
                <span>Explore now</span>
                <span>
                  <SearchIcon className="ml-2" />
                </span>
              </a>
            </div>
            <div className="bottom-0 right-0 top-0 mt-10 w-full max-w-2xl lg:absolute lg:mt-0 xl:max-w-3xl 2xl:max-w-4xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
        <Button
          isIconOnly
          className="swiper-button-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-transparent  hover:bg-default hover:bg-white/75"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          isIconOnly
          className="swiper-button-next absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer  rounded-full bg-transparent hover:bg-default hover:bg-white/75"
        >
          <ChevronRight size={20} />
        </Button>
      </Swiper>
    </>
  );
};

export default HomeBentoGrid;
