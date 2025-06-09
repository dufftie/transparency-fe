import './globals.scss';
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
  openGraph: {
    images: [
      {
        url: '/OG.png',
        width: 1200,
        height: 630,
        alt: 'MTÜ Läbipaistvus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/OG.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={classNames(fonts)}>
      <body>
        <Analytics />
        <SpeedInsights />
        <ConfigProvider theme={antDesignTheme}>
          <AntdRegistry>
            <Header />
            <main>{children}</main>
            <Footer />
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
