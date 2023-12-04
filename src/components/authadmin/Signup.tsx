"use client";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useToggleAuth from "@/hooks/useToggleAuth";
const signupSchema = z
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

type SignupSchema = z.infer<typeof signupSchema>;

type TSignup = {
  user?: boolean;
};

const Signup = ({ user }: TSignup) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //create admin
  const createAdmin = api.admin.createAdmin.useMutation({
    onSuccess: () => {
      toast.success("account created");
      reset();
    },
    onError: (e) => {
      toast.error(e.message);
      reset();
    },
  });

  //create user
  const toggle = useToggleAuth();
  const createUser = api.user.createUser.useMutation({
    onSuccess: () => {
      toast.success("account created");
      reset();
      toggle.onToggle(toggle.signin);
    },
    onError: (e) => {
      toast.error(e.message);
      reset();
    },
  });

  const onSubmit: SubmitHandler<SignupSchema> = (data) => {
    if (user) {
      createUser.mutate({
        email: data.email,
        password: data.password,
      });
    } else {
      createAdmin.mutate({
        email: data.email,
        password: data.password,
      });
    }
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
      <Button type="submit" className="w-full bg-white text-black" size="sm">
        Signup
      </Button>
    </form>
  );
};

export default Signup;
