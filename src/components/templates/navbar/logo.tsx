import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.png" height={40} width={40} alt="logo" priority />
      <p className="hidden text-lg font-bold lg:block">Rainame</p>
    </Link>
  );
};

export default Logo;
