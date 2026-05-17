/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true); // Começa como escuro por padrão

  // Executa apenas uma vez ao carregar a página para checar o localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-[#1f2937] dark:bg-[#1f2937] light-theme-btn border border-gray-700/50 dark:border-gray-700/50 px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:scale-105 transition-transform cursor-pointer"
      style={{
        // Cores específicas para quando NÃO for dark mode (Modo Claro)
        backgroundColor: !darkMode ? "#e2e8f0" : undefined,
        borderColor: !darkMode ? "#cbd5e1" : undefined,
        color: !darkMode ? "#1e293b" : "#ffffff",
      }}
    >
      {darkMode ? (
        <>
          <span>☀️</span> Modo Claro
        </>
      ) : (
        <>
          <span>🌙</span> Modo Escuro
        </>
      )}
    </button>
  );
}
