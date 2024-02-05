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
      router.push(`/product?search=${values}`);
      return setOpen((open) => !open);
    }
    setValues("");
    setOpen((open) => !open);
  };
  //handle keydown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
          className="z- fixed inset-0 h-screen w-screen bg-overlay/50 backdrop-opacity-disabled"
          onClick={onClose}
        >
          <div className="fixed inset-0 z-50 flex h-[100dvh] w-screen items-center justify-center">
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
              <div
                className="relative w-full"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <input
                  value={values}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setValues(e.target.value)}
                  autoFocus
                  className="flex w-full rounded-full border border-primary bg-content1 p-2 pl-11 outline-none"
                  placeholder="Search...."
                />
                <span className="absolute left-[10px] top-1/2 -translate-y-1/2 transform text-2xl">
                  <SearchIcon />
                </span>
              </div>
            </motion.section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalSearch;
