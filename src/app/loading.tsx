import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  const skeletonItems = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] w-full transition-colors duration-300">
      <main className="max-w-350 mx-auto px-6 py-10 md:py-14 space-y-10">
        {/* Esqueleto da Barra de Ferramentas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse">
          <div className="h-11 w-full sm:max-w-md bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />
          <div className="h-11 w-full sm:w-64 bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700/50" />
        </div>

        {/* Esqueleto do Contador */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />

        {/* Ajustado para usar exatamente o mesmo Grid do componente real */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {skeletonItems.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
