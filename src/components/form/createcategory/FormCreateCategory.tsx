"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useActions from "@/hook/useActions";

const formSchema = z.object({
  name: z.string(),
});

const FormCreateCategory = () => {
  const { categoryOpen, setCategoryOpen } = useActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const ctx = api.useUtils();

  const { mutate, isPending } = api.category.createCategory.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSettled: async () => {
      await ctx.category.getCategory.invalidate();
      form.reset();
      setCategoryOpen(false);
      toast.success("Subcategory created");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ name: values.name });
  }
  return (
    <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sizes</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="T-shirt,etc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormCreateCategory;
