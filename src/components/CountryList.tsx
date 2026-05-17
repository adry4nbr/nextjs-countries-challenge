"use client";

import { useState, useMemo } from "react";
import { Country } from "@/types/country";
import CountryCard from "./CountryCard";

interface CountryListProps {
  initialCountries: Country[];
}

export default function CountryList({ initialCountries }: CountryListProps) {
  const [search, setSearch] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");

  // 1. Extrair todas as sub-regiões únicas para preencher o select automaticamente
  const subregions = useMemo(() => {
    const set = new Set<string>();
    initialCountries.forEach((c) => {
      if (c.subregion) set.add(c.subregion);
    });
    return Array.from(set).sort();
  }, [initialCountries]);

  // 2. Filtrar os países dinamicamente com base na busca e na sub-região
  const filteredCountries = useMemo(() => {
    return initialCountries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSubregion = selectedSubregion
        ? country.subregion === selectedSubregion
        : true;

      return matchesSearch && matchesSubregion;
    });
  }, [search, selectedSubregion, initialCountries]);

  return (
    <div className="space-y-8">
      {/* Barra de Ferramentas: Busca + Filtro */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Campo de Busca por Nome */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Pesquise por um país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 pl-4 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:border-blue-500 transition-colors text-sm shadow-sm"
          />
        </div>

        {/* Filtro por Sub-região */}
        <select
          value={selectedSubregion}
          onChange={(e) => setSelectedSubregion(e.target.value)}
          className="w-full md:w-64 bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:border-blue-500 transition-colors text-sm shadow-sm cursor-pointer"
        >
          <option value="" className="text-gray-900 dark:text-white">
            Filtrar por Sub-região
          </option>
          {subregions.map((sub) => (
            <option
              key={sub}
              value={sub}
              className="text-gray-900 dark:text-white"
            >
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Contador Atualizado Dinamicamente */}
      {/* Ajuste: text-gray-600 dark:text-gray-400 */}
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
        <span className="text-blue-500 dark:text-blue-400 font-bold">
          {filteredCountries.length}
        </span>{" "}
        países encontrados
      </p>

      {/* Grid de Cards */}
      {filteredCountries.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {/* Ajuste: text-gray-500 dark:text-gray-400 */}
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nenhum país encontrado para os filtros selecionados. 🔍
          </p>
        </div>
      )}
    </div>
  );
}
