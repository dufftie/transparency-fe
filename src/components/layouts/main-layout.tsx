'use client'

import type React from 'react'

import { Layout } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const { Header, Content, Footer } = Layout

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <Layout className="layout">
        <Header className="header">
          <div className="logo-container">
            Läbipaistvus
          </div>
        </Header>
        <Content className="content">
          <div className="content-container">{ children }</div>
        </Content>
        <Footer className="footer">
        </Footer>
      </Layout>
    </AntdRegistry>
  )
}

