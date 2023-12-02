"use client";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchInput = () => {
  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        size="sm"
        radius="lg"
        endContent={
          <Button
            size="sm"
            className="bg-transparent"
            isIconOnly
            aria-hidden="true"
          >
            <SearchIcon />
          </Button>
        }
      />
    </div>
  );
};

export default SearchInput;
