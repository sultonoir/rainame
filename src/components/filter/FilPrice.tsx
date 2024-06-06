"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

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
      <div className="flex items-center justify-evenly">
        <Input
          placeholder="$1"
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-[40%]"
        />
        <Input
          placeholder="$1"
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-[40%]"
        />
      </div>
      <Button className="h-8" onClick={handleClick}>
        Apply
      </Button>
    </div>
  );
};

export default FilPrice;
