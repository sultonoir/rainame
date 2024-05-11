// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme === "dark" ? (
        <Button
          isIconOnly
          radius="full"
          variant="light"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </Button>
      ) : (
        <Button
          isIconOnly
          radius="full"
          variant="light"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </Button>
      )}
    </>
  );
}
