"use client";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AuthDialog = () => {
  const { setIsOpen, isOpen, type } = useAuthDialog();

  const title = useMemo(() => {
    switch (type) {
      case "signin":
        return "Wellcome back";
      case "signup":
        return "Create an account";
      default:
        return "Are you absolutely sure?";
    }
  }, [type]);

  const desc = useMemo(() => {
    switch (type) {
      case "signin":
        return "signin to your account to countinue shopping";
      case "signup":
        return "Enter your email below to create your account";
      default:
        return "You will be signed out of your account";
    }
  }, [type]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
