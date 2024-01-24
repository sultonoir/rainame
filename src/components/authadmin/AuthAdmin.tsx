import Image from "next/image";
import Link from "next/link";
import React from "react";

import FormSignin from "../form/FormSingin";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="w-full dark:bg-content1 lg:max-w-[66.666667%] lg:basis-2/3 lg:bg-slate-50">
        <div className="p-4">
          <Link href="/" className="inline-flex w-fit">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="hidden h-[calc(100dvh-80px)] items-center justify-center lg:flex">
          <Image
            src="/login-bg.svg"
            alt="image login"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
      <div className="mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-[350px] flex-col justify-center space-y-6 p-4 sm:w-[350px] lg:p-0">
        <div className="flex flex-col space-y-0 text-center">
          <h3 className="text-lg font-semibold">Welcome back admin Rainame</h3>
        </div>
        <FormSignin />
      </div>
    </div>
  );
};

export default Page;
