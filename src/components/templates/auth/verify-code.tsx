"use client";

import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@/components/templates/icons";
import {
  logout,
  verifyEmail,
  resendVerificationEmail as resendEmail,
} from "@/lib/auth/actions";
import { SubmitButton } from "@/components/templates/button/submit-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export const VerifyCode = () => {
  const codeFormRef = useRef<HTMLFormElement>(null);

  const handleResendEmail = async () => {
    const res = await resendEmail();
    if (res?.success) {
      toast.success("Email sent!");
    }
    if (res?.error) {
      toast.error(res.error, {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
      });
    }
  };

  const handleVerifyEmail = async (formData: FormData) => {
    const res = await verifyEmail(undefined, formData);
    if (res?.error) {
      toast.error(res.error, {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form ref={codeFormRef} action={handleVerifyEmail}>
        <Label htmlFor="code">Verification Code</Label>
        <InputOTP maxLength={6} id="code" name="code">
          <InputOTPGroup className="w-full justify-center">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <SubmitButton className="mt-4 w-full" aria-label="submit-btn">
          Verify
        </SubmitButton>
      </form>
      <form action={handleResendEmail}>
        <SubmitButton className="w-full" variant="secondary">
          Resend Code
        </SubmitButton>
      </form>
      <form action={logout}>
        <ButtonLogout/>
      </form>
    </div>
  );
};

function ButtonLogout() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="link"
      type="submit"
      className="p-0 font-normal"
      disabled={pending}
    >
      Want to use another email? Log out now.
    </Button>
  );
}
