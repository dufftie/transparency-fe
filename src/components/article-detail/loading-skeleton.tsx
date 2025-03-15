'use client';

import React from 'react';

export default function ArticleLoadingSkeleton() {
  return (
    <div className="article-detail-page">
      <div className="article-detail-page__details">
        <div className="article skeleton">
          <div className="skeleton-line title-skeleton"></div>
          <div className="image-skeleton"></div>
          <div className="skeleton-line date-skeleton"></div>
        </div>
        
        <div className="analysis-cards">
          <div className="analysis-card skeleton">
            <div className="skeleton-header">
              <div className="skeleton-line title-skeleton"></div>
              <div className="skeleton-line score-skeleton"></div>
            </div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
          
          <div className="analysis-card skeleton">
            <div className="skeleton-header">
              <div className="skeleton-line title-skeleton"></div>
              <div className="skeleton-line score-skeleton"></div>
            </div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
        
        <div className="skeleton-line model-skeleton"></div>
      </div>
      
      <div className="article-detail-page__analysis">
        <div className="party-analysis skeleton">
          <div className="chart-skeleton"></div>
        </div>
      </div>
    </div>
  );
}