import CardProducts from "@/components/card/CardProducts";
import HomeCategory from "@/components/home/HomeCategory";
import { Hiws } from "@/lib/Array";
import { api } from "@/trpc/server";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Chip, type ChipProps } from "@nextui-org/chip";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";
import HomeBentoGrid from "@/components/home/HomeBentoGrid";

const page = async () => {
  const products = await api.product.filterProduct.query({});
  const statusColorMap: Record<string, ChipProps["color"]> = {
    "Step 1": "danger",
    "Step 2": "primary",
    "Step 3": "warning",
    "Step 4": "success",
  };
  return (
    <>
      <HomeBentoGrid />
      <section className="container mt-24">
        <section className="my-10 flex flex-col justify-items-center gap-5">
          <div className="mb-10 flex flex-col justify-between gap-y-2 lg:flex-row">
            <p className="text-4xl font-semibold">
              Discover more
              <span>.</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                {""} Good things are waiting for you
              </span>
            </p>
            <Button as={Link} href="/product" variant="flat" color="primary">
              Show more
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <CardProducts
                key={product.id}
                product={product}
                rattings={product.rattings}
              />
            ))}
          </div>
          {/* hiws */}
          <div className="border-b border-t border-slate-200 py-24 dark:border-slate-700 lg:py-32">
            <div className="relative grid gap-10 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4 xl:gap-20">
              <Image
                src="/VectorHIW.be5444ab.svg"
                alt="vector background"
                className="absolute inset-x-0 top-5 hidden md:block"
                width={1431}
                height={105}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {Hiws.map((item) => (
                <div
                  key={item.title}
                  className="relative mx-auto flex max-w-xs flex-col items-center"
                >
                  <div className="mx-auto mb-4 max-w-[140px] rounded-full bg-slate-50 p-2 sm:mb-10">
                    <Image
                      src={`${item.image}`}
                      alt="hiw1"
                      width={450}
                      height={450}
                      className="bg-blend-color-burn"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-auto space-y-5 text-center">
                    <Chip variant="flat" color={statusColorMap[item.step]}>
                      {item.step}
                    </Chip>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <span className="block text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* home category */}
          <div className="relative mb-16 flex flex-col items-center lg:flex-row ">
            <div className="relative mb-16 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
              <a
                href="/"
                className="inline-flex w-28 items-center font-semibold text-foreground"
              >
                <Image
                  alt="logo"
                  src="/logo-transparent.png"
                  width={50}
                  height={50}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                Rainame
              </a>
              <h2 className="mt-6 text-3xl font-semibold !leading-[1.2] tracking-tight sm:mt-10 sm:text-4xl xl:text-5xl 2xl:text-6xl">
                Earn free money <br /> with Rainame
              </h2>
              <span className="mt-6 block text-slate-500 dark:text-slate-400 ">
                With Ciseco you will get freeship &amp; savings combo...
              </span>
              <div className="mt-6 flex space-x-2 sm:mt-12 sm:space-x-5">
                <Button as="a" href="/product" variant="solid" color="primary">
                  Saving combo
                </Button>
                <Button as="a" href="/product" variant="ghost" color="primary">
                  Discover more
                </Button>
              </div>
            </div>
            <Image
              alt="discover"
              src="/rightLargeImg (1).png"
              width={800}
              height={755}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <HomeCategory />
          <div className="my-10 flex flex-col justify-between gap-y-2 lg:flex-row">
            <p className="text-4xl font-semibold">
              Best Sellers
              <span>.</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                {""} Best selling of the month
              </span>
            </p>
            <Button as={Link} href="/product" variant="flat" color="primary">
              Show more
            </Button>
          </div>
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .sort((a, b) => b.selling - a.selling)
              .slice(0, 4)
              .map((product) => (
                <CardProducts
                  key={product.id}
                  product={product}
                  rattings={product.rattings}
                />
              ))}
          </div>
          <div className="relative mt-24 flex flex-col rounded-2xl bg-slate-50 p-4 pb-0 dark:bg-content1 sm:rounded-[40px] sm:p-5 sm:pb-0 lg:flex-row lg:p-24">
            <div className="relative max-w-lg lg:w-[50%]">
              <h2 className="text-4xl font-semibold md:text-5xl">
                Don't miss out on special offers
              </h2>
              <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
                Register to receive news about the latest, savings combos,
                discount codes...
              </span>
              <ul className="mt-10 space-y-4">
                <li className="flex items-center space-x-4">
                  <span className="nc-Badge relative inline-flex rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium  text-purple-800">
                    01
                  </span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    Savings combos
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <span className="nc-Badge relative inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium  text-blue-800">
                    02
                  </span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    Freeship
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <span className="nc-Badge relative inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium  text-red-800">
                    03
                  </span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    Premium magazines
                  </span>
                </li>
              </ul>
              <div className="relative mt-10 max-w-sm">
                <input
                  className="block h-11 w-full rounded-full border border-default bg-white px-4 py-3 text-sm font-normal outline-none focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:bg-neutral-200 dark:border-neutral-700 dark:bg-default-900 dark:focus:ring-primary-600 dark:focus:ring-opacity-25 dark:disabled:bg-neutral-800 "
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  className="ttnc-ButtonCircle focus:ring-primary-6000 !leading-non absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full bg-slate-900 text-slate-50 hover:bg-slate-800  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-opacity-70 dark:focus:ring-offset-0"
                  type="submit"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="relative mt-10 block max-w-lg lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:max-w-[calc(50%-40px)]">
              <Image
                alt="promo"
                width={751}
                height={824}
                src="/promo3.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default page;
