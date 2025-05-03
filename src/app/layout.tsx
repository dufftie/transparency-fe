import './globals.css';
import type React from 'react';
import type { Metadata } from 'next';
import classNames from 'classnames';
import { Mulish, IBM_Plex_Mono, Montserrat } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import antDesignTheme from '@/src/config/antDesignTheme';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ee" className={classNames(fonts)}>
      <body>
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
