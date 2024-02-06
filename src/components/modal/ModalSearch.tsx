"use client";
import { Button } from "@nextui-org/react";
import { SearchIcon, XIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ModalSearch = () => {
  const [open, setOpen] = React.useState(false);

  //handle keydown
  const router = useRouter();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value !== "") {
        router.replace(`/product?search=${value}`);
        setOpen((open) => !open);
      }
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="light"
        isIconOnly
        onClick={() => setOpen(!open)}
        className="flex md:hidden"
      >
        <SearchIcon />
      </Button>
      {open ? (
        <div
          className="fixed inset-0 h-screen w-screen bg-overlay/50 backdrop-opacity-disabled"
          onClick={() => setOpen(!open)}
        >
          <div className="fixed inset-0 z-50 flex h-[100dvh] w-screen items-center justify-center">
            <motion.section
              className="relative z-50 mx-1 my-1 box-border flex w-full max-w-md flex-col gap-2 overflow-y-hidden rounded-large bg-content1 p-5 shadow-small outline-none sm:mx-6 sm:my-16"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-1 top-1 select-none appearance-none rounded-full p-2 text-foreground-500 outline-none tap-highlight-transparent hover:bg-default-100"
                onClick={() => setOpen(false)}
              >
                <XIcon />
              </button>
              <header className="flex flex-initial text-large font-semibold">
                Search
              </header>
              <form className="relative mx-auto w-full">
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  autoFocus
                  className="flex w-full rounded-full border border-primary bg-content1 p-2 pl-11 outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Search...."
                />
                <span className="absolute left-[10px] top-1/2 -translate-y-1/2 transform text-2xl">
                  <SearchIcon />
                </span>
              </form>
            </motion.section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalSearch;
