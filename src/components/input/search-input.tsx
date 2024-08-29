"use client";

import { PlaceholdersAndVanishInput } from "../ui/placehorders-and-vanish-input";

export function SearchInput() {
  const placeholders = ["T-Shirt", "Shirt", "Pants", "Shoes", "Bag"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
