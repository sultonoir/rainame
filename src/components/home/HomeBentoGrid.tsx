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
    <section className=" relative mb-10 grid h-[calc(100dvh-100px)] grid-cols-12 grid-rows-6 gap-5 overflow-hidden p-2">
      {/* cell 1 */}
      <Card className="col-span-3 row-start-1 rounded-2xl bg-content1 p-2 shadow-small">
        <CardBody>
          <p className="truncate">{cellOne?.name}</p>
        </CardBody>
        <CardFooter className="items-center justify-between">
          <p className="inline-flex gap-2 text-lg font-semibold">
            <span className="text-default line-through">${PriceOne.price}</span>
            ${PriceOne.discountedPrice}
          </p>
          <Link color="primary" as={Link} href={`/product/${cellOne?.path}`}>
            View details
            <ArrowUpRight />
          </Link>
        </CardFooter>
      </Card>

      {/* cell 2 */}
      <Card className="col-span-3 row-start-2 row-end-5 overflow-hidden">
        <CardBody className="flex flex-col gap-2">
          <p className="truncate text-lg text-default-400">{cellTwo?.name}</p>
          <p className="inline-flex gap-2 text-2xl font-semibold">
            <span className="text-default line-through">${priceTwo.price}</span>
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
        className="col-span-9 row-start-5 row-end-7"
        as={Link}
        href={`/product?promo=${cellThree?.name}`}
      >
        <CardBody>
          <Image
            removeWrapper
            as={NextImage}
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
        className="col-span-6 row-start-1 row-end-5 rounded-2xl"
      >
        <CardBody className="overflow-hidden">
          <Image
            removeWrapper
            as={NextImage}
            loading="eager"
            fill
            src={cellFour?.imageUrl}
            className="h-full object-cover"
          />
        </CardBody>
      </Card>

      {/* cell 5 product promo */}
      <Card className="col-span-3 row-start-1 row-end-5">
        <CardBody>
          <Image
            removeWrapper
            as={NextImage}
            loading="eager"
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
          <Button color="danger" as={Link} href={`/product/${cellFive?.path}`}>
            {cellFive?.discount}% off
          </Button>
        </CardFooter>
      </Card>

      {/* cell 6 product promo after aspect video */}
      <Card className="col-span-3 row-start-5 row-end-7">
        <CardBody>
          <div className="absolute right-2.5 top-2.5 z-20 rounded-lg bg-danger px-2 py-1 text-small text-white">
            {cellSix?.discount}% off
          </div>
          <Image
            removeWrapper
            as={NextImage}
            loading="eager"
            fill
            src={cellSix?.imageUrl.at(0)}
            className="aspect-square object-cover"
          />
        </CardBody>
      </Card>
    </section>
  );
};

export default HomeBentoGrid;
