"use client";
import { calculateTotalPrice } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Image, Input, Link, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

import React from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleSearch = useDebouncedCallback((term: string) => {
    setOpen(true);
    mutate({
      name: term,
    });
    setName(term);
  }, 300);

  React.useEffect(() => {
    const closeDropdown = () => {
      setOpen(false);
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const { data, isLoading, mutate } = api.product.getSearch.useMutation({});

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        size="md"
        radius="lg"
        variant="flat"
        labelPlacement="outside"
        onClear={() => setName("")}
        startContent={
          <div className="bg-transparent" aria-hidden="true">
            <SearchIcon />
          </div>
        }
      />
      {open && name !== "" && (
        <div className="absolute top-11 flex max-h-[40dvh] w-full flex-col gap-2 overflow-auto rounded-lg bg-content2 p-4">
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
                          href={`/product/${item.path}`}
                          key={item.id}
                          className="flex flex-row items-center gap-4 rounded-lg p-2 hover:bg-content3"
                        >
                          <Image
                            width={40}
                            height={40}
                            radius="sm"
                            src={item.imageUrl.at(0)}
                            className="aspect-square object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="text-small text-default-500">
                              {item.name}
                            </p>
                            <p className="font-semibold text-foreground">
                              {item.discount && item.discount > 0 && (
                                <span className="mr-2 text-default-300 line-through">
                                  ${item.price}
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
