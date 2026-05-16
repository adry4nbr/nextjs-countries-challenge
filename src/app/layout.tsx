import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google"; // Fonte comum para esse desafio
import "./globals.css";
import Header from "@/components/Header";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
});

export const metadata: Metadata = {
  title: "Explorador de Países",
  description: "Desafio Front-end REST Countries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${nunito.className} bg-gray-50 dark:bg-gray-900 transition-colors`}
      >
        <Header />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
