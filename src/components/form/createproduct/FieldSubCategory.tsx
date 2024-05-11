"use client";

import React from "react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import useActions from "@/hook/useActions";

interface Props {
  setValue: (value: string) => void;
  id: string;
}

const FieldSubCategory = ({ setValue, id }: Props) => {
  const [name, setName] = React.useState("");
  const { setSubCategoryOpen } = useActions();
  const { data, isLoading } = api.subCategory.getSubCategory.useQuery({
    categoryId: id,
  });
  return (
    <React.Fragment>
      {isLoading && <Skeleton className="h-9 w-full" />}
      {data && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
                className: "w-full justify-between",
              }),
            )}
          >
            {name !== "" ? name : "Category"}
            <ChevronDown size={15} />
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full">
            {data.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onSelect={() => {
                  setValue(item.id);
                  setName(item.name);
                }}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex w-full cursor-pointer items-center gap-3 font-medium"
              onSelect={() => setSubCategoryOpen(true)}
            >
              Add
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </React.Fragment>
  );
};

export default FieldSubCategory;
