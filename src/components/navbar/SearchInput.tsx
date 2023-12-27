"use client";
import { calculateTotalPrice } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Button, Image, Input, Link, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

import React from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleSearch = useDebouncedCallback((term: string) => {
    if (name === "") {
      setName("");
      setOpen(false);
    }
    setOpen(true);
    setName(term);
  }, 300);

  React.useEffect(() => {
    const closeDropdown = () => {
      console.log("hallo");
      setOpen(false);
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const { data, isLoading } = api.product.getSearch.useQuery({
    name,
  });
  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        size="md"
        radius="lg"
        variant="flat"
        labelPlacement="outside"
        endContent={
          <div className="bg-transparent" aria-hidden="true">
            <SearchIcon />
          </div>
        }
      />
      {open && name !== "" && (
        <div className="absolute top-11 flex max-h-[40dvh] w-full flex-col gap-2 overflow-auto rounded-lg bg-content1 p-4">
          <>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" />
              </div>
            ) : (
              <>
                {data?.length === 0 ? (
                  <div className="flex items-center justify-center">
                    Product not found
                  </div>
                ) : (
                  <>
                    {data?.map((item) => {
                      const result = calculateTotalPrice({
                        discount: item.discount,
                        price: item.price,
                      });
                      return (
                        <Link
                          href={`/product/${item.category}/${item.subcategory}/${item.path}`}
                          key={item.id}
                          className="flex flex-row items-center gap-4 rounded-lg p-2 hover:bg-content2"
                        >
                          <Image
                            width={40}
                            height={40}
                            src={item.imageUrl.at(0)}
                            className="aspect-square object-cover"
                          />
                          <div className="flex flex-col">
                            <Link className="text-small text-default-500">
                              {item.name}
                            </Link>
                            <p className="font-semibold text-foreground">
                              {item.discount && item.discount > 0 && (
                                <span className="mr-2 text-default-300">
                                  {item.price}
                                </span>
                              )}
                              ${result.discountedPrice}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
