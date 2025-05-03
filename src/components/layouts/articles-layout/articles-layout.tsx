'use client';

import React from 'react';
import ArticleSearch from '@/components/article-search/article-search';
import { useSearchParams } from 'next/navigation';
import styles from './articles-layout.module.scss';

interface ArticlesLayoutProps {
  children?: React.ReactNode;
  total_articles: number;
  total_sentiments: number;
  [key: string]: any;
}

export default function ArticlesLayout({ children, total_articles, total_sentiments, ...props }: ArticlesLayoutProps) {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') || undefined;

  return (
    <div className={styles.container}>
      <ArticleSearch 
        total_articles={total_articles}
        total_sentiments={total_sentiments}
        defaultValue={searchValue} 
        limit={100} 
      />
      {children}
    </div>
  );
};
