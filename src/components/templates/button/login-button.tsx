import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  return (
    <Button
      className="group relative gap-3 overflow-hidden rounded-sm px-5 transition-all hover:rounded-full"
      asChild
    >
      <Link href="/login" className="relative">
        {/* Icon Arrow Right Hidden by default */}
        <span className="absolute left-2 -translate-x-20 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowRight size={20} />
        </span>
        {/* Signin Text */}
        <span className="mr-2 translate-x-0 transition-all duration-300 group-hover:ml-2 group-hover:mr-0 group-hover:translate-x-2">
          Signin
        </span>
        {/* Icon Arrow Right (initial state) */}
        <span className="absolute right-1 opacity-100 transition-all group-hover:translate-x-20 group-hover:opacity-0">
          <ArrowRight size={20} />
        </span>
      </Link>
    </Button>
  );
};

export default LoginButton;
