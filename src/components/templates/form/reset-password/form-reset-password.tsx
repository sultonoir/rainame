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
import { ButtonLoading } from "@/components/templates/button/button-loading";
import { client } from "@/lib/auth-client";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function FormResetPassword() {
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    try {
      const { error } = await client.resetPassword({
        newPassword: data.password,
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
    router.push("/");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center justify-center">
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your new password to continue shopping
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*******" {...field} />
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
      </CardContent>
    </Card>
  );
}
