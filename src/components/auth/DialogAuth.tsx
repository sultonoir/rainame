"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import FormOauthButton from "../form/authform/FormOauthButton";
import useDialog from "@/hook/useDialog";
import FormSignup from "../form/authform/FormSignup";

const DialogAuth = () => {
  const { isOpen, onOpen, status } = useDialog();
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" size="sm">
          <span className="font-medium">Login</span>
          <ArrowRight size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wellcome to Rainame</DialogTitle>
          <DialogDescription>Signin or siginup</DialogDescription>
        </DialogHeader>
        <FormOauthButton />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {status === "signin" && <FormSignup />}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAuth;
