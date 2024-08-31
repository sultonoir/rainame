import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  return (
    <Button
      className="group relative overflow-hidden rounded-sm hover:rounded-full"
      asChild
    >
      <Link href="/login">
        <span className="-translate-x-20 transition-all group-hover:translate-x-0">
          <ArrowRight size={20} />
        </span>
        <span className="translate-x-0 transition-all duration-300 group-hover:translate-x-2">
          Signin
        </span>
        <span className="translate-x-0 transition-all group-hover:translate-x-20">
          <ArrowRight size={20} />
        </span>
      </Link>
    </Button>
  );
};

export default LoginButton;
