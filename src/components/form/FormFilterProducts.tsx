/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Categories, Colors, Sizes, Subcategory } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { toast } from "sonner";

const FormFilterProducts = () => {
  const [values, setValues] = useState({
    min: "",
    max: "",
    category: "",
    subcategory: "",
    colors: "",
    size: "",
    discount: false,
    hot: false,
  });

  //handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //handle select change
  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    propertyToUpdate: string,
  ) => {
    setValues({
      ...values, // Menyalin semua properti yang sudah ada dalam state values
      [propertyToUpdate]: e.target.value, // Mengatur nilai properti yang ingin diperbarui sesuai dengan nilai yang dipilih
    });
  };

  //handle searh filter
  const router = useRouter();
  const pathName = usePathname();
  const handleClick = useCallback(() => {
    try {
      const updateQuery: any = {};

      if (values.category !== "") {
        updateQuery.category = values.category;
      }
      if (values.subcategory !== "") {
        updateQuery.subcategory = values.subcategory;
      }
      if (values.min !== "") {
        updateQuery.min = values.min;
      }
      if (values.max !== "") {
        updateQuery.max = values.max;
      }
      if (values.colors !== "") {
        updateQuery.colors = values.colors;
      }
      if (values.size !== "") {
        updateQuery.size = values.size;
      }
      if (values.discount !== false) {
        updateQuery.discount = values.discount;
      }
      if (values.hot !== false) {
        updateQuery.hot = values.hot;
      }

      const url = qs.stringifyUrl(
        {
          url: pathName,
          query: updateQuery,
        },
        { skipNull: true },
      );
      router.push(url);
    } catch (error) {
      toast.error(error as string);
    }
  }, [router, values]);

  return (
    <section className="relative w-full max-w-xs">
      <div className="sticky top-24">
        <Card>
          <CardBody className="flex flex-col gap-2">
            <div className="flex flex-row gap-x-4">
              <Input
                type="number"
                startContent={<>$</>}
                label="Min"
                size="sm"
                placeholder="1"
                name="min"
                value={values.min.toString()}
                onChange={handleChange}
              />
              <Input
                type="number"
                startContent={<>$</>}
                label="Max"
                size="sm"
                placeholder="1"
                name="max"
                value={values.max.toString()}
                onChange={handleChange}
              />
            </div>
            <Select
              label="Colors"
              name="colors"
              labelPlacement="outside"
              variant="bordered"
              size="sm"
              placeholder="Select colors"
              selectedKeys={[values.colors]}
              className="max-w-xs"
              onChange={(e) => handleSelectionChange(e, "colors")}
            >
              {Colors.map((color) => (
                <SelectItem key={color.name} value={color.name}>
                  {color.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Type product"
              labelPlacement="outside"
              variant="bordered"
              size="sm"
              placeholder="Select type product"
              selectedKeys={[values.category]}
              onChange={(e) => handleSelectionChange(e, "category")}
            >
              {Categories.map((item) => (
                <SelectItem key={item.title} value={item.title}>
                  {item.title}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Category"
              labelPlacement="outside"
              variant="bordered"
              size="sm"
              selectedKeys={[values.subcategory]}
              placeholder="Select category"
              onChange={(e) => handleSelectionChange(e, "subcategory")}
            >
              {Subcategory.map((item) => (
                <SelectItem key={item.title} value={item.title}>
                  {item.title}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Size"
              labelPlacement="outside"
              variant="bordered"
              size="sm"
              selectedKeys={[values.size]}
              placeholder="Select size"
              onChange={(e) => handleSelectionChange(e, "size")}
            >
              {Sizes.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </Select>
            <div className="flex flex-row gap-2">
              <Checkbox
                color="primary"
                isSelected={values.discount === true}
                onChange={() => {
                  setValues({
                    ...values,
                    discount: !values.discount,
                  });
                }}
              />
              Discount
            </div>
            <div className="flex flex-row gap-2">
              <Checkbox
                color="primary"
                isSelected={values.hot === true}
                onChange={() => {
                  setValues({
                    ...values,
                    hot: !values.hot,
                  });
                }}
              />
              Hot sale
            </div>
          </CardBody>
          <CardFooter className="gap-2">
            <Button fullWidth size="sm" color="primary" onClick={handleClick}>
              Submit
            </Button>
            <Button
              size="sm"
              variant="flat"
              onClick={() =>
                setValues({
                  min: "",
                  max: "",
                  category: "",
                  subcategory: "",
                  colors: "",
                  size: "",
                  discount: false,
                  hot: false,
                })
              }
            >
              Clear filter
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default FormFilterProducts;
