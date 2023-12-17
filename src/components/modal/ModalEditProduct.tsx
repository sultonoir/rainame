"use client";
import React, { type ChangeEvent, useState, useEffect } from "react";
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
  const [isLoading, setisLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const convertToFiles = async () => {
      const filesArray: File[] = [];
      for (const imageUrl of product?.imageUrl ?? []) {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          const file = new File([blob], `image_${Date.now()}.png`, {
            type: "image/png",
          });
          filesArray.push(file);
        } catch (error) {
          toast.error("Error: Failed to create Blob file.");
        }
      }
      setFiles(filesArray);
    };

    convertToFiles().catch(() => {
      toast.error("An error occurred while converting the image:");
    });
  }, [product?.imageUrl]);

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

  //convert
  const convertDataUrlToBlob = (dataUrl: string): Blob | null => {
    const arr = dataUrl.split(",");

    if (arr.length < 2 || !arr[1]) {
      // Menampilkan pesan kesalahan jika data URL tidak sesuai
      toast.error("Invalid URL data");
      return null;
    }

    const mime = arr[0]?.match(/:(.*?);/) ?? [];
    const mimeType = mime[1] ?? "image/png";

    const byteString = atob(arr[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeType });
  };

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
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (values: string[]) => void,
    fieldValue: string[],
  ) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const filesToConvert = Array.from(e.target.files);
      const newFiles: File[] = [];

      const filePromises = filesToConvert.map((file) => {
        return new Promise<string>((resolve) => {
          const fileReader = new FileReader();

          fileReader.onload = (event) => {
            const imageDataUrl = event.target?.result?.toString() ?? "";
            resolve(imageDataUrl);
          };

          fileReader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises)
        .then((results) => {
          const allFiles: string[] = [...fieldValue];

          results.forEach((imageDataUrl) => {
            if (!allFiles.includes(imageDataUrl)) {
              const blob = convertDataUrlToBlob(imageDataUrl);
              if (blob) {
                const fileName = `image_${Date.now()}`;
                const newFile = new File([blob], fileName, { type: blob.type });
                newFiles.push(newFile);
                allFiles.push(imageDataUrl); // Tambahkan ke allFiles jika belum ada
              } else {
                toast.error("Error: Gagal membuat file Blob.");
              }
            } else {
              toast.error("file has been added");
            }
          });

          // Setelah semua file baru dan yang ada di allFiles diubah dari URL gambar, simpan di state files
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          // Panggil fieldChange untuk mengubah nilai fieldValue jika diperlukan
          fieldChange(allFiles);
        })
        .catch(() => {
          toast.error("Error reading files:");
        });
    }
  };

  // delete image
  const handleDeleteImage = (
    index: number,
    fieldChange: (value: string[] | undefined) => void,
  ) => {
    const updatedImages = form.getValues("imageUrl");
    const updatefile = [...files];
    updatefile.splice(index, 1);
    updatedImages?.splice(index, 1);
    fieldChange(updatedImages);
    setFiles(updatefile);
  };

  // hook upload image
  const { startUpload } = useUploadThing("blob");
  // handle Submit
  const onSubmit: SubmitHandler<ProductSchema> = async (values) => {
    const path = values.name.replaceAll(/[^a-zA-Z0-9]/g, "-");
    setisLoading(true);
    try {
      const imageUpload = await startUpload(files);
      if (imageUpload) {
        const imageRes = imageUpload.map((image) => image.url);
        values.imageUrl = imageRes;
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
                              {...field}
                              type="number"
                              labelPlacement="outside"
                              placeholder="0.00"
                              value={field.value?.toString()}
                              startContent={
                                <div className="pointer-events-none flex items-center">
                                  <span className="text-small text-default-400">
                                    $
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
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              labelPlacement="outside"
                              {...field}
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
                              aria-label="select category"
                              selectedKeys={field.value}
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
                              aria-label="select"
                              selectedKeys={field.value}
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
                              aria-label="select"
                              selectedKeys={field.value}
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
                              </div>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                placeholder="Add profile photo"
                                onChange={(e) =>
                                  handleImage(e, field.onChange, field.value)
                                }
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
