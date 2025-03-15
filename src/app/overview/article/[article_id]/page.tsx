'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@/src/lib/services/api';
import dayjs from 'dayjs';
import { ArticleData, SentimentData } from '@/src/types/article';
import ArticleHeader from '@/src/components/article-detail/article-header';
import ArticleAnalysis from '@/src/components/article-detail/article-analysis';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
import ArticleLoadingSkeleton from '@/src/components/article-detail/loading-skeleton';

export default function ArticleDetailPage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState<ArticleData>(null);
  const [sentiments, setSentiments] = useState<SentimentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticleData = async () => {
      if (!article_id) return;

      setLoading(true);
      try {
        const { article, sentiments } = await fetchData<{
          article: ArticleData;
          sentiments: SentimentData[];
        }>(`/articles/${article_id}`);
        setArticle(article);
        setSentiments(sentiments);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article data');
      } finally {
        setLoading(false);
      }
    };

    getArticleData();
  }, [article_id]);

  if (loading) return <ArticleLoadingSkeleton />;
  if (error) return <div className="error">{error}</div>;
  
  const selectedSentiment = sentiments[0];
  const formattedDate = dayjs(article.date_time).format('DD MMMM, YYYY');
  const partyData = selectedSentiment.sentiment.parties || [];
  
  // Extract analysis data for easier access
  const titleAnalysis = selectedSentiment.sentiment.article?.title;
  const bodyAnalysis = selectedSentiment.sentiment.article?.body;

  return (
    <div className="article-detail-page">
      <div className="article-detail-page__details">
        <ArticleHeader 
          title={article.title}
          url={article.url}
          preview_url={article.preview_url}
          date={formattedDate}
        />

        <ArticleAnalysis
          titleAnalysis={titleAnalysis}
          bodyAnalysis={bodyAnalysis}
          model={selectedSentiment.model}
          partyData={partyData}
        />
      </div>
      <div className="article-detail-page__analysis">
        {partyData.length > 0 && (
          <div className="party-analysis">
            <ArticlePartySentimentBarchart parties={partyData} />
          </div>
        )}
      </div>
    </div>
  );
}
