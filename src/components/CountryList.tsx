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

  // 1. Extrair todas as sub-regiões únicas
  const subregions = useMemo(() => {
    const set = new Set<string>();
    initialCountries.forEach((c) => {
      if (c.subregion) set.add(c.subregion);
    });
    return Array.from(set).sort();
  }, [initialCountries]);

  // 2. Filtrar os países
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Campo de Busca por Nome com Ícone de Lupa */}
        <div className="relative w-full sm:max-w-md group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Pesquise por um país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm shadow-sm"
          />
        </div>

        {/* Filtro por Sub-região */}
        <select
          value={selectedSubregion}
          onChange={(e) => setSelectedSubregion(e.target.value)}
          className="w-full sm:w-64 bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm shadow-sm cursor-pointer"
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

      {/* Contador */}
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        <span className="text-blue-500 dark:text-blue-400 font-bold">
          {filteredCountries.length}
        </span>{" "}
        países encontrados
      </p>

      {/* Grid Responsivo Profissional */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Nenhum país encontrado para os filtros selecionados. 🔍
          </p>
        </div>
      )}
    </div>
  );
}
