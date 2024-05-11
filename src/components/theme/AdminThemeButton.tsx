"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";
const AdminThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-[53px] w-full" />;

  return (
    <div className="flex w-full rounded-lg bg-secondary p-2">
      <Button
        className="w-full gap-2"
        size="sm"
        variant={theme === "light" ? "default" : "ghost"}
        onClick={() => setTheme("light")}
      >
        <SunIcon />
        Light
      </Button>
      <Button
        className="w-full gap-2"
        size="sm"
        variant={theme === "dark" ? "default" : "ghost"}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon />
        Dark
      </Button>
    </div>
  );
};

export default AdminThemeButton;
