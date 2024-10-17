"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ButtonSignout = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await signOut({
        fetchOptions: {
          onSuccess() {
            router.refresh();
          },
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleClick} disabled={loading}>
      Signout
    </Button>
  );
};

export default ButtonSignout;
