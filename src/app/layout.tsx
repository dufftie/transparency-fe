import type React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import antDesignTheme from '@/src/config/antDesignTheme';
import MainLayout from '@/src/components/layouts/main-layout';
import '@/src/scss/main.scss';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Läbipaistvus',
  description: 'Läbipaistvus projekt',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ee">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`${inter.className} layout`}>
        <ConfigProvider theme={antDesignTheme}>
          <MainLayout>{children}</MainLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
