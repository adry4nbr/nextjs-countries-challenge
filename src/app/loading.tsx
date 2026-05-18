import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  // Cria um array falso com 12 itens apenas para renderizar 12 skeletons na tela
  const skeletonItems = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] w-full transition-colors duration-300">
      <main className="max-w-350 mx-auto px-6 py-10 md:py-14 space-y-10">
        {/* Esqueleto da Barra de Ferramentas (Busca e Filtro) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
          <div className="h-11 w-full md:max-w-md bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />
          <div className="h-11 w-full md:w-64 bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />
        </div>

        {/* Esqueleto do Contador */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />

        {/* Grid de Skeletons imitando os Cards reais */}
        <div className="flex flex-wrap justify-center gap-10">
          {skeletonItems.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
