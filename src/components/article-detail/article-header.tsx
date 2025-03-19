'use client';

import React from 'react';
import { ExportOutlined } from '@ant-design/icons';
import ArticlePreview from '@/src/components/article-preview';

interface ArticleHeaderProps {
  title: string;
  url: string;
  preview_url: string;
  date: string;
}

export default function ArticleHeader({ title, url, preview_url, date }: ArticleHeaderProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <article className="article">
        <ExportOutlined className="article__link-icon" />
        <span className="article__title">{title}</span>
        <ArticlePreview preview_url={preview_url} />
        <span className="article__date">{date}</span>
      </article>
    </a>
  );
}
