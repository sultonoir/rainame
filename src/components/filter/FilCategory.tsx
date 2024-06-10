/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { category } from "@/dummy";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilCategory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categories = searchParams?.get("category")?.split("+") ?? [];

  const createQueryString = (name: string, value: string) => {
    const newCategories = categories.includes(value)
      ? categories.filter((item) => item !== value)
      : [...categories, value];

    const params = new URLSearchParams(searchParams!.toString());
    if (newCategories.length > 0) {
      params.set(name, newCategories.join("+"));
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  const handleCheckedChange = (id: string) => {
    const newQueryString = createQueryString("category", id);
    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {category.map((item) => (
        <div className="flex items-center space-x-2" key={item.id}>
          <Checkbox
            id={item.id}
            checked={categories.includes(item.id)}
            onCheckedChange={() => handleCheckedChange(item.id)}
          />
          <Label
            htmlFor={item.id}
            className="font-normal text-muted-foreground"
          >
            {item.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilCategory;
