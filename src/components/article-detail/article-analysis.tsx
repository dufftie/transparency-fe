'use client';

import React from 'react';
import AnalysisCard from './analysis-card';

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
  const titlePrompt = (
    <pre>
      Оцени объективность *заголовка* статьи по шкале от 0 до 10 (0 - крайне предвзятый, 10 -
      абсолютно объективный). Предоставь обоснование. Учитывай, отражает ли заголовок содержание
      статьи, использует ли он эмоционально окрашенную лексику, преувеличения или искажения.
    </pre>
  );

  const articlePrompt = (
    <pre>
      Оцени объективность *всего текста* статьи по шкале от 0 до 10 (0 - крайне предвзятый, 10 -
      абсолютно объективный). Предоставь обоснование. Учитывай, представлены ли разные точки зрения,
      используются ли достоверные источники, есть ли признаки манипуляции фактами или мнениями.
    </pre>
  );

  return (
    <>
      <div className="analysis-cards">
        <AnalysisCard
          title="Title"
          score={titleAnalysis.score}
          explanation={titleAnalysis.explanation}
          hint={titlePrompt}
        />
        <AnalysisCard
          title="Content"
          score={bodyAnalysis.score}
          explanation={bodyAnalysis.explanation}
          hint={articlePrompt}
        />
      </div>

      <div className="model">
        Analysed by: <b>{model}</b>
      </div>
    </>
  );
}
