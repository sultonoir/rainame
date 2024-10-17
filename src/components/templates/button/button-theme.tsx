"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export const ButtonTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button
      size="icon"
      variant="ghost"
      className="size-fit rounded-full p-3"
      onClick={handleClick}
    >
      {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </Button>
  );
};
