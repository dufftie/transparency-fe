'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@/src/lib/services/api';
import { ArticleData, MediaData, SentimentData } from '@/src/types/article';
import ArticleHeader from '@/src/components/article-detail/article-header';
import ArticleAnalysis from '@/src/components/article-detail/article-analysis';
import AnalysisTable from '@/src/components/analysis-table';
import ModelSelect from '@/src/components/model-select';
import ArticleLoading from '@/src/components/article-detail/article-loading';
import ArticleError from '@/src/components/article-detail/article-error';
import Head from 'next/head';

export default function ArticleDetailPage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [media, setMedia] = useState<MediaData | null>(null);
  const [sentiments, setSentiments] = useState<SentimentData[]>([]);
  const [selectedSentimentId, setSelectedSentimentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the currently selected sentiment based on ID
  const selectedSentiment = sentiments.find(s => s.id === selectedSentimentId) || sentiments[0];

  // Handle model selection change
  const handleModelChange = (sentimentId: number) => {
    setSelectedSentimentId(sentimentId);
  };

  useEffect(() => {
    const getArticleData = async () => {
      if (!article_id) {
        setError('Invalid article ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { article, sentiments, media } = await fetchData<{
          article: ArticleData;
          sentiments: SentimentData[];
          media: MediaData;
        }>(`/articles/${article_id}`);
        
        if (!article) throw new Error('Article data not found');
        if (!media) throw new Error('Media data not found');
        if (!sentiments || sentiments.length === 0) throw new Error('Sentiment data not found');
        
        setArticle(article);
        setMedia(media);
        setSentiments(sentiments);
        setSelectedSentimentId(sentiments[0]?.id || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article data');
      } finally {
        setLoading(false);
      }
    };

    getArticleData();
  }, [article_id]);

  if (loading) return <ArticleLoading />;
  
  if (error || !article || !media || !selectedSentiment) {
    return <ArticleError message={error || 'Failed to load article data'} />;
  }

  const partyData = selectedSentiment.sentiment.parties || [];
  const politiciansData = selectedSentiment.sentiment.politicians || [];
  const articleSentiment = selectedSentiment.sentiment.article;

  const pageTitle = article.title || 'Article Detail';
  const pageDescription = articleSentiment?.title?.explanation || 'Article analysis';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {article.preview_url && <meta property="og:image" content={article.preview_url} />}
      </Head>
      
      <div className="article-detail-page">
        <div className="article-detail-page__details">
          <ArticleHeader 
            title={article.title} 
            url={article.url} 
            preview_url={article.preview_url} 
          />

          {articleSentiment && (
            <ArticleAnalysis
              titleAnalysis={articleSentiment.title}
              bodyAnalysis={articleSentiment.body}
              media={media}
              article={article}
            />
          )}

          <ModelSelect 
            selectedSentiment={selectedSentimentId || sentiments[0]?.id} 
            sentiments={sentiments}
            onModelChange={handleModelChange}
          />
        </div>
        
        <div className="article-detail-page__analysis">
          <AnalysisTable title="Parties" data={partyData} />
          <AnalysisTable title="Politicians" data={politiciansData} />
        </div>
      </div>
    </>
  );
}