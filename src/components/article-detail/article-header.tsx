import React from 'react';
import { ExportOutlined } from '@ant-design/icons';
import ArticlePreview from '@/src/components/article-preview';

interface ArticleHeaderProps {
  title: string;
  url: string;
  preview_url: string;
}

export default function ArticleHeader({ title, url, preview_url }: ArticleHeaderProps) {
  return (
    <div className="article-header">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <article className="article-header__article">
          <ExportOutlined className="article-header__link-icon" />
          <span className="article-header__title">{title}</span>
          <ArticlePreview preview_url={preview_url} className="article-header__image" />
        </article>
      </a>
    </div>
  );
}
