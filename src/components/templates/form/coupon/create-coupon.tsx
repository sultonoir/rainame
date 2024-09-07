"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  createCouponInput,
  type CreateCouponSchema,
} from "@/server/api/routers/coupon/coupon.input";
import dynamic from "next/dynamic";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Link from "next/link";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function CreateCoupon() {
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

  const form = useForm<CreateCouponSchema>({
    resolver: zodResolver(createCouponInput),
    defaultValues: {
      title: "",
      tac: "",
      discount: 0,
      amount: undefined,
      minOrder: 0,
      expiresAt: new Date(),
      code: undefined,
    },
  });

  const router = useRouter();
  const addcoupon = api.coupon.post.useMutation({
    onSuccess: () => {
      toast.success("Coupon created");
      form.reset();
      router.push("/dashboard/coupon");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  async function onSubmit(data: CreateCouponSchema) {
    await addcoupon.mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Coupon details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tac"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms and conditions</FormLabel>
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
            <CardTitle>Discounted</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full flex-col gap-4 xl:flex-row">
            <FormField
              control={form.control}
              name="minOrder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Min order</FormLabel>
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
                  <FormLabel>Max discout</FormLabel>
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
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Coupon amount</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center rounded-lg border px-1 py-0.5 outline-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring">
                      <div className="flex size-9 items-center justify-center rounded-l bg-secondary">
                        +
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
              name="expiresAt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Coupon expiration date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Button type="button" asChild variant="outline">
            <Link href="/dashboard/coupon">Discard</Link>
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
  );
}
