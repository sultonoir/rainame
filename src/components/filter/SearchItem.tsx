"use client";
import { useLockBody } from "@/hook/useLockBody";
import useSearch from "@/hook/useSearch";
import useStore from "@/hook/useStore";
import { HistoryIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  close: () => void;
}

const SearchItem = ({ close }: Props) => {
  const { removeItem, removeAll } = useSearch();
  const searchLists = useStore(useSearch, (value) => value.searchLists);
  useLockBody();
  return (
    <div className="absolute top-11 w-full">
      <div className="size-full min-h-[350px] space-y-2 rounded-lg border bg-popover p-4">
        <div className="inline-flex items-center gap-2">
          <p className="text-xl font-semibold">Last searched</p>
          <Button
            variant="link"
            className="text-destructive hover:no-underline"
            onClick={removeAll}
          >
            Remove all
          </Button>
        </div>
        <ul className="flex flex-col space-y-1">
          {searchLists
            ?.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg px-2 py-1 text-muted-foreground hover:bg-secondary"
              >
                <span className="size-5 flex-shrink-0">
                  <HistoryIcon size={20} />
                </span>
                <Link
                  onClick={close}
                  href={{
                    pathname: "/product",
                    query: { search: item },
                  }}
                  className="flex-1"
                >
                  {item}
                </Link>
                <button
                  type="button"
                  className="z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                >
                  <XIcon size={20} />
                </button>
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </div>
  );
};

export default SearchItem;
