import { sizes } from "@/dummy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const FilSize = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams!.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {sizes.map((item) => (
        <button
          onClick={() =>
            router.push(pathname + "?" + createQueryString("size", item.id))
          }
          key={item.id}
          className="inline-flex rounded-md border px-2 py-1"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default FilSize;
