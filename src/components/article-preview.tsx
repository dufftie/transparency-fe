import React from 'react';
import { Empty } from 'antd';
import classNames from 'classnames';

interface ArticlePreviewProps {
  preview_url: string;
  className?: string;
}

const ArticlePreview = ({ preview_url, className }: ArticlePreviewProps) => {
  if (!preview_url) return <Empty description={false} />;
  return <img className={classNames('article-preview', className)} src={preview_url} alt='article preview image' />;
};

export default ArticlePreview;