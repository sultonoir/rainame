"use client";
import { Button, Image, Input, Link, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { api } from "@/trpc/react";
import { calculateTotalPrice } from "@/lib/utils";
import { type Products } from "@prisma/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ModalSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Products[] | null | undefined>(
    undefined,
  );

  const { isLoading, mutate } = api.product.getSearch.useMutation({
    onSuccess: (e) => {
      setData(e);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleSearch = useDebouncedCallback((term: string) => {
    setOpen(true);
    mutate({
      name: term,
    });
  }, 300);

  const onClose = () => {
    setOpen(false);
    setData(undefined);
  };

  return (
    <>
      <Button
        size="sm"
        variant="light"
        isIconOnly
        onClick={() => setOpen(!open)}
        className="flex lg:hidden"
      >
        <SearchIcon />
      </Button>
      {open ? (
        <div
          className="fixed inset-0 z-[55] flex h-[100dvh] w-screen items-center justify-center bg-overlay/50"
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            initial={{ translateY: -200 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 200 }}
            aria-hidden
            className="relative z-50 mx-1 my-1 box-border flex w-full max-w-md flex-col overflow-y-hidden rounded-large bg-content1 shadow-small outline-none sm:mx-6 sm:my-16"
            onClick={() => {
              console.log("world");
            }}
          >
            <header
              className="z-[2000] flex flex-initial flex-col px-6 py-4 text-large font-semibold"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Input
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                size="md"
                radius="lg"
                variant="flat"
                labelPlacement="outside"
                startContent={
                  <div className="bg-transparent" aria-hidden="true">
                    <SearchIcon />
                  </div>
                }
                endContent={
                  <button onClick={onClose} className="text-foreground-500 ">
                    Close
                  </button>
                }
              />
            </header>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Spinner size="sm" />
              </div>
            ) : (
              <>
                {!data ? null : (
                  <>
                    {data.length === 0 ? (
                      <div className="flex items-center justify-center">
                        Product not found
                      </div>
                    ) : (
                      <div className="flex max-h-96 flex-1 flex-col gap-3 overflow-auto px-6 py-4 pt-2">
                        {data.map((item) => {
                          const result = calculateTotalPrice({
                            discount: item.discount,
                            price: item.price,
                          });
                          return (
                            <Link
                              href={`/product/${item.path}`}
                              onClick={onClose}
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
                                <p className="text-small font-semibold text-default-500">
                                  {item.name}
                                </p>
                                <p className="font-semibold text-foreground">
                                  {item.discount && item.discount > 0 && (
                                    <span className="mr-2 text-default-500 line-through">
                                      ${item.price}
                                    </span>
                                  )}
                                  ${result.discountedPrice}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </motion.section>
        </div>
      ) : null}
    </>
  );
};

export default ModalSearch;
