"use client";
import FormUpdateAdmin from "@/components/form/FormUpdateAdmin";
import ModalUploadImage from "@/components/modal/ModalUploadImage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const { data: admin } = useSession();
  if (!admin) {
    redirect("/");
  }
  return (
    <div className="flex w-full flex-col justify-start gap-10 sm:flex-row">
      <ModalUploadImage imageUrl={admin.user.image ?? ""} />
      <FormUpdateAdmin admin={admin} />
    </div>
  );
};

export default Page;
