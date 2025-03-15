import React from 'react';
import { Empty } from 'antd';

const ArticlePreview = ({ preview_url }) => {
  if (!preview_url) return <Empty description={false} />;
  return <img className='article-preview' src={preview_url} alt='article preview image' />;
};

export default ArticlePreview;