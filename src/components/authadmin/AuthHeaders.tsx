"use client";

import useToggleAuth from "@/hooks/useToggleAuth";
import { Link } from "@nextui-org/react";
import React from "react";

type TAuthHeaders = {
  title: string;
  client?: boolean;
};

const AuthHeaders: React.FC<TAuthHeaders> = ({ title, client }) => {
  const toggle = useToggleAuth();
  return (
    <>
      <h1 className="w-full text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      {client ? (
        <p className="w-full text-sm text-zinc-500 dark:text-zinc-400">
          New to demo?{" "}
          <Link
            onClick={() => toggle.onToggle(toggle.signin)}
            className="bg-transparent font-medium text-blue-600 underline underline-offset-2 dark:text-blue-400"
          >
            Create an account
          </Link>
        </p>
      ) : null}
    </>
  );
};

export default AuthHeaders;
