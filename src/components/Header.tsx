import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md py-6 px-4 md:px-16 flex justify-between items-center transition-colors">
      <Link href="/">
        <h1 className="font-extrabold text-lg md:text-2xl text-gray-900 dark:text-white cursor-pointer">
          Where in the world?
        </h1>
      </Link>

      {/* Aqui futuramente podemos colocar um botão de Dark Mode */}
      <button className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
        <span>🌙</span>
        <span className="hidden sm:inline">Dark Mode</span>
      </button>
    </header>
  );
}
