"use client";

import {
  Image,
  Card,
  CardBody,
  CardFooter,
  Link,
  Button,
} from "@nextui-org/react";
import { type Promo, type Products } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import React from "react";
type Props = {
  promo: Array<
    Promo & {
      products: Products[];
    }
  >;
};
import NextImage from "next/image";
import { calculateTotalPrice } from "@/lib/utils";

const HomeBentoGrid = ({ promo }: Props) => {
  const cellOne = promo.at(0)?.products.at(0);
  const PriceOne = calculateTotalPrice({
    price: cellOne?.price ?? 0,
    discount: cellOne?.discount ?? 0,
  });

  const cellTwo = promo.at(1)?.products.at(1);
  const priceTwo = calculateTotalPrice({
    price: cellTwo?.price ?? 0,
    discount: cellTwo?.discount ?? 0,
  });
  const cellThree = promo.at(0);

  const cellFour = promo.at(1);

  const cellFive = promo.at(1)?.products.at(5);

  const cellSix = promo.at(1)?.products.at(2);

  return (
    <>
      <section className="relative mb-10  hidden h-[calc(100dvh-100px)] grid-cols-1 gap-5 overflow-hidden p-2 sm:grid-cols-12 sm:grid-rows-6 lg:grid">
        {/* cell 1 */}
        <Card className="col-span-1 rounded-2xl bg-content1 p-2 shadow-small sm:col-span-3 sm:row-start-1">
          <CardBody className="flex-col overflow-visible">
            <p className="truncate">{cellOne?.name}</p>
            <p className="inline-flex gap-2 text-lg font-semibold">
              <span className="text-default line-through">
                ${PriceOne.price}
              </span>
              ${PriceOne.discountedPrice}
            </p>
          </CardBody>
          <CardFooter>
            <Link color="primary" as={Link} href={`/product/${cellOne?.path}`}>
              View details
              <ArrowUpRight />
            </Link>
          </CardFooter>
        </Card>

        {/* cell 2 */}
        <Card className="col-span-1 overflow-hidden sm:col-span-3 sm:row-start-2 sm:row-end-5">
          <CardBody className="flex flex-col gap-2">
            <p className="truncate text-lg text-default-400">{cellTwo?.name}</p>
            <p className="inline-flex gap-2 text-2xl font-semibold">
              <span className="text-default line-through">
                ${priceTwo.price}
              </span>
              ${priceTwo.discountedPrice}
            </p>
            <Image
              as={NextImage}
              loading="eager"
              width={400}
              height={400}
              src={cellTwo?.imageUrl.at(0) ?? ""}
              alt={cellTwo?.name ?? "image"}
              radius="sm"
              className="aspect-square object-cover"
            />
          </CardBody>
        </Card>

        {/* cell 3 promo image aspect-video */}
        <Card
          className="col-span-1 sm:col-span-9 sm:row-start-5 sm:row-end-7"
          as={Link}
          href={`/product?promo=${cellThree?.name}`}
        >
          <CardBody>
            <Image
              removeWrapper
              as={NextImage}
              alt={cellThree?.name ?? "image"}
              loading="eager"
              fill
              src={cellThree?.imageUrl}
              className="aspect-video h-full object-cover"
            />
          </CardBody>
        </Card>
        {/*  cell 4 promo image square */}
        <Card
          as={Link}
          href={`/product?promo=${cellFour?.name}`}
          className="col-span-1 rounded-2xl sm:col-span-6 sm:row-start-1 sm:row-end-5"
        >
          <CardBody className="overflow-hidden">
            <Image
              removeWrapper
              as={NextImage}
              loading="eager"
              fill
              alt={cellFour?.name ?? "Image"}
              src={cellFour?.imageUrl}
              className="h-full object-cover"
            />
          </CardBody>
        </Card>

        {/* cell 5 product promo */}
        <Card className="col-span-1 sm:col-span-3 sm:row-start-1 sm:row-end-5">
          <CardBody>
            <Image
              removeWrapper
              as={NextImage}
              loading="eager"
              alt={cellFive?.name ?? "image"}
              fill
              src={cellFive?.imageUrl.at(0)}
              className="object-cover"
            />
          </CardBody>
          <CardFooter className="gap-2">
            <Button
              as={Link}
              href={`/product/${cellFive?.path}`}
              color="primary"
              fullWidth
              endContent={<ArrowUpRight />}
            >
              View details
            </Button>
            <Button
              color="danger"
              as={Link}
              href={`/product/${cellFive?.path}`}
            >
              {cellFive?.discount}% off
            </Button>
          </CardFooter>
        </Card>

        {/* cell 6 product promo after aspect video */}
        <Card
          as={Link}
          href={`/product/${cellSix?.path}`}
          className="col-span-1 sm:col-span-3 sm:row-start-5 sm:row-end-7"
        >
          <CardBody>
            <div className="absolute right-2.5 top-2.5 z-20 rounded-lg bg-danger px-2 py-1 text-small text-white">
              {cellSix?.discount}% off
            </div>
            <Image
              removeWrapper
              as={NextImage}
              loading="eager"
              alt={cellSix?.name ?? "image six"}
              fill
              src={cellSix?.imageUrl.at(0)}
              className="aspect-square object-cover"
            />
          </CardBody>
        </Card>
      </section>
      <section className="flex gap-4 overflow-auto p-4 lg:hidden">
        {promo.map((item) => (
          <div
            key={item.id}
            className="h-fit w-fit rounded-large bg-sky-500 p-4"
          >
            <div className="relative h-[200px] w-[400px]">
              <Image
                removeWrapper
                radius="sm"
                as={NextImage}
                alt={cellThree?.name ?? "image"}
                loading="eager"
                fill
                src={item.imageUrl}
                className="aspect-video h-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default HomeBentoGrid;
