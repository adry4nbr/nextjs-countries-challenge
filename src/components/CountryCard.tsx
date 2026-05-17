/* eslint-disable @next/next/no-img-element */
import { Country } from "@/types/country";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`} className="block group">
      <article className="w-70 h-full flex-none bg-white dark:bg-[#1f2937] rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700/50">
        <div className="h-37.5 w-full overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || country.name.common}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          {/* text-gray-900 (Claro) | dark:text-white (Escuro) */}
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4 truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {country.name.common}
          </h2>

          <div className="space-y-2">
            {/* text-gray-600 (Claro) | dark:text-gray-400 (Escuro) */}
            <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-none"></span>
              <strong className="text-gray-800 dark:text-gray-300">
                População:
              </strong>{" "}
              {country.population.toLocaleString("pt-BR")}
            </p>

            <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-none"></span>
              <strong className="text-gray-800 dark:text-gray-300">
                Continente:
              </strong>{" "}
              {country.region}
            </p>

            <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 flex-none"></span>
              <strong className="text-gray-800 dark:text-gray-300">
                Região:
              </strong>{" "}
              {country.subregion || "N/A"}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
