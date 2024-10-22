"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placehorders-and-vanish-input";
import { useSearch } from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useCreateQueryString from "@/hooks/useCreateQueryString";

export function SearchInput() {
  const [active, setActive] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const placeholders = ["T-Shirt", "Shirt", "Pants", "Shoes", "Bag"];
  const router = useRouter();
  const { add } = useSearch();
  const search = useStore(useSearch, (state) => state.search);
  const ref = useRef<HTMLDivElement | null>(null);

  const createQueryString = useCreateQueryString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add({
      id: new Date().getTime().toString(),
      name: inputvalue,
    });
    router.push("/product" + "?" + createQueryString("search", inputvalue));
  };

  const handleClick = () => {
    console.log("hallo");
  };

  function handleOnClick(event: MouseEvent) {
    if (ref.current && !event.composedPath().includes(ref.current)) {
      setActive(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", handleOnClick);
    return () => {
      document.body.removeEventListener("click", handleOnClick);
    };
  }, []);

  return (
    <div
      className="relative hidden md:flex md:flex-grow"
      onClick={() => setActive(true)}
      ref={ref}
    >
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }} // translateX(-50%) dan translateY(20px)
            animate={{ opacity: 1, y: 0, x: "-50%" }} // tetap translateX(-50%) dan translateY(0px)
            exit={{ opacity: 0, y: 20, x: "-50%" }} // tetap translateX(-50%) dan translateY(20px)
            transition={{
              duration: 0.5, // durasi transisi
              ease: "easeInOut", // jenis transisi
            }}
            className="absolute left-1/2 top-[calc(100%_+_0rem)] z-[60] w-full transform"
          >
            <div className="mt-2 h-max rounded-lg border bg-background p-2">
              <div className="space-y-2">
                <div className="space-y-2 rounded-sm bg-accent/60 p-2">
                  <div className="flex justify-between">
                    <p className="text-lg capitalize">previous search :</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {search?.map((item) => (
                      <Link
                        href={{
                          pathname: "/products",
                          query: {
                            q: item.name,
                          },
                        }}
                        key={item.id}
                        className="relative flex select-none items-center rounded-sm border px-2 py-1.5 text-sm outline-none hover:bg-accent"
                        onClick={handleClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-lg capitalize">Recomendations for you :</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
