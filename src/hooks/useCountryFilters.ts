import { useState, useMemo } from "react";
import { Country } from "@/types/country";

export function useCountryFilters(initialCountries: Country[]) {
  const [search, setSearch] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const subregions = useMemo(() => {
    const set = new Set<string>();
    initialCountries.forEach((c) => {
      if (c.subregion) set.add(c.subregion);
    });
    return Array.from(set).sort();
  }, [initialCountries]);

  const languages = useMemo(() => {
    const set = new Set<string>();
    initialCountries.forEach((c) => {
      if (c.languages) {
        Object.values(c.languages).forEach((lang) => set.add(lang));
      }
    });
    return Array.from(set).sort();
  }, [initialCountries]);

  const filteredCountries = useMemo(() => {
    return initialCountries
      .filter((country) => {
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
      })
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [search, selectedSubregion, selectedLanguage, initialCountries]);

  return {
    search,
    setSearch,
    selectedSubregion,
    setSelectedSubregion,
    selectedLanguage,
    setSelectedLanguage,
    subregions,
    languages,
    filteredCountries,
  };
}
