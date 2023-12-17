"use client";
import React, { type ChangeEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  type SelectedItems,
  Chip,
  SelectItem,
  Image,
} from "@nextui-org/react";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories, Colors, Sizes } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { toast } from "sonner";

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
  imageUrl: z.array(z.string()).min(1, {
    message: "form has not been filled out",
  }),
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

export default function ModalCreateProduct() {
  const [files, setFiles] = useState<File[]>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: 1,
      stock: 1,
      discount: undefined,
      subcategory: "",
      imageUrl: [],
      color: [],
      category: [],
      size: [],
    },
  });

  // api create product
  const ctx = api.useUtils();
  const { mutate } = api.product.createProduct.useMutation({
    onSuccess: async () => {
      await ctx.product.getAllProduct.refetch();
      toast.success("product created");
      reset();
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
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (values: string[]) => void,
  ) => {
    e.preventDefault();
    const imageUrls: string[] = [];

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFiles(files);
      files.map((file) => {
        if (!file.type.includes("image")) return;

        const fileReader = new FileReader();

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() ?? "";
          imageUrls.push(imageDataUrl);

          if (imageUrls.length === files.length) {
            // Setelah semua gambar telah diunggah, panggil fieldChange
            fieldChange(imageUrls);
          }
        };

        fileReader.readAsDataURL(file);
      });
    }
  };

  // delete image
  const handleDeleteImage = (index: number) => {
    const updatedImages = getValues("imageUrl");
    const updatedFiles = [...files]; // Buat salinan array files

    updatedFiles.splice(index, 1); // Hapus elemen dari salinan array files
    updatedImages.splice(index, 1); // Anda mungkin perlu memperbarui array getValues juga

    setFiles(updatedFiles); // Perbarui state files dengan salinan yang sudah diubah
  };

  // hook upload image
  const { startUpload } = useUploadThing("media");

  // handle Submit
  const onSubmit: SubmitHandler<ProductSchema> = async (values) => {
    const imgRes = await startUpload(files);
    if (imgRes) {
      const imageUrls = imgRes.map((file) => file.url);
      values.imageUrl = imageUrls;
    }
    mutate(values);
  };

  return (
    <>
      <Button size="md" color="primary" onPress={onOpen}>
        Create product
        <PlusCircleIcon />
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          variant="flat"
                          labelPlacement="outside"
                          type="Name"
                          placeholder="Product name"
                          label="Name"
                          {...field}
                        />
                        {errors.name && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.name.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Textarea
                          variant="flat"
                          labelPlacement="outside"
                          placeholder="Product name"
                          label="Description"
                          {...field}
                        />
                        {errors.desc && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.desc.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          variant="flat"
                          type="number"
                          labelPlacement="outside"
                          placeholder="0"
                          label="Price"
                          {...field}
                          value={field.value.toString()}
                          onChange={(e) => {
                            handleChange(e, field.onChange);
                          }}
                          startContent={<p>$</p>}
                        />
                        {errors.desc && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.desc.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          variant="flat"
                          type="number"
                          labelPlacement="outside"
                          placeholder="0"
                          label="Discount"
                          {...field}
                          value={field.value?.toString()}
                          onChange={(e) => {
                            handleChange(e, field.onChange);
                          }}
                          endContent={<p>%</p>}
                        />
                        {errors.discount && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.discount.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          variant="flat"
                          type="number"
                          labelPlacement="outside"
                          label="Stock"
                          {...field}
                          value={field.value.toString()}
                          onChange={(e) => {
                            handleChange(e, field.onChange);
                          }}
                        />
                        {errors.stock && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.stock.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="subcategory"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input
                          variant="flat"
                          labelPlacement="outside"
                          type="Name"
                          placeholder="T-shrit,Shoes,ETC..."
                          label="Product type"
                          {...field}
                        />
                        {errors.subcategory && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.subcategory.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          items={Categories}
                          variant="bordered"
                          isMultiline={true}
                          label="Categories"
                          labelPlacement="outside"
                          aria-label="select"
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
                                  <Chip key={item.key} color="primary">
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
                        {errors.category && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.category.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          items={Colors}
                          variant="bordered"
                          label="Colors"
                          labelPlacement="outside"
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
                                  <Chip key={item.key} color="primary">
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
                        {errors.color && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.color.message}`}</p>
                        )}
                      </>
                    )}
                  />
                  <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          {...field}
                          size="sm"
                          items={Sizes}
                          variant="bordered"
                          label="Size"
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
                                  <Chip key={item.key} color="primary">
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
                        {errors.size && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.size.message}`}</p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="imageUrl"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-5">
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
                                  handleDeleteImage(index);
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
                          onChange={(e) => handleImage(e, field.onChange)}
                          className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:cursor-pointer hover:file:bg-primary/80"
                        />
                        {errors.name && (
                          <p className="-mt-3 ml-2 text-small text-danger">{`${errors.name.message}`}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              <ModalFooter>
                <Button color="primary" type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
