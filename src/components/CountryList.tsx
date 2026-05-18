"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Country } from "@/types/country";
import CountryCard from "./CountryCard";

interface CountryListProps {
  initialCountries: Country[];
}

export default function CountryList({ initialCountries }: CountryListProps) {
  const [search, setSearch] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Estados para controlar a abertura dos menus customizados
  const [isSubregionOpen, setIsSubregionOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Refs para fechar o menu se clicar fora dele
  const subregionRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // 1. Extrair sub-regiões únicas
  const subregions = useMemo(() => {
    const set = new Set<string>();
    initialCountries.forEach((c) => {
      if (c.subregion) set.add(c.subregion);
    });
    return Array.from(set).sort();
  }, [initialCountries]);

  // 2. Extrair idiomas únicos
  const languages = useMemo(() => {
    const set = new Set<string>();
    initialCountries.forEach((c) => {
      if (c.languages) {
        Object.values(c.languages).forEach((lang) => set.add(lang as string));
      }
    });
    return Array.from(set).sort();
  }, [initialCountries]);

  // Fechar menus ao clicar fora
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

  // 3. Filtrar os países
  const filteredCountries = useMemo(() => {
    return initialCountries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSubregion = selectedSubregion
        ? country.subregion === selectedSubregion
        : true;

      const matchesLanguage = selectedLanguage
        ? country.languages &&
          Object.values(country.languages).includes(selectedLanguage)
        : true;

      return matchesSearch && matchesSubregion && matchesLanguage;
    });
  }, [search, selectedSubregion, selectedLanguage, initialCountries]);

  return (
    <div className="space-y-8">
      {/* Barra de Ferramentas: Busca + Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 z-20 relative">
        {/* Campo de Busca */}
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
            placeholder="Pesquise por um país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white placeholder-gray-400 pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm shadow-sm"
          />
        </div>

        {/* Container dos Dropdowns Customizados */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Dropdown de Sub-região */}
          <div className="relative w-full sm:w-60" ref={subregionRef}>
            <button
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
              /* max-h-60 (tamanho fixo) e overflow-y-auto (rolagem ligada) */
              <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700/80 rounded-xl shadow-xl z-50 py-1 scrollbar-thin">
                <button
                  onClick={() => {
                    setSelectedSubregion("");
                    setIsSubregionOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50 cursor-pointer"
                >
                  Todas as Sub-regiões
                </button>
                {subregions.map((sub) => (
                  <button
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

          {/* Dropdown de Idioma */}
          <div className="relative w-full sm:w-60" ref={languageRef}>
            <button
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
              /* max-h-60 (tamanho fixo) e overflow-y-auto (rolagem ligada) */
              <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700/80 rounded-xl shadow-xl z-50 py-1 scrollbar-thin">
                <button
                  onClick={() => {
                    setSelectedLanguage("");
                    setIsLanguageOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600/50 cursor-pointer"
                >
                  Todos os Idiomas
                </button>
                {languages.map((lang) => (
                  <button
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
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        <span className="text-blue-500 dark:text-blue-400 font-bold">
          {filteredCountries.length}
        </span>{" "}
        países encontrados
      </p>

      {/* Grid Responsivo */}
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
