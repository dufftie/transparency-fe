import type React from 'react';
import type { Metadata } from 'next';
import '@/src/scss/main.scss';
import classNames from 'classnames';
import { Mulish, IBM_Plex_Mono, Montserrat } from 'next/font/google';
import MainLayout from '@/components/layouts/main-layout/main-layout';

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
      <MainLayout>{children}</MainLayout>
    </html>
  );
}
