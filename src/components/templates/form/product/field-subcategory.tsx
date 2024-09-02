import { AutoComplete } from "@/components/ui/autocomplete";
import { api } from "@/trpc/react";
import { type Option } from "@/types";
import React from "react";

interface Props {
  id: string;
  value: Option;
  setValue: (values: Option) => void;
}

const FieldSubcategory = ({ id, value, setValue }: Props) => {
  const { data } = api.subcategory.byCategoryId.useQuery({
    categoryId: id,
  });
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
      id={id}
    />
  );
};

export default FieldSubcategory;
