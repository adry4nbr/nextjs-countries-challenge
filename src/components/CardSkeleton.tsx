export default function CardSkeleton() {
  return (
    <div className="w-full max-w-75 h-92.5 flex-none bg-white dark:bg-[#1f2937] rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700/50 animate-pulse">
      {/* Espaço da Bandeira */}
      <div className="h-37.5 w-full bg-gray-300 dark:bg-gray-700" />

      {/* Espaço dos Textos */}
      <div className="p-5 space-y-4">
        {/* Título */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mb-2" />

        {/* Linhas de Informação */}
        <div className="space-y-3 pt-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-md w-5/6" />
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-md w-4/5" />
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-md w-2/3" />
        </div>
      </div>
    </div>
  );
}
