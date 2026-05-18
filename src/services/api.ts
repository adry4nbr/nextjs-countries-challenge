import { Country } from "@/types/country";

const BASE_URL = "https://restcountries.com/v3.1";

// 1. Busca todos os países para a página inicial
export const getCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,flags,population,region,subregion,capital,cca3,languages`,
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar países");
  }

  return response.json();
};

// 2. Busca os detalhes de um país específico pelo código cca3 (Usado na página de detalhes)
export const getCountryByCode = async (cca3: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${cca3}`);

  if (!response.ok) {
    throw new Error("País não encontrado ou erro ao buscar detalhes");
  }

  const data = await response.json();
  return data[0];
};
