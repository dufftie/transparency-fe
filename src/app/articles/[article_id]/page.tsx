import React, { cache } from 'react';
import { fetchData } from '@/src/lib/services/api';
import ArticleLayout from '@/app/articles/[article_id]/article-layout';
import { ArticleData, MediaData, SentimentData } from '@/src/types/article';
import { Metadata } from 'next';

const getArticleData = cache(async (article_id: string) => {
  return fetchData<{
    article: ArticleData;
    sentiments: SentimentData[];
    media: MediaData;
  }>(
    `/articles/${article_id}`,
    undefined,
    { next: { revalidate: 3600 } }
  );
});

export async function generateMetadata(props: {
  params: { article_id: string };
}): Promise<Metadata> {
  const { article_id } = props.params;
  
  try {
    const { article } = await getArticleData(article_id);
    if (!article) return {};
    
    return {
      title: article.title,
    };
  } catch (error) {
    console.error('Error fetching article data for metadata:', error);
    return {};
  }
}

export default async function ArticleDetailPage({ params }: { params: { article_id: string } }) {
  const { article_id } = params;
  
  try {
    const { article, sentiments, media } = await getArticleData(article_id);
    
    if (!article || !media || !sentiments || sentiments.length === 0) {
      return <div>Article not found</div>;
    }
    
    return <ArticleLayout article={article} media={media} sentiments={sentiments} />;
  } catch (error) {
    console.error('Error fetching article data:', error);
    return <div>Failed to load article data</div>;
  }
}
