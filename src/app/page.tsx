import { getCountries } from "@/services/api";
import CountryCard from "@/components/CountryCard";

export default async function Home() {
  const countries = await getCountries();

  return (
    <div className="min-h-screen bg-[#0f172a] w-full">
      {/* Fundo azul escuro profundo */}
      <div className="w-full mx-auto space-y-8">
        {/* Contador de países como na foto */}
        <p className="text-gray-300 flex items-center gap-2 font-medium">
          <span className="text-blue-500"></span>
          {countries.length} países encontrados
        </p>

        {/* Container com Flexbox */}
        <div className="flex flex-wrap justify-center p-6 gap-10">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
