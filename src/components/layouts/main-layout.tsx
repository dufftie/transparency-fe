'use client';

import type React from 'react';

import { Layout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/src/components/header';

const { Content, Footer } = Layout;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <Layout className="layout">
        <Header />
        <Content className="content">
          { children }
        </Content>
      </Layout>
    </AntdRegistry>
  );
}

