import { Country } from "@/types/country";

const BASE_URL = "https://restcountries.com/v3.1";

export const getCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,flags,population,region,subregion,capital,cca3`,
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar países");
  }

  return response.json();
};

export const getCountryByCca3 = async (cca3: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${cca3}`);

  if (!response.ok) {
    throw new Error("País não encontrado");
  }

  const data = await response.json();
  return data[0]; // A API retorna um array, pegamos o primeiro item
};
