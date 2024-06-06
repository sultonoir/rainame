"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sorts } from "@/dummy";

export default function FilSortBy() {
  const [select, setSelect] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams!);
    const selectedEvent = sorts.find((event) => event.value === select);

    if (selectedEvent) {
      params.set("sort", selectedEvent.value);
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, select]);

  return (
    <Select defaultValue={select} onValueChange={setSelect}>
      <SelectTrigger className="w-[180px] outline-none focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Sorts" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {sorts.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
