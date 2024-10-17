"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";

export const ButtonTheme = () => {
  const { theme, setTheme } = useTheme();
  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button onClick={handleClick} variant="ghost" size="icon">
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
