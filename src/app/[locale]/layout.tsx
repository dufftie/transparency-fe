import '@/app/globals.scss';
import type React from 'react';
import type { Metadata } from 'next';
import classNames from 'classnames';
import { Mulish, IBM_Plex_Mono, Montserrat } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import antDesignTheme from '@/src/config/antDesignTheme';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/src/i18n/routing';
import { notFound } from 'next/navigation';

const mulish = Mulish({
  subsets: ['latin', 'cyrillic'],
});
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
});

const fonts = [montserrat.className, mulish.className, ibmPlexMono.className];

export const metadata: Metadata = {
  title: 'MTÜ Läbipaistvus',
  description: 'Läbipaistvus projekt',
};


export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className={classNames(fonts)}>
      <body>
        <Analytics />
        <SpeedInsights />
        <NextIntlClientProvider>
          <ConfigProvider theme={antDesignTheme}>
            <AntdRegistry>
              <Header />
              <main>{children}</main>
              <Footer />
            </AntdRegistry>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
