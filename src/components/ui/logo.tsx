import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      title="Rainame"
      className={cn("relative aspect-square size-10", className)}
    >
      <Image fill src="/logo.png" alt="logo" quality={100} priority />
    </Link>
  );
};

export default Logo;
