/* eslint-disable @next/next/no-img-element */
import { Country } from "@/types/country";
import Link from "next/link"; // IMPORTANTE

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    // Envolvemos tudo com o Link apontando para a rota dinâmica do código do país (cca3)
    <Link href={`/country/${country.cca3}`} className="block group">
      <article className="w-[280px] h-full flex-none bg-[#1f2937] rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg border border-gray-700/50">
        <div className="h-[150px] w-full overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || country.name.common}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          <h2 className="font-bold text-white text-lg mb-4 truncate group-hover:text-blue-400 transition-colors">
            {country.name.common}
          </h2>

          <div className="space-y-2">
            <p className="text-[13px] text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-none"></span>
              <strong className="text-gray-300">População:</strong>{" "}
              {country.population.toLocaleString("pt-BR")}
            </p>
            <p className="text-[13px] text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-none"></span>
              <strong className="text-gray-300">Continente:</strong>{" "}
              {country.region}
            </p>
            <p className="text-[13px] text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 flex-none"></span>
              <strong className="text-gray-300">Região:</strong>{" "}
              {country.subregion || "N/A"}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
