"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Product } from "@/server/db/schema";

interface Props {
  product: Product;
}

const ProductDesc = ({ product }: Props) => {
  const Preview = dynamic(() => import("@/components/ui/preview"), {
    ssr: false,
    loading: () => (
      <Skeleton className="flex min-h-[300px] w-full items-center justify-center" />
    ),
  });
  return (
    <Accordion type="single" defaultValue="item-1" className="w-full space-y-2">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="rounded-lg bg-secondary px-4 py-2">
          Description
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2">
          <Preview values={product.desc} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="rounded-lg bg-secondary px-4 py-2">
          FAQ
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2">
          <ul className="px-4">
            <li className="list-disc">
              All full-priced, unworn items, with tags attached and in their
              original packaging are eligible for return or exchange within 30
              days of placing your order.
            </li>
            <li className="list-disc">
              Please note, packs must be returned in full. We do not accept
              partial returns of packs.
            </li>
            <li className="list-disc">
              Want to know our full returns policies? Here you go.
            </li>
            <li className="list-disc">
              Want more info about shipping, materials or care instructions?
              Here!
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDesc;
