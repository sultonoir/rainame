"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const FilPrice = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams!.toString());
    params.set("min", min);
    params.set("max", max);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-2 px-1">
        <div className="w-full space-y-1">
          <Label className="text-xs text-muted-foreground">Min</Label>
          <Input
            placeholder="$1"
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            // className="w-[40%]"
          />
        </div>
        <div className="w-full space-y-1">
          <Label className="text-xs text-muted-foreground">Max</Label>
          <Input
            placeholder="$1"
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            // className="w-[40%]"
          />
        </div>
      </div>
      <Button className="h-8" onClick={handleClick}>
        Apply
      </Button>
    </div>
  );
};

export default FilPrice;
