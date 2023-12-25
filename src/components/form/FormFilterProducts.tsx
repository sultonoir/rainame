"use client";

import React, { useState } from "react";
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
import { setCookies } from "@/lib/actions";

const FormFilterProducts = () => {
  const [values, setValues] = useState({
    min: "10",
    max: "100",
    category: "man",
    colors: "black",
    size: "s",
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

  //handle click
  const handleClick = async () => {
    await setCookies({
      name: "jajang",
      value: "panjaitan",
    });
  };

  return (
    <section className="relative w-full lg:w-fit">
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
              className="w-full lg:max-w-xs"
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
              className="max-w-xs"
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
              placeholder="Select category"
              className="max-w-xs"
              onChange={(e) => handleSelectionChange(e, "category")}
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
              placeholder="Select size"
              className="max-w-xs"
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
                color="danger"
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
                color="danger"
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
          <CardFooter>
            <Button
              className="w-full"
              size="sm"
              color="danger"
              onClick={handleClick}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default FormFilterProducts;
