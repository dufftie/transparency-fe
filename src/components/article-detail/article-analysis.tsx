'use client';

import React from 'react';
import AnalysisCard from './analysis-card';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
import { PartySentiment } from '@/src/types/article';

interface ArticleAnalysisProps {
  titleAnalysis: {
    score: number;
    explanation: string;
  };
  bodyAnalysis: {
    score: number;
    explanation: string;
  };
  model: string;
}

export default function ArticleAnalysis({ 
  titleAnalysis, 
  bodyAnalysis, 
  model, 
}: ArticleAnalysisProps) {
  return (
    <>
      <div className="analysis-cards">
        <AnalysisCard 
          title="Title analysis" 
          score={titleAnalysis.score} 
          explanation={titleAnalysis.explanation} 
        />
        <AnalysisCard 
          title="Article analysis" 
          score={bodyAnalysis.score} 
          explanation={bodyAnalysis.explanation} 
        />
      </div>
      
      <div className="model">
        Analysed by: <b>{model}</b>
      </div>
    </>
  );
}
