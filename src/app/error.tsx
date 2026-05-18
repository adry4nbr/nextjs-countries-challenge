"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-5xl">🌐</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Algo deu errado
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Não foi possível carregar os países. Verifique sua conexão ou tente
          novamente.
        </p>
        <button
          onClick={reset}
          className="mt-4 px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
