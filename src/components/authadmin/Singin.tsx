"use client";
import { z } from "zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type SignupSchema = z.infer<typeof signupSchema>;
type TSignin = {
  auth: string;
};

const Signin = ({ auth }: TSignin) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupSchema> = async (data) => {
    await signIn(auth, {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.refresh();
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => {
        toast.error("Errors");
      })
      .finally(() => {
        reset();
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
      <Button
        isLoading={isSubmitting}
        type="submit"
        className="w-full bg-white text-black"
        size="sm"
      >
        Signin
      </Button>
    </form>
  );
};

export default Signin;
