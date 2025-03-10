import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { mainMetadata } from "~/constants/metadata/main";
import "~/styles/globals.css";
import AppProvider from "~/app/[locale]/provider";
import { RootParams } from "~/types/common.types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = mainMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
  params: RootParams;
}

export default async function RootLayout({
  children,
  params
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  return (
    <html lang={locale} data-lt-installed="true">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider locale={locale}>{children}</AppProvider>
      </body>
    </html>
  );
}
