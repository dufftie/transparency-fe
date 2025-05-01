'use client';

import React, { JSX, useState } from 'react';
import { ArticleData, MediaData, SentimentData } from '@/src/types/article';
import ArticleHeader from '@/src/components/article-detail/article-header';
import ArticleAnalysis from '@/src/components/article-detail/article-analysis';
import ModelSelect from '@/src/components/model-select';
import AnalysisWidget from '@/src/components/analysis-widget';
import { Descriptions } from 'antd';
import { formatDate } from '@/src/lib/utils/helpers';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
import PoliticianBarChart from '@/src/components/graphs/politician-bar-chart';

interface ArticleLayoutProps {
  article: ArticleData;
  media: MediaData;
  sentiments: SentimentData[];
}

const ArticleLayout = ({ article, media, sentiments }: ArticleLayoutProps): JSX.Element => {
  console.log({ article, media, sentiments });
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentData>(sentiments[0] || null);

  // Handle model selection change
  const handleModelChange = (sentiment: SentimentData) => {
    setSelectedSentiment(sentiment);
  };

  const partyData = selectedSentiment.sentiment.parties || [];
  const politiciansData = selectedSentiment.sentiment.politicians || [];
  const articleSentiment = selectedSentiment.sentiment.article;

  console.log({ partyData, politiciansData, articleSentiment });

  // Create a list of metadata items for the Descriptions component
  const metaItems = [
    { label: 'Author', children: article.authors },
    {
      label: 'Publisher',
      children: (
        <a href={`/media/${media.slug}`} target="_blank" rel="noopener noreferrer">
          {media.title}
        </a>
      ),
    },
    { label: 'Category', children: article.category },
    { label: 'Published at', children: formatDate(article.date_time) },
    { label: 'Scanned at', children: formatDate(article.created_at) },
  ];

  return (
    <div className="article-layout">
      <div className="article-layout__header">
        <ArticleHeader article={article} />

        <div className="article-layout__meta">
          <Descriptions column={1} items={metaItems} />
          <ModelSelect
            sentiments={sentiments}
            selectedSentiment={selectedSentiment}
            onModelChange={handleModelChange}
          />
        </div>
      </div>

      <div className="article-layout__analysis">
        <ArticleAnalysis
          title_score={articleSentiment.title_score}
          title_explanation={articleSentiment.title_explanation}
          body_score={articleSentiment.body_score}
          body_explanation={articleSentiment.body_explanation}
        />
      </div>

      <div className="article-layout__analysis">
        <AnalysisWidget 
          title="Parties" 
          data={partyData} 
          chart={<ArticlePartySentimentBarchart parties={partyData} />} 
        />
        <AnalysisWidget 
          title="Politicians" 
          data={politiciansData} 
          chart={<PoliticianBarChart politicians={politiciansData} />} 
        />
      </div>
    </div>
  );
};

export default ArticleLayout;
