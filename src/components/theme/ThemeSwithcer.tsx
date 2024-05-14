// app/components/ThemeSwitcher.tsx
"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="size-9" />;
  }

  return (
    <>
      {theme === "dark" ? (
        <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
          <SunIcon />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
          <MoonIcon />
        </Button>
      )}
    </>
  );
}
