import React from 'react';
import { fetchData } from '@/src/lib/services/api';
import ArticleLayout from '@/app/articles/[article_id]/article-layout';
import { ArticleData } from '@/src/types/article';
import { Metadata } from 'next';
import ArticlesLayout from './articles-layout';

export default async function Home() {
  const stats = await fetchData(`/articles/stats`);
  return <ArticlesLayout {...stats} />;
}
