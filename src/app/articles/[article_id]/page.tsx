import React, { cache } from 'react';
import ArticleLayout from '@/src/components/layouts/article-layout';
import { fetchData } from '@/src/lib/services/api';
import { ArticleData, MediaData, SentimentData } from '@/src/types/article';
import { Metadata } from 'next';
import { Result } from 'antd';

const getArticleData = cache(async (article_id: string) => {
  return fetchData<{
    article: ArticleData;
    sentiments: SentimentData[];
    media: MediaData;
  }>(`/articles/${article_id}`, undefined, { next: { revalidate: 3600 } });
});

export async function generateMetadata({ params }: {
  params: Promise<{ article_id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const { article } = await getArticleData(resolvedParams.article_id);
    if (!article) return {};

    return {
      title: article.title,
    };
  } catch (error) {
    console.error('Error fetching article data for metadata:', error);
    return {};
  }
}

export default async function ArticleDetailPage({ params }: { 
  params: Promise<{ article_id: string }>;
}) {
  const { article_id } = await params;

  try {
    const { article, sentiments, media } = await getArticleData(article_id);

    if (!article || !media || !sentiments || sentiments.length === 0) {
      return (
        <Result
          status="404"
          title="Article not found"
          subTitle="The article you are looking for does not exist."
        />
      );
    }

    return <ArticleLayout article={article} media={media} sentiments={sentiments} />;
  } catch (error) {
    console.error('Error fetching article data:', error);
    return (
      <Result
        status="error"
        title="Failed to load article data"
        subTitle="There was an error loading the article data. Please try again later."
      />
    );
  }
}
