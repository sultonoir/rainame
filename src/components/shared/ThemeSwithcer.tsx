// app/components/ThemeSwitcher.tsx
"use client";

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
        <button className="flex gap-2" onClick={() => setTheme("light")}>
          <SunIcon />
          Light mode
        </button>
      ) : (
        <button className="flex gap-2" onClick={() => setTheme("dark")}>
          <MoonIcon />
          Dark mode
        </button>
      )}
    </>
  );
}
