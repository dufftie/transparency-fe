'use client';

import React, { JSX, useState } from 'react';
import { ArticleData, MediaData, SentimentData } from '@/src/types/article';
import ArticleHeader from '@/src/components/article-detail/article-header';
import ArticleAnalysis from '@/src/components/article-detail/article-analysis';
import ModelSelect from '@/src/components/model-select';
import AnalysisTable from '@/src/components/analysis-table';

interface ArticleLayoutProps {
  article: ArticleData;
  media: MediaData;
  sentiments: SentimentData[];
}

const ArticleLayout = ({ article, media, sentiments }: ArticleLayoutProps): JSX.Element => {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentData>(sentiments[0] || null);

  // Handle model selection change
  const handleModelChange = (sentiment: SentimentData) => {
    setSelectedSentiment(sentiment);
  };

  if (!article || !media || !selectedSentiment) {
    return <div>Article data not available</div>;
  }

  const partyData = selectedSentiment.sentiment.parties || [];
  const politiciansData = selectedSentiment.sentiment.politicians || [];
  const articleSentiment = selectedSentiment.sentiment.article;

  return (
    <div className="article-detail-page">
      <div className="article-detail-page__details">
        <ArticleHeader
          title={article.title}
          url={article.url}
          paywall={article.paywall}
          category={article.category}
          date={article.date_time}
          authors={article.authors}
          media={media}
        />
      </div>
      <div className="article-detail-page__analysis">
        <ModelSelect
          sentiments={sentiments}
          selectedSentiment={selectedSentiment}
          onModelChange={handleModelChange}
        />
        <ArticleAnalysis
          title_score={articleSentiment.title_score}
          title_explanation={articleSentiment.title_explanation}
          body_score={articleSentiment.body_score}
          body_explanation={articleSentiment.body_explanation}
          media={media}
          article={article}
        />
        <AnalysisTable
          partyData={partyData}
          politiciansData={politiciansData}
          article={article}
        />
      </div>
    </div>
  );
};

export default ArticleLayout;
