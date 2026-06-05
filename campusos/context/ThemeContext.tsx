"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail?: string;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  const storageKey = userEmail ? `campusos_theme_${userEmail}` : "campusos_theme_guest";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as Theme | null;
    const resolved = saved ?? "light"; // Default is LIGHT
    setTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
  }, [storageKey]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem(storageKey, next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
