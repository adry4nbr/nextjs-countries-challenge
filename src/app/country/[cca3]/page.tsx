/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { getCountryByCode } from "@/services/api";
import Link from "next/link";

interface PageProps {
  params: Promise<{ cca3: string }>;
}

export default async function CountryDetailsPage({ params }: PageProps) {
  // Desembrulha o parâmetro da URL de forma assíncrona (Padrão Next.js recente)
  const { cca3 } = await params;
  const country = await getCountryByCode(cca3);

  // Tratamento simples para pegar os idiomas do objeto dinâmico da API
  const nativeLanguages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  // Tratamento para pegar as moedas
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c: any) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white w-full">
      <div className="max-w-300 mx-auto px-6 py-12 space-y-8">
        {/* Botão de Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1f2937] px-6 py-2.5 rounded-xl border border-gray-700/50 hover:bg-gray-700 transition-colors text-sm font-medium shadow-md"
        >
          ← Voltar para a listagem
        </Link>

        {/* Bloco de Detalhes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-6">
          {/* Bandeira grande */}
          <div className="w-full h-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || country.name.common}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dados do País */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-300">
              <p>
                <strong className="text-white">Capital:</strong>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
              <p>
                <strong className="text-white">Continente:</strong>{" "}
                {country.region}
              </p>
              <p>
                <strong className="text-white">Sub-região:</strong>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <strong className="text-white">População:</strong>{" "}
                {country.population.toLocaleString("pt-BR")}
              </p>
              <p>
                <strong className="text-white">Idiomas:</strong>{" "}
                {nativeLanguages}
              </p>
              <p>
                <strong className="text-white">Moeda:</strong> {currencies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
