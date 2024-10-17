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
import { signIn } from "@/lib/auth-client";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
  rememberMe: z.boolean(),
});

export function FormSignin() {
  const { setIsOpen, setType } = useAuthDialog();
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: z.infer<typeof SigninFormSchema>) {
    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        return toast.error(error.message);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }
    }
    form.reset();
    setIsOpen(false);
  }

  const handleForgotPass = () => {
    setType("forgot-password");
  };

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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex w-full items-center justify-between leading-none">
                <FormLabel>Remember me</FormLabel>
                <ButtonLoading
                  type="button"
                  variant="link"
                  className="h-fit p-0"
                  onClick={handleForgotPass}
                >
                  Forgot password ?
                </ButtonLoading>
              </div>
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
