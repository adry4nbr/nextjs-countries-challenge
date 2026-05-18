"use client";

import { useRef, useEffect, useState } from "react";
import { Country } from "@/types/country";
import CountryCard from "./CountryCard";
import { useCountryFilters } from "@/hooks/useCountryFilters";

interface CountryListProps {
  initialCountries: Country[];
}

export default function CountryList({ initialCountries }: CountryListProps) {
  const {
    search,
    setSearch,
    selectedSubregion,
    setSelectedSubregion,
    selectedLanguage,
    setSelectedLanguage,
    subregions,
    languages,
    filteredCountries,
  } = useCountryFilters(initialCountries);

  const [isSubregionOpen, setIsSubregionOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const subregionRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        subregionRef.current &&
        !subregionRef.current.contains(event.target as Node)
      ) {
        setIsSubregionOpen(false);
      }
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 z-20 relative">
        {/* Busca */}
        <div className="relative w-full lg:max-w-md group">
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
            id="search-country"
            name="search-country"
            placeholder="Pesquise por um país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm shadow-sm"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Dropdown Sub-região */}
          <div className="relative w-full sm:w-60" ref={subregionRef}>
            <button
              type="button"
              onClick={() => setIsSubregionOpen(!isSubregionOpen)}
              className="w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700/50 text-sm shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors"
            >
              <span className="truncate">
                {selectedSubregion || "Sub-região"}
              </span>
              <span
                className={`transition-transform duration-200 ${isSubregionOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {isSubregionOpen && (
              <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700/80 rounded-xl shadow-xl z-50 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubregion("");
                    setIsSubregionOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50"
                >
                  Todas as Sub-regiões
                </button>
                {subregions.map((sub) => (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => {
                      setSelectedSubregion(sub);
                      setIsSubregionOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors ${selectedSubregion === sub ? "text-blue-500 font-bold bg-blue-50/50 dark:bg-blue-500/10" : "text-gray-900 dark:text-gray-200"}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Idioma */}
          <div className="relative w-full sm:w-60" ref={languageRef}>
            <button
              type="button"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700/50 text-sm shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors"
            >
              <span className="truncate">{selectedLanguage || "Idioma"}</span>
              <span
                className={`transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {isLanguageOpen && (
              <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700/80 rounded-xl shadow-xl z-50 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLanguage("");
                    setIsLanguageOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50"
                >
                  Todos os Idiomas
                </button>
                {languages.map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors ${selectedLanguage === lang ? "text-blue-500 font-bold bg-blue-50/50 dark:bg-blue-500/10" : "text-gray-900 dark:text-gray-200"}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contador */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
        <p>
          <strong className="text-gray-900 dark:text-white font-extrabold text-base mr-1">
            {filteredCountries.length}
          </strong>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            países encontrados
          </strong>
        </p>
      </div>

      {/* Grid */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Nenhum país encontrado para os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}
