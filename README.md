# Countries Explorer 🌍

Uma aplicação web moderna e interativa para explorar, filtrar e pesquisar informações detalhadas sobre países de todo o mundo, consumindo dados em tempo real da **REST Countries API**.

## 🔗 Deploy

O deploy foi realizado na Vercel e pode ser acessado pelo link:
👉 [Acessar o Countries Explorer](https://nextjs-countries-challenge.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia   | Versão | Uso                                |
| ------------ | ------ | ---------------------------------- |
| Next.js      | 15     | Framework principal com App Router |
| React        | 19     | Biblioteca de interface            |
| TypeScript   | 5      | Tipagem estática                   |
| Tailwind CSS | v4     | Estilização                        |

---

## ✨ Funcionalidades

- **Listagem de países** com bandeira, nome, população e continente
- **Busca por nome** com filtragem dinâmica em tempo real
- **Filtro por sub-região** para navegar por regiões geográficas
- **Filtro por idioma** para explorar países por língua falada
- **Ordenação alfabética** automática da listagem
- **Página de detalhes** com capital, sub-região, idiomas, moeda, área, fuso horário e mais
- **Botão para abrir no Google Maps** direto da página de detalhes
- **Dark/Light Mode** com alternância dinâmica de tema
- **Loading skeleton** durante o carregamento dos dados
- **Tratamento de erros** com página de fallback e opção de tentar novamente

---

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── country/
│   │   └── [cca3]/
│   │       └── page.tsx       # Página de detalhes do país
│   ├── error.tsx              # Tratamento global de erros
│   ├── layout.tsx             # Layout raiz
│   ├── loading.tsx            # Skeleton de carregamento
│   └── page.tsx               # Página principal (listagem)
├── components/
│   ├── CardSkeleton.tsx       # Skeleton individual do card
│   ├── CountryCard.tsx        # Card de país na listagem
│   ├── CountryList.tsx        # Grid de listagem com busca e filtros
│   ├── Header.tsx             # Cabeçalho da aplicação
│   └── ThemeToggle.tsx        # Alternador de tema
├── hooks/
│   └── useCountryFilters.ts   # Hook com lógica de busca e filtros
├── services/
│   └── api.ts                 # Camada de comunicação com a API
└── types/
    └── country.ts             # Interfaces e tipos TypeScript
```

---

## 🧠 Decisões Técnicas

**Server Components + Client Components** — o fetch da API acontece no servidor (`page.tsx`), reduzindo o JavaScript enviado ao cliente. Apenas o `CountryList` é client component, pois depende de estado interativo.

**Hook `useCountryFilters`** — toda a lógica de busca, filtros e ordenação foi extraída para um hook customizado, mantendo o componente de listagem com responsabilidade única de renderização.

**Camada de serviços** — as chamadas à API estão isoladas em `services/api.ts`, separando a lógica de comunicação dos componentes.

**Tipagem sem `any`** — todas as interfaces refletem exatamente o contrato da REST Countries API, sem uso de `any`.

---

## 🚀 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/adry4nbr/nextjs-countries-challenge

# 2. Acesse a pasta
cd nextjs-countries-challenge

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.
