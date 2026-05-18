/* eslint-disable @typescript-eslint/no-explicit-any */
// Interface principal para a lista de países
export interface Country {
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
  region: string; // Continente
  subregion?: string;
  capital?: string[];
  cca3: string; // Código de 3 letras (usaremos para a rota de detalhes)
  languages?: Record<string, string>;
}
