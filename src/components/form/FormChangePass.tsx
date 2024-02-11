"use client";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const updateAdmin = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must be match",
    path: ["confirmPassword"],
  });

type UpdateAdmin = z.infer<typeof updateAdmin>;

const FormChangePass = () => {
  const { data: admin } = useSession();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateAdmin>({
    resolver: zodResolver(updateAdmin),
    defaultValues: {
      email: admin?.user.email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  //change pass
  const { mutate } = api.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success("Password has change");
      reset();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit: SubmitHandler<UpdateAdmin> = (data) => {
    mutate({
      currentPassword: data.password,
    });
  };
  return (
    <form
      className="mx-auto flex w-full flex-col gap-3 lg:max-w-xs"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <>
            <Input
              isDisabled
              variant="flat"
              size="sm"
              labelPlacement="outside"
              type="email"
              placeholder="Enter your email"
              label="Email"
              {...field}
            />
            {errors.email && (
              <p className="-mt-3 ml-2 text-small text-danger">{`${errors.email.message}`}</p>
            )}
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <>
            <Input
              variant="flat"
              size="sm"
              labelPlacement="outside"
              placeholder="Enter your password"
              label="Password"
              type="password"
              {...field}
            />
            {errors.password && (
              <p className="-mt-3 ml-2 text-small text-danger">{`${errors.password.message}`}</p>
            )}
          </>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <>
            <Input
              variant="flat"
              size="sm"
              labelPlacement="outside"
              placeholder="Confrim your password"
              label="Password"
              type="password"
              {...field}
            />
            {errors.confirmPassword && (
              <p className="-mt-3 ml-2 text-small text-danger">{`${errors.confirmPassword.message}`}</p>
            )}
          </>
        )}
      />
      <Button type="submit" color="primary" size="sm">
        Change password
      </Button>
    </form>
  );
};

export default FormChangePass;
