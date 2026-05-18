/* eslint-disable @typescript-eslint/no-explicit-any */
// Interface principal para a lista de países
export interface Country {
  maps?: {
    googleMaps: string;
    openStreetMaps?: string;
  };
  area: any;
  landlocked: any;
  unMember: any;
  timezones: boolean;
  currencies: any;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string }>;
  };
  flags: {
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  cca3: string;
  languages?: Record<string, string>;
}
