'use client';

import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ArticleLoading = () => {
  return (
    <div className="article-loading">
      <Spin size="large" indicator={<LoadingOutlined spin />} />
    </div>
  );
};

export default ArticleLoading;