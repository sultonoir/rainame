"use client";
import { AutoComplete } from "@/components/ui/auto-complete";
import { api } from "@/trpc/react";
import { type Option } from "@/types";

interface Props {
  value: Option;
  setValue: (value: Option) => void;
}

export function FieldCategory({ value, setValue }: Props) {
  const { data } = api.category.getall.useQuery();

  const category = data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <AutoComplete
      options={category ?? []}
      placeholder="category"
      onValueChange={setValue}
      value={value}
    />
  );
}
