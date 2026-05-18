/* eslint-disable @next/next/no-img-element */
import { Country } from "@/types/country";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/country/${country.cca3}`}
      className="block group w-full max-w-75"
    >
      {/* Adicionado -translate-y-1 e shadow-xl no hover */}
      <article className="w-full h-full bg-white dark:bg-[#1f2937] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 cursor-pointer shadow-md border border-gray-200/80 dark:border-gray-700/50 flex flex-col">
        {/* Container da Imagem */}
        <div className="h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-none">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || country.name.common}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Conteúdo de Texto */}
        <div className="p-5 flex-calc flex flex-col justify-between flex-1">
          <h2 className="font-bold text-gray-900 dark:text-white text-base mb-4 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {country.name.common}
          </h2>

          <div className="space-y-2.5">
            <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-none"></span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                População:
              </span>{" "}
              <strong className="text-gray-800 dark:text-gray-200 font-semibold">
                {country.population.toLocaleString("pt-BR")}
              </strong>
            </p>

            <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-none"></span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Continente:
              </span>{" "}
              <strong className="text-gray-800 dark:text-gray-200 font-semibold">
                {country.region}
              </strong>
            </p>

            <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 flex-none"></span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Região:
              </span>{" "}
              <strong className="text-gray-800 dark:text-gray-200 font-semibold truncate">
                {country.subregion || "N/A"}
              </strong>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
