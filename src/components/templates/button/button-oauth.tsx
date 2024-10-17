"use client";
import React from "react";
import { ButtonLoading } from "./button-loading";
import { ChromeIcon, GithubIcon } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function ButtonOauth() {
  return (
    <div className="flex flex-col space-y-2">
      <ButtonLoading variant="outline">
        <GithubIcon />
      </ButtonLoading>
      <ButtonLoading
        variant="outline"
        onClick={async () => {
          await signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        <ChromeIcon />
      </ButtonLoading>
    </div>
  );
}
