"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FieldCategory } from "./field-category";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FieldImage from "./field-image";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FieldSubcategory from "./field-subcategory";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { CreateProductSchema } from "@/server/api/routers/product/product.input";
import { Textarea } from "@/components/ui/textarea";

export function FormProduct() {
  const Editor = React.useMemo(
    () =>
      dynamic(() => import("@/components/ui/editor"), {
        ssr: false,
        loading: () => (
          <Skeleton className="flex min-h-[300px] w-full items-center justify-center" />
        ),
      }),
    [],
  );
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: "",
      category: {
        label: "",
        value: "",
      },
      images: [],
      price: 0,
      discount: 0,
      desc: "",
      stockAdnSize: [
        {
          stock: "",
          size: "",
        },
      ],
      subcategory: {
        label: "",
        value: "",
      },
    },
  });

  const { startUpload } = useUploadThing("media");
  const router = useRouter();

  const addProduct = api.product.post.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: (e) => {
      router.push(`/product/${e}`);
    },
  });
  async function onSubmit(data: CreateProductSchema) {
    let resultImages: string[] = [];
    const uploadimages = await startUpload(data.images);
    if (uploadimages) {
      resultImages = uploadimages.map((item) => item.url);
    }

    addProduct.mutate({
      ...data,
      images: resultImages,
    });
  }

  const category = form.watch("category");

  const { fields, append, remove } = useFieldArray({
    name: "stockAdnSize",
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                name="sumary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriptions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Rainame T-Shirt Basic Meghan Black"
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
                    <FormLabel>Details</FormLabel>
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
            <CardContent className="flex w-full flex-col gap-4 xl:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center rounded-lg border px-1 py-0.5 outline-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring">
                        <div className="flex size-9 items-center justify-center rounded-l bg-secondary">
                          $
                        </div>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="rounded-l-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            const num = parseFloat(value);
                            if (num <= 0) {
                              return field.onChange(0);
                            }
                            field.onChange(num);
                          }}
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
                      <div className="flex w-full items-center rounded-lg border px-1 py-0.5 outline-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring">
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="rounded-l-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            const num = parseFloat(value);
                            if (num > 100) {
                              return field.onChange(100);
                            }
                            if (num <= 0) {
                              return field.onChange(0);
                            }
                            field.onChange(num);
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
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="capitalize">
                      Category {field.value.label}
                    </FormLabel>
                    <FormControl>
                      <FieldCategory
                        value={field.value}
                        setValue={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {category.label && (
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="capitalize">
                        Sub Category {field.value.label}
                      </FormLabel>
                      <FormControl>
                        <FieldSubcategory
                          id={category.value}
                          value={field.value}
                          setValue={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FieldImage
                        images={field.value}
                        setImages={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              {fields.map((field, index) => (
                <div className="flex w-full items-end gap-2" key={field.id}>
                  <FormField
                    control={form.control}
                    name={`stockAdnSize.${index}.stock`}
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
                    name={`stockAdnSize.${index}.size`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Size
                        </FormLabel>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
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
                Add more...
              </Button>
            </div>
          </Card>
          <div className="flex gap-2">
            <Button type="button" asChild variant="outline">
              <Link href="/dashboard/products">Discard</Link>
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}