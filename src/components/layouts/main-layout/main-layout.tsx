import React, { JSX } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import antDesignTheme from '@/src/config/antDesignTheme';
import Content from './content';
import Header from './header';
import Footer from './footer';

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
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
};

export default MainLayout;
