"use client";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";

const updateAdmin = z.object({
  email: z.string().email().optional(),
  name: z
    .string()
    .min(2, { message: "name at least have 2 character" })
    .optional(),
});

type UpdateAdmin = z.infer<typeof updateAdmin>;
type Tadmin = {
  admin?: Session;
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
      email: admin?.user.email ?? "",
      name: admin?.user.name ?? "",
    },
  });

  const { update, data: user } = useSession();

  //update data name
  const router = useRouter();
  const { mutate, isLoading } = api.user.updateUser.useMutation({
    onSuccess: () => {
      router.refresh();
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

  const onSubmit: SubmitHandler<UpdateAdmin> = async (data) => {
    mutate({
      name: data.name,
    });
    await update({ name: data.name, image: user?.user.image });
  };

  return (
    <form
      className="grid h-fit w-full grid-cols-1 gap-5 sm:max-w-xs"
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
              defaultValue={admin?.user.email ?? ""}
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
        Update profile
      </Button>
    </form>
  );
};

export default FormUpdateAdmin;
