import { getCountries } from "@/services/api";
import CountryList from "@/components/CountryList";

export default async function Home() {
  const countries = await getCountries();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] w-full text-gray-900 dark:text-white transition-colors duration-300">
      {/* Container principal com espaçamento seguro */}
      <main className="max-w-350 mx-auto px-6 py-10 md:py-14 space-y-10">
        {/* Listagem interativa com Busca e Filtros */}
        <CountryList initialCountries={countries} />
      </main>
    </div>
  );
}
