"use client";

import React from "react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import useActions from "@/hook/useActions";

interface Props {
  setValue: (value: string) => void;
}

const FieldSizes = ({ setValue }: Props) => {
  const [size, setSize] = React.useState("");
  const { setSizeOpen } = useActions();
  const { data, isLoading } = api.sizes.getSizes.useQuery();
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
            {size !== "" ? size : "Size"}
            <ChevronDown size={15} />
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {data.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onSelect={() => {
                  setValue(item.id);
                  setSize(item.name);
                }}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex w-full cursor-pointer items-center gap-3 font-medium"
              onSelect={() => setSizeOpen(true)}
            >
              Add
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </React.Fragment>
  );
};

export default FieldSizes;
