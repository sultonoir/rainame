"use client";
import { Button } from "@nextui-org/react";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchPage = () => {
  const [values, setValues] = React.useState("");

  const router = useRouter();
  const handleSubmit = () => {
    if (values !== "") {
      setValues("");

      return router.push(`/product?search=${values}`);
    }
    setValues("");
  };
  //handle keydown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default saat menekan tombol "Enter"
      handleSubmit(); // Menambahkan todo saat tombol "Enter" ditekan
    }
  };

  return (
    <div className="container">
      <header className="mx-auto -mt-10 flex max-w-2xl flex-col lg:-mt-7">
        <form className="relative w-full">
          <label htmlFor="search-input">
            <input
              className="block w-full rounded-full border-1 border-default-300 bg-background py-5 pl-14 pr-5 text-sm font-normal shadow-lg outline-none focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 md:pl-16"
              placeholder="Search...."
              value={values}
              onChange={(e) => setValues(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              radius="full"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 transform bg-slate-900"
              isIconOnly
              onClick={handleSubmit}
            >
              <ArrowRight className="text-white" />
            </Button>
            <span className="absolute left-5 top-1/2 -translate-y-1/2 transform text-2xl md:left-6">
              <SearchIcon />
            </span>
          </label>
        </form>
      </header>
    </div>
  );
};

export default SearchPage;
