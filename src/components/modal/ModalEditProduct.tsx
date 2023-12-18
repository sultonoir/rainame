"use client";
import React, { type ChangeEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  type SelectedItems,
  Chip,
  SelectItem,
  Image,
  useDisclosure,
} from "@nextui-org/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/Form";
import { Edit, XIcon } from "lucide-react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories, Colors, Sizes } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type Products } from "@prisma/client";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters",
  }),
  desc: z.string(),
  price: z.number(),
  stock: z.number().min(1, {
    message: "form has not been filled out",
  }),
  discount: z.number().max(100).optional().nullable(),
  subcategory: z.string(),
  imageUrl: z.array(z.string()),
  color: z.array(z.string()).min(1, {
    message: "form has not been filled out",
  }),
  category: z.array(z.string()).min(1, {
    message: "form has not been filled out",
  }),
  size: z.array(z.string()).min(1, {
    message: "form has not been filled out",
  }),
});

type ProductSchema = z.infer<typeof productSchema>;

type Cate = {
  title: string;
};

type Color = {
  name: string;
  hex: string;
  rgb: string;
};

type Size = {
  name: string;
};

type TEdit = {
  product: Products | undefined;
};
export default function ModalEditProduct({ product }: TEdit) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ? product.name : "",
      desc: product?.desc ? product.desc : "",
      stock: product?.stock,
      price: product?.price,
      discount: product?.discount,
      subcategory: product?.subcategory,
      imageUrl: product?.imageUrl ? product.imageUrl : [],
      color: product?.color ? product.color : [],
      category: product?.category ? product.category : [],
      size: product?.size ? product.size : [],
    },
    shouldUnregister: false,
  });

  // api create product
  const ctx = api.useUtils();
  const { mutate } = api.product.updateByid.useMutation({
    onSuccess: async () => {
      await ctx.product.getAllProduct.refetch();
      toast.success("product created");
      form.reset();
      onClose();
      setFiles([]);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  //change value number
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: number) => void,
  ) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      const numericValue = parseFloat(value);
      fieldChange(numericValue);
    }
  };

  // handle select change
  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldChange: (value: string[]) => void,
  ) => {
    const selectedValues = e.target.value.split(",");
    fieldChange(selectedValues);
  };

  // handle render image
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const uniqueFiles: File[] = [];

      newFiles.forEach((file) => {
        if (!file.type.includes("image")) return;

        const isDuplicate = files.some((item) => item.name === file.name);
        if (!isDuplicate) {
          uniqueFiles.push(file);
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
      });

      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    }
  };

  // delete image prev
  const handleDeleteImage = (
    index: number,
    fieldChange: (value: string[] | undefined) => void,
  ) => {
    const updatedImages = form.getValues("imageUrl");

    updatedImages?.splice(index, 1);
    fieldChange(updatedImages);
  };

  //delete image files
  const handleDeleteFiles = (index: number) => {
    const updatefile = [...files];
    updatefile.splice(index, 1);
    setFiles(updatefile);
  };

  // hook upload image
  const { startUpload } = useUploadThing("blob");
  // handle Submit
  const onSubmit: SubmitHandler<ProductSchema> = async (values) => {
    const path = values.name.replaceAll(/[^a-zA-Z0-9]/g, "-");
    setisLoading(true);
    try {
      if (files.length > 0) {
        const imageUpload = await startUpload(files);
        if (imageUpload) {
          imageUpload.map((image) => {
            values.imageUrl.push(image.url);
          });
        }
        mutate({
          id: product?.id ?? "",
          name: values.name,
          desc: values.desc,
          stock: values.stock,
          subcategory: values.subcategory,
          imageUrl: values.imageUrl,
          color: values.color,
          category: values.category,
          size: values.size,
          price: values.price,
          path,
        });
      } else {
        mutate({
          id: product?.id ?? "",
          name: values.name,
          desc: values.desc,
          stock: values.stock,
          subcategory: values.subcategory,
          imageUrl: values.imageUrl,
          color: values.color,
          category: values.category,
          size: values.size,
          price: values.price,
          path,
        });
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        size="sm"
        variant="flat"
        color="primary"
      >
        <Edit size={18} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create product
          </ModalHeader>
          <ModalBody>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                  <div className="flex w-full flex-col gap-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>name</FormLabel>
                          <FormControl>
                            <Input
                              labelPlacement="outside"
                              placeholder="Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="desc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea labelPlacement="outside" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              labelPlacement="outside"
                              value={field.value?.toString()}
                              onChange={(e) => {
                                handleChange(e, field.onChange);
                              }}
                              type="number"
                              placeholder="0.00"
                              startContent={
                                <div className="pointer-events-none flex items-center">
                                  <span className="text-small text-default-400">
                                    %
                                  </span>
                                </div>
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              variant="flat"
                              type="number"
                              labelPlacement="outside"
                              placeholder="0"
                              {...field}
                              value={field.value.toString()}
                              onChange={(e) => {
                                handleChange(e, field.onChange);
                              }}
                              startContent={<p>$</p>}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              labelPlacement="outside"
                              {...field}
                              onChange={(e) => {
                                handleChange(e, field.onChange);
                              }}
                              value={field.value?.toString()}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subcategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory</FormLabel>
                          <FormControl>
                            <Input
                              labelPlacement="outside"
                              placeholder="T-shrit,Shoes, ETc"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              size="sm"
                              items={Categories}
                              labelPlacement="outside"
                              variant="bordered"
                              isMultiline={true}
                              selectedKeys={field.value}
                              aria-label="select category"
                              onChange={(e) =>
                                handleSelectionChange(e, field.onChange)
                              }
                              selectionMode="single"
                              placeholder="Select a category"
                              classNames={{
                                base: "max-w-full",
                                trigger: "min-h-unit-12 py-2",
                              }}
                              renderValue={(items: SelectedItems<Cate>) => {
                                return (
                                  <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                      <Chip color="primary" key={item.key}>
                                        {item.data?.title}
                                      </Chip>
                                    ))}
                                  </div>
                                );
                              }}
                            >
                              {(e) => (
                                <SelectItem key={e.title} textValue={e.title}>
                                  {e.title}
                                </SelectItem>
                              )}
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              size="sm"
                              items={Colors}
                              labelPlacement="outside"
                              variant="bordered"
                              isMultiline={true}
                              selectedKeys={field.value}
                              aria-label="select"
                              onChange={(e) =>
                                handleSelectionChange(e, field.onChange)
                              }
                              selectionMode="multiple"
                              placeholder="Select a color"
                              classNames={{
                                base: "max-w-full",
                                trigger: "min-h-unit-12 py-2",
                              }}
                              renderValue={(items: SelectedItems<Color>) => {
                                return (
                                  <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                      <Chip color="primary" key={item.key}>
                                        {item.data?.name}
                                      </Chip>
                                    ))}
                                  </div>
                                );
                              }}
                            >
                              {(e) => (
                                <SelectItem key={e.name} textValue={e.name}>
                                  {e.name}
                                </SelectItem>
                              )}
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              size="sm"
                              items={Sizes}
                              variant="bordered"
                              labelPlacement="outside"
                              isMultiline={true}
                              selectedKeys={field.value}
                              aria-label="select"
                              onChange={(e) =>
                                handleSelectionChange(e, field.onChange)
                              }
                              selectionMode="multiple"
                              placeholder="Select a Size"
                              classNames={{
                                base: "max-w-full",
                                trigger: "min-h-unit-12 py-2",
                              }}
                              renderValue={(items: SelectedItems<Size>) => {
                                return (
                                  <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                      <Chip color="primary" key={item.key}>
                                        {item.data?.name}
                                      </Chip>
                                    ))}
                                  </div>
                                );
                              }}
                            >
                              {(e) => (
                                <SelectItem key={e.name} textValue={e.name}>
                                  {e.name}
                                </SelectItem>
                              )}
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col gap-3">
                              <div className="grid grid-cols-2 gap-5">
                                {field.value?.map((item, index) => (
                                  <div key={item} className="relative">
                                    <Image
                                      src={item}
                                      alt={`Gambar ${index + 1}`}
                                      className="z-0 aspect-square object-cover"
                                    />
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      radius="full"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteImage(
                                          index,
                                          field.onChange,
                                        );
                                      }}
                                      className="absolute right-2 top-2 z-50 bg-danger px-2 py-1 text-white"
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                ))}
                                {files.map((item, index) => (
                                  <div key={item.name} className="relative">
                                    <Image
                                      src={URL.createObjectURL(item)}
                                      alt={`Gambar ${index + 1}`}
                                      className="z-0 aspect-square object-cover"
                                    />
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      radius="full"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteFiles(index);
                                      }}
                                      className="absolute right-2 top-2 z-50 bg-danger px-2 py-1 text-white"
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                placeholder="Add profile photo"
                                onChange={(e) => handleImage(e)}
                                className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:cursor-pointer hover:file:bg-primary/80"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <ModalFooter>
                  <Button color="primary" type="submit" isLoading={isLoading}>
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
