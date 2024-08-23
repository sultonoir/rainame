"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FilCategory from "./FilCategory";
import FilSubCategory from "./FilSubCategory";
import FilSize from "./FilSize";
import FilPrice from "./FilPrice";

const FilterBar = () => {
  return (
    <div className="relative hidden h-[calc(100dvh-65px)] w-[260px] flex-shrink-0 lg:flex">
      <div className="absolute left-0 top-0 z-10 flex h-full w-full  flex-col overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2", "item-3"]}
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="border-b">Price</AccordionTrigger>
            <AccordionContent className="mt-5">
              <FilPrice />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="border-b">Category</AccordionTrigger>
            <AccordionContent className="mt-5">
              <FilCategory />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="border-b">
              Sub Category
            </AccordionTrigger>
            <AccordionContent className="mt-5">
              <FilSubCategory />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="border-b">Size</AccordionTrigger>
            <AccordionContent className="mt-5">
              <FilSize />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FilterBar;
