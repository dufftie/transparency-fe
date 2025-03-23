'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@/src/lib/services/api';
import { ArticleData, MediaData, SentimentData } from '@/src/types/article';
import ArticleHeader from '@/src/components/article-detail/article-header';
import ArticleAnalysis from '@/src/components/article-detail/article-analysis';
import AnalysisTable from '@/src/components/analysis-table';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import ModelSelect from '@/src/components/model-select';

export default function ArticleDetailPage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [media, setMedia] = useState<MediaData | null>(null);
  const [sentiments, setSentiments] = useState<SentimentData[]>([]);
  const [sentiment, setSentiment] = useState<SentimentData>(sentiments[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticleData = async () => {
      if (!article_id) return;

      setLoading(true);
      try {
        const { article, sentiments, media } = await fetchData<{
          article: ArticleData;
          sentiments: SentimentData[];
          media: MediaData;
        }>(`/articles/${article_id}`);
        setArticle(article);
        setMedia(media);
        setSentiments(sentiments);
        setSentiment(sentiments[0]);
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

  if (loading) return <Spin size="large" indicator={<LoadingOutlined spin />} className="active" />;
  if (error || !article || !media) return <div className="error">{error}</div>;

  const partyData = sentiment.sentiment.parties || [];
  const politiciansData = sentiment.sentiment.politicians || [];

  return (
    <div className="article-detail-page">
      <div className="article-detail-page__details">
        <ArticleHeader title={article.title} url={article.url} preview_url={article.preview_url} />

        <ArticleAnalysis
          titleAnalysis={sentiment.sentiment.article?.title}
          bodyAnalysis={sentiment.sentiment.article?.body}
          partyData={partyData}
          media={media}
          article={article}
        />

        <ModelSelect selectedSentiment={sentiment.id} sentiments={sentiments} />
      </div>
      <div className="article-detail-page__analysis">
        <AnalysisTable title="Parties" data={partyData} />
        <AnalysisTable title="Politicians" data={politiciansData} />
      </div>
    </div>
  );
}
