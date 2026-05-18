/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { getCountryByCode } from "@/services/api";
import Link from "next/link";

interface PageProps {
  params: Promise<{ cca3: string }>;
}

export default async function CountryDetailsPage({ params }: PageProps) {
  const { cca3 } = await params;
  const country = await getCountryByCode(cca3);

  // Tratamento para idiomas
  const nativeLanguages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  // Tratamento para moedas
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c: any) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  // Forçamos o TypeScript a tratar como um array de strings para liberar o .join()
  const timezonesArray = country.timezones as unknown as string[] | undefined;

  const timezone =
    timezonesArray && Array.isArray(timezonesArray) && timezonesArray.length > 0
      ? timezonesArray.join(", ")
      : "N/A";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-gray-900 dark:text-white w-full transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Botão de Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white dark:bg-[#1f2937] text-gray-800 dark:text-white px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium shadow-md cursor-pointer"
        >
          ← Voltar para a listagem
        </Link>

        {/* Seção Principal: Bandeira e Nome */}
        <div className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 flex-none">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || country.name.common}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 text-center md:text-left w-full">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {country.name.common}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium">
              Nome Oficial:{" "}
              <span className="italic">{country.name.official}</span>
            </p>
          </div>
        </div>

        {/* Grid de Cards de Informação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Geografia & Território */}
          {/* Cores: Fundo azul suave no claro | Gradiente azul/ciano escuro no dark */}
          <section className="bg-blue-50/60 dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-md space-y-4 transition-all">
            {/* Cabeçalho com a Barrinha vertical ao lado do nome */}
            <div className="flex items-center gap-2.5 border-b border-blue-200/50 dark:border-gray-700/50 pb-3">
              {/* A Barrinha Vertical */}
              <div className="w-1.5 h-5 bg-blue-500 dark:bg-blue-400 rounded-full flex-none" />

              <h2 className="font-extrabold text-sm text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                Geografia & Território
              </h2>
            </div>

            {/* Informações */}
            <div className="space-y-3.5 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Continente:
                </strong>{" "}
                {country.region}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Sub-região:
                </strong>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Capital:
                </strong>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Área Territorial:
                </strong>{" "}
                {country.area
                  ? `${country.area.toLocaleString("pt-BR")} km²`
                  : "N/A"}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Saída para o Mar:
                </strong>{" "}
                {country.landlocked
                  ? "Não (Cercado por terra)"
                  : "Sim (País costeiro)"}
              </p>
            </div>
          </section>

          {/* Card 2: Cultura & Sociedade */}
          {/* Cores: Fundo roxo suave no claro | Gradiente roxo/indigo escuro no dark */}
          <section className="bg-purple-50/60 dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30 shadow-md space-y-4 transition-all">
            {/* Cabeçalho com a Barrinha vertical ao lado do nome */}
            <div className="flex items-center gap-2.5 border-b border-purple-200/50 dark:border-gray-700/50 pb-3">
              {/* A Barrinha Vertical */}
              <div className="w-1.5 h-5 bg-purple-500 dark:bg-purple-400 rounded-full flex-none" />

              <h2 className="font-extrabold text-sm text-purple-600 dark:text-purple-400 tracking-wide uppercase">
                Cultura & Sociedade
              </h2>
            </div>

            {/* Informações */}
            <div className="space-y-3.5 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  População:
                </strong>{" "}
                {country.population.toLocaleString("pt-BR")} hab.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Idiomas:
                </strong>{" "}
                {nativeLanguages}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Moeda Oficial:
                </strong>{" "}
                {currencies}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Membro da ONU:
                </strong>{" "}
                {country.unMember ? "Sim ✅" : "Não ❌"}
              </p>
              <p className="line-clamp-2" title={timezone}>
                <strong className="text-gray-900 dark:text-white font-semibold">
                  Fuso Horário:
                </strong>{" "}
                {timezone}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
