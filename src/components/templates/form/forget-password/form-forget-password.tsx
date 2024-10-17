"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { ButtonLoading } from "@/components/templates/button/button-loading";
import { client } from "@/lib/auth-client";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const ForgetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export function FormForgetPassword() {
  const { setIsOpen } = useAuthDialog();
  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ForgetPasswordSchema>) {
    try {
      const { error } = await client.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });
      if (error) {
        return toast.error(error.message);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    }
    toast.success(
      "We've sent a password reset link to your email or check your spam.",
    );
    form.reset();
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoading
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </ButtonLoading>
      </form>
    </Form>
  );
}
