"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search, XIcon } from "lucide-react";
import useSearch from "@/hook/useSearch";
import { cn } from "@/lib/utils";
import SearchItem from "./SearchItem";
import { navigate } from "@/lib/navigate";

const SearchBar: React.FC = () => {
  const [view, setView] = useState(false);
  const { setSearchList } = useSearch();
  const [value, setValue] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setView(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative hidden w-full lg:mx-20 lg:block">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setView(false);
          setSearchList(value);
          navigate(`/product/?title=${value}`);
        }}
        className="flex w-full items-center rounded-md border focus-within:border-primary/50 focus-within:ring focus-within:ring-primary/30"
      >
        <span className="pl-2 text-muted-foreground">
          <Search size={16} />
        </span>
        <Input
          onFocus={() => {
            setView(true);
          }}
          className="peer/search border-none outline-none ring-0 focus:ring-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
        <button
          onClick={() => setValue("")}
          className={cn("pr-2 text-muted-foreground", {
            hidden: value === "",
          })}
          type="button"
        >
          <XIcon size={16} />
        </button>
      </form>
      {view && <SearchItem />}
    </div>
  );
};

export default SearchBar;
