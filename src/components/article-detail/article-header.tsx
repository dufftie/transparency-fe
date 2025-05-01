import React from 'react';
import ArticlePreview from '@/src/components/article-preview';
import { ArticleData } from '@/src/types/article';

interface ArticleHeaderProps {
  article: ArticleData;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const { title, url, preview_url } = article;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="article-header">
      <article className="article-header__article">
        <span className="article-header__title">{title}</span>
        <ArticlePreview preview_url={preview_url} className="article-header__image" />
      </article>
    </a>
  );
}
