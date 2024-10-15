"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import React from "react";

const ButtonSignout = () => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    setLoading(true)
    await signOut();
    setLoading(false)
  };
  return (
    <Button onClick={handleClick} disabled={loading}>
      Signout
    </Button>
  );
};

export default ButtonSignout;
