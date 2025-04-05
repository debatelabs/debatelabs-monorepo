import React from 'react';
import localFont from 'next/font/local';
import { mainMetadata } from '~/shared/config/constants/metadata/main';
import '~/shared/ui/styles/globals.scss';
import AppProvider from '~/app/[locale]/provider';
import { Locale } from '~/shared/model/types/common.types';
import Footer from '~/widgets/footer/Footer';

const namu = localFont({
  src: '../assets/fonts/NAMU-1850.ttf',
  variable: '--font-namu',
  display: 'swap'
});

const ruso = localFont({
  src: '../assets/fonts/RussoOne-Regular.ttf',
  variable: '--font-ruso',
  display: 'swap'
});

export const metadata = mainMetadata;
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function RootLayout({
  children,
  params
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${namu.variable} ${ruso.variable} antialiased`}>
        <AppProvider locale={locale}>
          <div className='min-h-screen'>{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
