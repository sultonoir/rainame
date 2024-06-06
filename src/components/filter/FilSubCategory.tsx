"use client";
import { subCategories } from "@/dummy";
import React, { useMemo, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  subs: string;
}

const FilSubCategory = ({ subs }: Props) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subCategory = subs?.split("+") ?? [];

  const createQueryString = (name: string, value: string) => {
    const newCategories = subCategory.includes(value)
      ? subCategory.filter((item) => item !== value)
      : [...subCategory, value];

    const params = new URLSearchParams(searchParams!.toString());
    if (newCategories.length > 0) {
      params.set(name, newCategories.join("+"));
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  const handleCheckedChange = (id: string) => {
    const newQueryString = createQueryString("subCategory", id);
    router.push(`${pathname}?${newQueryString}`);
  };

  const allSub = useMemo(() => {
    const subs = [...subCategories];
    return show ? subs : subs.slice(0, 5);
  }, [show]);

  return (
    <div className="flex flex-col gap-2">
      {allSub.map((item) => (
        <div className="flex items-center space-x-2" key={item.id}>
          <Checkbox
            id={item.id}
            checked={subCategory?.includes(item.id)}
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
      <Button
        className="h-6 justify-start"
        variant="ghost"
        size="sm"
        onClick={() => setShow(!show)}
      >
        {show ? "Show less" : "Show all"}
      </Button>
    </div>
  );
};

export default FilSubCategory;
