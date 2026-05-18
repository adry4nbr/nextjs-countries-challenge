/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

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

  // Função que faz a página subir suavemente se o usuário já estiver na Home
  const handleTitleClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xs border-b border-gray-200/50 dark:border-gray-700/50 shadow-md py-5 px-4 md:px-16 flex justify-between items-center transition-colors">
      <Link href="/" onClick={handleTitleClick}>
        <div className="flex items-center gap-2.5 group cursor-pointer">
          {/* Ícone de Mundo Moderno/Geográfico */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.3}
            stroke="currentColor"
            className="w-6 h-6 text-cyan-500 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747M10.241 9.417a3 3 0 1 0 3.518 3.518M3 12h18"
            />
          </svg>

          <h1 className="font-extrabold text-lg md:text-2xl transition-all bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:brightness-110">
            Countries Explorer
          </h1>
        </div>
      </Link>

      {/* Botão de Alternar Tema */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2.5 font-bold text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 px-3 py-2 rounded-xl transition-all duration-200"
      >
        {darkMode ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-4 h-4 text-amber-500 animate-[spin_4s_linear_infinite]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m0 13.5V21M5.197 5.197l1.591 1.591M16.404 16.404l1.591 1.591M6.75 12H4.5m15 0h-2.25m-10.5-5.197l1.591-1.591M17.993 6.007l-1.591 1.591M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"
              />
            </svg>
            <span className="hidden sm:inline">Modo Claro</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-4 h-4 text-indigo-500 -rotate-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
            <span className="hidden sm:inline">Modo Escuro</span>
          </>
        )}
      </button>
    </header>
  );
}
