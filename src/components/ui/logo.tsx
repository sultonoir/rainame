import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        width={40}
        height={40}
        src="/logo.png"
        alt="logo"
        priority
        className={cn("rounded-lg", className)}
      />
    </Link>
  );
};

export default Logo;
