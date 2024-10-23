import React from "react";
import Link from "next/link";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginDemoUser } from "@/lib/auth/actions";
import { toast } from "sonner";
import { SubmitButton } from "./submit-button";

const OauthButton = () => {
  const handleLoginUser = async () => {
    const result = await loginDemoUser();
    if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <form action={handleLoginUser}>
        <SubmitButton type="submit" variant="outline">
          Login as demo account
        </SubmitButton>
      </form>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/login/google" prefetch={false}>
          <Chrome className="mr-2 size-5" />
        </Link>
      </Button>
    </div>
  );
};

export default OauthButton;
