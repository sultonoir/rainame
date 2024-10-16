"use client";

import { useAuthDialog } from "@/hooks/useAuthDialog";
import React from "react";
import { ButtonLoading } from "./button-loading";
import { LogInIcon } from "lucide-react";

const ButtonSignin = () => {
  const { setIsOpen, setType } = useAuthDialog();
  const handleClick = () => {
    setIsOpen(true);
    setType("signin");
  };
  return (
    <ButtonLoading onClick={handleClick} startContent={<LogInIcon />}>
      Signin
    </ButtonLoading>
  );
};

export default ButtonSignin;
