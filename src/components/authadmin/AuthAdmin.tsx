"use client";
import React from "react";
import Image from "next/image";
import FormSignin from "../form/FormSingin";

const AuthAdmin = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <section className="relative hidden h-[100dvh] w-full lg:block">
        <Image
          alt="Logo"
          src="/Logo.png"
          className="h-[100dvh] object-cover"
          priority
          fill
        />
      </section>
      <section className="flex h-[100dvh] flex-1 flex-col items-center justify-center gap-4 p-4">
        <section className="w-full max-w-md">
          <h1 className="w-full text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Wellcome back admin
          </h1>
          <FormSignin />
        </section>
      </section>
    </main>
  );
};

export default AuthAdmin;
