"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import FieldSizes from "./FieldSizes";
import FieldCategories from "./FieldCategories";
import FielSubCategory from "./FieldSubCategory";
import FieldImage from "./FieldImage";
import { navigate } from "@/lib/navigate";
import { useUploadThing } from "@/lib/uploadthing";
import useDraft from "@/hook/useDraft";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { createBlurhash } from "@/lib/blur";
import CreateSubCategory from "../createSubcategory/CreateSubCategory";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  desc: z.string().min(1, { message: "Required" }),
  price: z.string().min(1, { message: "Required" }),
  stocks: z
    .array(
      z.object({
        stock: z.string().min(1, { message: "Required" }),
        size: z.string().min(1, { message: "Required" }),
      }),
    )
    .min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  subCategory: z.string().min(1, { message: "Required" }),
  discount: z.string().optional(),
  images: z.array(z.string()).min(1, { message: "must have min 4 picture" }),
});

interface imgProduct {
  url: string;
  blur: string;
}

const FormCreateProduct = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/ui/editor"), {
        ssr: false,
        loading: () => (
          <Skeleton className="flex min-h-[300px] w-full items-center justify-center" />
        ),
      }),
    [],
  );

  const { images, setImages } = useDraft();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      category: "",
      subCategory: "",
      price: "",
      discount: "",
      stocks: [
        {
          stock: "",
          size: "",
        },
      ],
      images: [],
    },
  });

  const { startUpload } = useUploadThing("media");
  const { mutate } = api.product.createProduct.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (e) => {
      toast.success(e.message);
      setImages([]);
      form.reset();
      navigate(`/product/${e.id}`);
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let imageUpload: imgProduct[] = [];

    const imgRes = await startUpload(images);

    if (imgRes) {
      const imageObjects = imgRes.map((item) => ({ url: item.url, blur: "" }));
      imageUpload = imageObjects;

      await Promise.all(
        imageUpload.map(async (item) => {
          const blurhash = await createBlurhash(item.url, 150, 150);
          item.blur = blurhash;
          return blurhash;
        }),
      );
    }
    mutate({
      images: imageUpload,
      title: values.title,
      desc: values.desc,
      price: values.price,
      stocks: values.stocks,
      category: values.category,
      subCategory: values.subCategory,
    });
  }

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    name: "stocks",
    control: form.control,
  });

  const category = form.watch("category");

  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <p className="text-lg font-semibold">Create product</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/dashboard")}
          >
            Discard
          </Button>
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
          >
            Save product
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {/* one */}
            <div className="col-span-1 space-y-5 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Product details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rainame T-Shirt Basic Meghan Black"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Rainame + subcategory + title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desctiptions</FormLabel>
                        <FormControl>
                          <Editor onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Price</CardTitle>
                </CardHeader>
                <CardContent className="flex w-full flex-col gap-4 lg:flex-row">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="flex w-full items-center">
                            <div className="flex size-9 items-center justify-center rounded-l bg-secondary">
                              $
                            </div>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <div className="flex w-full items-center">
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="rounded-r-none"
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                const num = parseFloat(value);
                                if (num > 100) {
                                  return field.onChange("100");
                                }
                                field.onChange(value);
                              }}
                            />
                            <div className="flex size-9 items-center justify-center rounded-r bg-secondary">
                              %
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent className="flex w-full flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FieldImage valueChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            {/* two */}
            <div className="col-span-1 space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle>Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  {fields.map((field, index) => (
                    <div className="flex w-full items-end gap-2" key={field.id}>
                      <FormField
                        control={form.control}
                        name={`stocks.${index}.stock`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Stock
                            </FormLabel>
                            <FormMessage />
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`stocks.${index}.size`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Size
                            </FormLabel>
                            <FormMessage />
                            <FormControl>
                              <FieldSizes setValue={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="mt-2 size-9 flex-shrink-0"
                        onClick={() => remove(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <Separator />
                <div className="flex items-center justify-center pb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ stock: "", size: "" })}
                  >
                    Add Stock
                  </Button>
                </div>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category {field.value}</FormLabel>
                        <FormControl>
                          <FieldCategories setValue={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subCategory"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>SubsubCategory</FormLabel>
                        <FormControl>
                          <div>
                            {category === "" ? (
                              <Button
                                disabled
                                className="h-9 w-full justify-between disabled:pointer-events-auto disabled:cursor-not-allowed"
                                variant="outline"
                              >
                                SubCategory
                                <ChevronDown size={15} />
                              </Button>
                            ) : (
                              <FielSubCategory
                                id={category}
                                setValue={field.onChange}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full lg:hidden"
          >
            Submit
          </Button>
        </form>
      </Form>
      <CreateSubCategory categoryId={category} />
    </div>
  );
};

export default FormCreateProduct;
