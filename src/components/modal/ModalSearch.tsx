"use client";
import { Button } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const ModalSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState("");
  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setValues("");
    setOpen((open) => !open);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default saat menekan tombol "Enter"
      handleSubmit(); // Menambahkan todo saat tombol "Enter" ditekan
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
          className="fixed inset-0 z-[55] flex h-[100dvh] w-screen items-start justify-start bg-overlay/50"
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            initial={{ translateY: -200 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 200 }}
            aria-hidden
            className="relative z-50 mx-1 my-1 box-border flex w-full max-w-md flex-col overflow-y-hidden rounded-large bg-transparent shadow-small outline-none sm:mx-6 sm:my-16"
            onClick={() => {
              console.log("world");
            }}
          >
            <header
              className="z-[2000] flex flex-initial flex-col px-6 py-4"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                value={values}
                onKeyDown={handleKeyDown}
                onChange={(e) => setValues(e.target.value)}
                autoFocus
                className="flex w-full rounded-full bg-content3 p-2 pl-5 outline-none"
                placeholder="Search...."
              />
            </header>
          </motion.section>
        </div>
      ) : null}
    </>
  );
};

export default ModalSearch;
