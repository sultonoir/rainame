import { FormResetPassword } from "@/components/templates/form/reset-password/form-reset-password";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata: Metadata = {
  title: "Reset Password",
};

const Page = ({ searchParams }: Props) => {
  const error = searchParams?.error;
  const token = searchParams?.token;

  if (!token || error) {
    redirect("/");
  }

  return (
    <div className="flex h-[calc(100dvh-200px)] place-items-center justify-center">
      <FormResetPassword />
    </div>
  );
};

export default Page;
