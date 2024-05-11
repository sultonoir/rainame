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
  categoryId: z.string(),
});

interface Props {
  categoryId: string;
}

const CreateSubCategory = ({ categoryId }: Props) => {
  const { subCategoryOpen, setSubCategoryOpen } = useActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId,
    },
  });

  const ctx = api.useUtils();

  const { mutate, isPending } = api.subCategory.createSubCategory.useMutation({
    onError: (e) => {
      toast.error(e.message);
    },
    onSettled: async () => {
      await ctx.subCategory.getSubCategory.invalidate();
      form.reset();
      setSubCategoryOpen(false);
      toast.success("Subcategory created");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ name: values.name, categoryId });
  }
  return (
    <Dialog open={subCategoryOpen} onOpenChange={setSubCategoryOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create subcategory</DialogTitle>
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

export default CreateSubCategory;
