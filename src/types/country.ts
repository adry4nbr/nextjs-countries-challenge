export interface Currency {
  name: string;
  symbol: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { common: string; official: string }>;
}

export interface CountryFlags {
  svg: string;
  png?: string;
  alt?: string;
}

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps?: string;
}

export interface Country {
  name: CountryName;
  flags: CountryFlags;
  maps?: CountryMaps;
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  cca3: string;
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
  timezones?: string[];
  area?: number;
  landlocked?: boolean;
  unMember?: boolean;
}
