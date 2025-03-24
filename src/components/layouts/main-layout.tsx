import type React from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/src/components/layouts/header';
import Footer from '@/src/components/layouts/footer';
import Content from '@/src/components/layouts/content';
import { ConfigProvider } from 'antd';
import antDesignTheme from '@/src/config/antDesignTheme';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <body>
      <ConfigProvider theme={antDesignTheme}>
        <AntdRegistry>
          <Header />
          <Content>{children}</Content>
          <Footer />
        </AntdRegistry>
      </ConfigProvider>
    </body>
  );
}
