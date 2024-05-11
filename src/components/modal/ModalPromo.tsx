"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
  User,
} from "@nextui-org/react";
import {
  ImageIcon,
  PlusCircleIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/Form";
("react-hook-form");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/trpc/react";
import { useDebouncedCallback } from "use-debounce";
import { type Products } from "@prisma/client";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters",
  }),
  imageUrl: z.string(),
  discount: z.number().min(1).max(100, { message: "Max discount 100%" }),
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      path: z.string(),
      desc: z.string(),
      imageUrl: z.array(z.string()),
      size: z.array(z.string()),
      color: z.array(z.string()),
      price: z.number(),
      discount: z.number().nullable(),
      subcategory: z.string(),
      stock: z.number(),
      selling: z.number(),
      category: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string(),
      promoId: z.string().nullable(),
    }),
  ),
});

type SelectProduct = {
  product: Products;
  formProduct: Products[];
  fieldChange: (value: Products[]) => void;
};
type DeleteSelectProduct = {
  index: Products;
  formProduct: Products[];
  fieldChange: (value: Products[]) => void;
};

type Promo = z.infer<typeof productSchema>;

const ModalPromo = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const form = useForm<Promo>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      discount: 0,
      products: [],
    },
  });
  //handle change image
  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    const fileReader = new FileReader();

    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const newFiles = Array.from(e.target.files);
      setFiles(newFiles);

      if (!file?.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
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

  //handle search products
  const [select, setSelect] = React.useState<Products[] | null>([]);
  const products = api.product.getSearch.useMutation({
    onSuccess(data) {
      setSelect(data);
    },
  });

  const handleSearch = useDebouncedCallback((term: string) => {
    products.mutate({
      name: term,
    });
  }, 300);

  //handle select product

  const handleSelect = ({
    product,
    fieldChange,
    formProduct,
  }: SelectProduct) => {
    const uniqueFiles: Products[] = [];
    const isDuplicate = formProduct.some((item) => item.id === product.id);

    if (!isDuplicate) {
      uniqueFiles.push(product);
      const updateSelect = [...(select ?? [])];
      const updatedList = updateSelect.filter((item) => item.id !== product.id);
      setSelect(updatedList);
    }
    fieldChange([...formProduct, ...uniqueFiles]);
  };

  //handle delete select product
  const handleDelete = ({
    index,
    formProduct,
    fieldChange,
  }: DeleteSelectProduct) => {
    const updateSelect = [...formProduct];
    const updatedList = updateSelect.filter((item) => item.id !== index.id);
    fieldChange(updatedList);
  };

  // hook upload image
  const { startUpload } = useUploadThing("media");

  //handle submit
  const ctx = api.useUtils();
  const promo = api.promo.createPromo.useMutation({
    onSuccess: async () => {
      await ctx.promo.getPromo.refetch();
      form.reset();
      onClose();
      setFiles([]);
      toast.success("Promo created");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const onSubmit: SubmitHandler<Promo> = async (values) => {
    const imgRes = await startUpload(files);
    if (imgRes) {
      const imageUrls = imgRes.at(0)?.url;
      values.imageUrl = imageUrls ?? "";
    }
    promo.mutate(values);
  };

  return (
    <>
      <Button
        size="md"
        color="primary"
        onPress={onOpen}
        startContent={<PlusCircleIcon />}
        className="max-w-xs"
      >
        Create hero promo
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Add promo hero</ModalHeader>
              <ModalBody>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  variant="flat"
                                  labelPlacement="outside"
                                  type="Name"
                                  placeholder="Promo name"
                                  label="Promo name"
                                  {...field}
                                />
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
                              <FormControl>
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
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-center gap-4">
                              <FormLabel className="h-full w-full cursor-pointer">
                                {field.value ? (
                                  <Image
                                    removeWrapper
                                    src={field.value}
                                    alt="profile_icon"
                                    width={200}
                                    height={200}
                                    className="h-auto max-h-96 w-full rounded-2xl object-contain"
                                  />
                                ) : (
                                  <div className="flex h-96 cursor-pointer flex-col items-center justify-center border border-dashed">
                                    <ImageIcon size={50} />
                                    <p>Upload image promo here</p>
                                  </div>
                                )}
                              </FormLabel>
                              <FormControl className="text-base-semibold flex-1 text-gray-200">
                                <input
                                  type="file"
                                  accept="image/*"
                                  placeholder="Add profile photo"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImage(e, field.onChange)
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="products"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col gap-2">
                                <div className="flex min-h-unit-24 flex-row flex-wrap gap-2 rounded-lg border border-default-400 p-2">
                                  {field.value.map((item) => (
                                    <Button
                                      size="sm"
                                      key={item.id}
                                      variant="solid"
                                      className="justify-start"
                                      endContent={<Trash2Icon />}
                                      onClick={() =>
                                        handleDelete({
                                          index: item,
                                          fieldChange: field.onChange,
                                          formProduct: field.value,
                                        })
                                      }
                                    >
                                      {item.name}
                                    </Button>
                                  ))}
                                </div>
                                <Input
                                  variant="flat"
                                  labelPlacement="outside"
                                  type="Name"
                                  placeholder="Search..."
                                  label="Search product"
                                  startContent={<SearchIcon />}
                                  onChange={(e) => handleSearch(e.target.value)}
                                />
                                <div className="flex max-h-[377px] flex-col gap-1 overflow-auto">
                                  {select ? (
                                    <>
                                      {select.length < 1 ? (
                                        <p className="text-center text-lg font-semibold">
                                          Product not found
                                        </p>
                                      ) : (
                                        <>
                                          {select?.map((item) => (
                                            <User
                                              key={item.id}
                                              name={item.name}
                                              className="w-full cursor-pointer justify-start bg-content2 p-2 hover:opacity-80"
                                              avatarProps={{
                                                src: item.imageUrl.at(0),
                                              }}
                                              onClick={() =>
                                                handleSelect({
                                                  product: item,
                                                  formProduct: field.value,
                                                  fieldChange: field.onChange,
                                                })
                                              }
                                              description={
                                                <>
                                                  {item.discount! > 0 ? (
                                                    <p>{item.discount}%</p>
                                                  ) : null}
                                                </>
                                              }
                                            />
                                          ))}
                                        </>
                                      )}
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <ModalFooter className="px-0">
                      <Button
                        isLoading={form.formState.isSubmitting}
                        color="primary"
                        className="w-full"
                        size="md"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPromo;
