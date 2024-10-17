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
import { useSession } from "@/lib/auth-client";
import { FormSignin } from "../templates/form/signin/form-signin";
import ButtonOauth from "../templates/button/button-oauth";
import ButtonToggleAuthService from "../templates/button/button-toggle-auth-service";

const AuthDialog = () => {
  const { data } = useSession();
  console.log(data);
  const { setIsOpen, isOpen, type } = useAuthDialog();

  const title = useMemo(() => {
    switch (type) {
      case "signin":
        return "Wellcome back";
      case "signup":
        return "Create an account";
      case "forgot-password":
        return "Forgot password ?";
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
      case "forgot-password":
        return "Please enter the email address associated with your account and We will email you a link to reset your password.";
      default:
        return "You will be signed out of your account";
    }
  }, [type]);

  const Content = useMemo(() => {
    switch (type) {
      case "signin":
        return <FormSignin />;
      default:
        return <div>default</div>;
    }
  }, [type]);

  const other = useMemo(() => {
    switch (type) {
      case "signin":
        return (
          <ButtonToggleAuthService
            title="New to Rainame ?"
            type="signup"
            desc="Sign up"
          />
        );
      case "signup":
        return (
          <ButtonToggleAuthService
            title="Already have an Account ?"
            type="signin"
            desc="Sign in"
          />
        );
      case "forgot-password":
        return (
          <ButtonToggleAuthService
            title="Back to"
            type="signin"
            desc="Sign in"
          />
        );
    }
  }, [type]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="items-center justify-center">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <ButtonOauth />
        <div className="my-2 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <div className="mx-2 text-muted-foreground">or</div>
          <div className="flex-grow border-t border-muted" />
        </div>
        {Content}
        {other}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
