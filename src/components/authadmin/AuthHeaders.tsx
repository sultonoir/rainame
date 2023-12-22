"use client";

import useToggleAuth from "@/hooks/useToggleAuth";
import React from "react";

type TAuthHeaders = {
  title: string;
};

const AuthHeaders: React.FC<TAuthHeaders> = ({ title }) => {
  const toggle = useToggleAuth();

  const handleToggle = () => {
    if (toggle.signup) {
      return toggle.onSignin();
    }
    return toggle.onSignup();
  };
  return (
    <>
      <h1 className="w-full text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>

      <p className="w-full text-sm text-zinc-500 dark:text-zinc-400">
        {toggle.signin && "New to Rainame ?"}
        {toggle.signup && "Already have an account?"}
        {toggle.forgot && "New to Rainame ?"}
        <button
          onClick={handleToggle}
          className="ml-1 bg-transparent font-medium text-primary underline underline-offset-2 hover:opacity-80"
        >
          {toggle.signup && "Signin"}
          {toggle.signin && "Create an account"}
          {toggle.forgot && "Create an account"}
        </button>
      </p>
    </>
  );
};

export default AuthHeaders;
