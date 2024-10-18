"use client";

import { useAuthDialog } from "@/hooks/useAuthDialog";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSignin } from "../templates/form/signin/form-signin";
import ButtonOauth from "../templates/button/button-oauth";
import ButtonToggleAuthService from "../templates/button/button-toggle-auth-service";
import { FormSignup } from "../templates/form/signup/form-signup";
import { FormForgetPassword } from "../templates/form/forget-password/form-forget-password";

// Komponen untuk menghandle title, description, dan form content berdasarkan type
const AuthContent = ({ type }: { type: string }) => {
  switch (type) {
    case "signin":
      return {
        title: "Welcome back",
        description: "Sign in to your account to continue shopping",
        content: <FormSignin />,
        toggle: (
          <ButtonToggleAuthService
            title="New to Rainame ?"
            type="signup"
            desc="Sign up"
          />
        ),
      };
    case "signup":
      return {
        title: "Create an account",
        description: "Enter your email below to create your account",
        content: <FormSignup />,
        toggle: (
          <ButtonToggleAuthService
            title="Already have an Account ?"
            type="signin"
            desc="Sign in"
          />
        ),
      };
    case "forgot-password":
      return {
        title: "Forgot password?",
        description:
          "Please enter the email address associated with your account and we will email you a link to reset your password.",
        content: <FormForgetPassword />,
        toggle: (
          <ButtonToggleAuthService
            title="Back to"
            type="signin"
            desc="Sign in"
          />
        ),
      };
    default:
      return {
        title: "Are you absolutely sure?",
        description: "You will be signed out of your account",
        content: <div>Default content</div>,
        toggle: null,
      };
  }
};

const AuthDialog = () => {
  const { setIsOpen, isOpen, type } = useAuthDialog();

  const { title, description, content, toggle } = AuthContent({ type });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="items-center justify-center">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {type === "forgot-password" ? null : (
          <>
            <ButtonOauth />
            <div className="my-2 flex items-center">
              <div className="flex-grow border-t border-muted" />
              <div className="mx-2 text-muted-foreground">or</div>
              <div className="flex-grow border-t border-muted" />
            </div>
          </>
        )}
        {content}
        {toggle}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
