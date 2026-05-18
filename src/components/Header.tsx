/* eslint-disable react-hooks/set-state-in-effect */
"use client"; // IMPORTANTE: Como o botão tem clique e estado, o Header precisa ser Client Component

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true); // Começa como escuro por padrão

  // Executa uma vez ao carregar a página para checar o tema salvo
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

  // Função que alterna a classe 'dark' no HTML
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
    <header className="w-full bg-white dark:bg-gray-800 shadow-md py-6 px-4 md:px-16 flex justify-between items-center transition-colors">
      <Link href="/">
        <h1 className="font-extrabold text-lg md:text-2xl text-gray-900 dark:text-white cursor-pointer">
          Para qual país ?
        </h1>
      </Link>

      {/* O seu botão agora com a função onClick e o texto dinâmico */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
      >
        {darkMode ? (
          <>
            <span>☀️</span>
            <span className="hidden sm:inline">Light Mode</span>
          </>
        ) : (
          <>
            <span>🌙</span>
            <span className="hidden sm:inline">Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
}
