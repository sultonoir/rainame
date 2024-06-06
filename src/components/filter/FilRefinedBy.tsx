import { XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { type FilterProps } from "@/types";

const FilRefinedBy = ({ searchParams }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchP = useSearchParams();
  const categories = searchParams.category?.split("+") || [];
  const subCategories = searchParams.subCategory?.split("+") || [];
  const size = searchParams.size;

  const updateURLParams = (paramName: string, values: string[]) => {
    const params = new URLSearchParams(searchP!.toString());
    if (values.length > 0) {
      params.set(paramName, values.join("+"));
    } else {
      params.delete(paramName);
    }
    return params.toString();
  };

  const removeCategory = (value: string) => {
    const updatedCategories = categories.filter((item) => item !== value);
    return updateURLParams("category", updatedCategories);
  };

  const removeSubCategory = (value: string) => {
    const updatedSubCategories = subCategories.filter((item) => item !== value);
    return updateURLParams("subCategory", updatedSubCategories);
  };

  const removeSize = () => {
    const params = new URLSearchParams(searchP!.toString());
    params.delete("size");
    return params.toString();
  };

  const handleRemove = (paramUpdater: () => string) => {
    const updatedParams = paramUpdater();
    router.push(`${pathname}?${updatedParams}`);
  };

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="font-medium">REFINED BY</p>
        <a href="/product" className="leading-none text-[12] underline">
          Clear all
        </a>
      </div>
      <div className="flex flex-col gap-2">
        {categories.map((item) => (
          <button
            onClick={() => handleRemove(() => removeCategory(item))}
            className="flex w-fit items-center gap-2 rounded-lg bg-secondary px-2 py-1"
            key={item}
          >
            <span className="text-[12px] capitalize leading-none">{item}</span>
            <XIcon size={16} />
          </button>
        ))}
        {subCategories.map((item) => (
          <button
            onClick={() => handleRemove(() => removeSubCategory(item))}
            className="flex w-fit items-center gap-2 rounded-lg bg-secondary px-2 py-1"
            key={item}
          >
            <span className="text-[12px] capitalize leading-none">{item}</span>
            <XIcon size={16} />
          </button>
        ))}
        {size && (
          <button
            onClick={() => handleRemove(removeSize)}
            className="flex w-fit items-center gap-2 rounded-lg bg-secondary px-2 py-1"
          >
            <span className="text-[12px] capitalize leading-none">{size}</span>
            <XIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilRefinedBy;
