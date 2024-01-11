"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const HomeCategory = () => {
  const lists = [
    {
      name: "Shoes",
      path: "/product?subcategory=Shoes",
      bgImage: "/explore1.svg",
      image: "/full3.png",
      totalProcuts: "145 products",
    },
    {
      name: "Chlotes",
      path: "/product?subcategory=Chlotes",
      bgImage: "/explore2.svg",
      image: "/full1.png",
      totalProcuts: "145 products",
    },
    {
      name: "Hat",
      path: "/product?subcategory=Hat",
      bgImage: "/explore3.svg",
      image: "/16.png",
      totalProcuts: "133 products",
    },
    {
      name: "Pants",
      path: "/product?subcategory=Pants",
      bgImage: "/explore4.svg",
      image: "/8.png",
      totalProcuts: "145 products",
    },
    {
      name: "Accessories",
      path: "/product?subcategory=Accessories",
      bgImage: "/explore5.svg",
      image: "/4.png",
      totalProcuts: "145 products",
    },
    {
      name: "Shoes",
      path: "/product?subcategory=Shoes",
      bgImage: "/explore6.svg",
      image: "/full3.png",
      totalProcuts: "145 products",
    },
  ];
  return (
    <div className="relative py-24 lg:py-32">
      <div className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform bg-neutral-100/70 dark:bg-default/20 xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl" />
      <div className="nc-Section-Heading relative mb-12 flex flex-col justify-between text-neutral-900 dark:text-neutral-50 sm:flex-row sm:items-end lg:mb-14">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <h2 className="justify-center text-3xl font-semibold md:text-4xl 2xl:text-5xl">
            Start exploring.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7 xl:grid-cols-3">
        {lists.map((item) => (
          <div
            key={item.name}
            className="group relative w-full overflow-hidden rounded-3xl bg-white p-4 transition-shadow hover:shadow-lg dark:bg-neutral-900"
          >
            <div className="relative z-10 flex flex-col justify-between space-y-20">
              <div className="flex items-center justify-between">
                <div className="relative z-0 h-20 w-20 overflow-hidden rounded-full bg-indigo-50">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="aspect-square object-cover"
                  />
                </div>
                <span className="text-slate-700dark:text-neutral-300 text-xs font-medium">
                  {item.totalProcuts}
                </span>
              </div>
              <div className="mt-5">
                <span className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
                  Manufacturar
                </span>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {item.name}
                </h2>
              </div>
              <a
                className="flex items-center text-sm font-medium transition-colors group-hover:text-primary-500"
                href={item.path}
              >
                <span>See Collection</span>
                <ArrowRight />
              </a>
            </div>
            <Image
              width={600}
              height={600}
              className="absolute bottom-0 right-0"
              src={item.bgImage}
              alt="1"
            />
            <a href={item.path} className="absolute inset-0 z-10"></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
