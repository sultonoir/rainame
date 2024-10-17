import React from "react";
import { ButtonLoading } from "./button-loading";
import { useAuthDialog } from "@/hooks/useAuthDialog";

interface Props {
  title: string;
  desc : string;
  type: "signin" | "signup" | "forgot-password" | "reset-password";
}

export default function ButtonToggleAuthService({ title, type,desc }: Props) {
  const { setType } = useAuthDialog();
  const handleToggle = () => {
    setType(type);
  };
  return (
    <div className="flex space-x-2">
      <span className="text-lg">{title}</span>
      <ButtonLoading
        variant="link"
        className="h-fit p-0"
        onClick={handleToggle}
      >
        {desc}
      </ButtonLoading>
    </div>
  );
}
