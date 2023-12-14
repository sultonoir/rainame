"use client";
import React from "react";
import AuthHeaders from "./AuthHeaders";
import Signin from "./Singin";
import Image from "next/image";

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
          <AuthHeaders title="Welcome admin" />
          <Signin auth="admin" />
        </section>
      </section>
    </main>
  );
};

export default AuthAdmin;
