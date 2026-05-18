import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  const skeletonItems = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] w-full transition-colors duration-300">
      <main className="max-w-350 mx-auto px-6 py-10 md:py-14 space-y-10">
        {/* Esqueleto da Barra de Ferramentas Atualizado para os Dois Filtros */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-pulse">
          {/* Esqueleto da Busca por Nome */}
          <div className="h-11 w-full lg:max-w-md bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />

          {/* Esqueleto dos dois Dropdowns (Sub-região e Idioma) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Filtro 1 */}
            <div className="h-11 w-full sm:w-56 bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />
            {/* Filtro 2 */}
            <div className="h-11 w-full sm:w-56 bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />
          </div>
        </div>

        {/* Esqueleto do Contador */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />

        {/* Grid de Skeletons dos Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {skeletonItems.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
