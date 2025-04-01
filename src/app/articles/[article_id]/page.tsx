import React from 'react';
import { fetchData } from '@/src/lib/services/api';
import ArticleLayout from '@/app/articles/[article_id]/article-layout';
import { ArticleData } from '@/src/types/article';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: { article_id: string };
}): Promise<Metadata> {
  const params = await props.params;
  const article_id = params.article_id;

  const { article } = await fetchData<{ article: ArticleData }>(`/articles/${article_id}`);
  if (!article) return {};

  return {
    title: article.title,
  };
}

export default function ArticleDetailPage() {
  return <ArticleLayout />;
}
