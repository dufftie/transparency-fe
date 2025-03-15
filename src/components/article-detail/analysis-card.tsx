'use client';

import React from 'react';

interface AnalysisCardProps {
  title: string;
  score: number;
  explanation: string;
}

export default function AnalysisCard({ title, score, explanation }: AnalysisCardProps) {
  return (
    <div className="analysis-card">
      <span className="analysis-card__title">
        {title}
        <span className="analysis-card__score">{score}</span>
      </span>
      <p className="analysis-card__description">{explanation}</p>
    </div>
  );
}
