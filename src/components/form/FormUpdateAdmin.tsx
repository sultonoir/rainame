"use client";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type Store } from "@prisma/client";

const updateAdmin = z.object({
  email: z.string().email().optional(),
  name: z
    .string()
    .min(2, { message: "name at least have 2 character" })
    .optional(),
});

type UpdateAdmin = z.infer<typeof updateAdmin>;
type Tadmin = {
  admin?: Store;
};
const FormUpdateAdmin = ({ admin }: Tadmin) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<UpdateAdmin>({
    resolver: zodResolver(updateAdmin),
    defaultValues: {
      email: admin?.email,
      name: admin?.name ?? "",
    },
  });

  //update data admin
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.admin.updateAdmin.useMutation({
    onSuccess: () => {
      void ctx.admin.getAdmin.invalidate();
      const name = getValues("name");
      toast.success("Data updated");
      reset({
        name,
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit: SubmitHandler<UpdateAdmin> = (data) => {
    mutate({
      name: data.name,
    });
  };

  return (
    <form
      className="grid w-full grid-cols-1 gap-3"
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
              defaultValue={admin?.email}
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
        name="name"
        control={control}
        render={({ field }) => (
          <>
            <Input
              variant="flat"
              size="sm"
              labelPlacement="outside"
              placeholder="Enter your name"
              label="Name"
              type="text"
              {...field}
            />
            {errors.name && (
              <p className="-mt-3 ml-2 text-small text-danger">{`${errors.name.message}`}</p>
            )}
          </>
        )}
      />
      <Button
        isLoading={isLoading}
        type="submit"
        variant="solid"
        color="primary"
        size="sm"
      >
        Signin
      </Button>
    </form>
  );
};

export default FormUpdateAdmin;
