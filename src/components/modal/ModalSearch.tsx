"use client";
import { Button } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ModalSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState("");
  const onClose = () => {
    setOpen(false);
  };

  //handle submit
  const router = useRouter();
  const handleSubmit = () => {
    if (values !== "") {
      setValues("");
      setOpen((open) => !open);
      return router.push(`/product?search=${values}`);
    }
    setValues("");
    setOpen((open) => !open);
  };
  //handle keydown
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
            <div className="relative w-full">
              <input
                onKeyDown={handleKeyDown}
                value={values}
                onChange={(e) => setValues(e.target.value)}
                autoFocus
                className="flex w-full rounded-full bg-content1 p-2 pl-11 outline-none"
                placeholder="Search...."
              />
              <span className="absolute left-[10px] top-1/2 -translate-y-1/2 transform text-2xl">
                <SearchIcon />
              </span>
            </div>
          </motion.section>
        </div>
      ) : null}
    </>
  );
};

export default ModalSearch;
