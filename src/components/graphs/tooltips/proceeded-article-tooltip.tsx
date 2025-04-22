import { TooltipProps } from 'recharts';
import React from 'react';
import { formatDate } from '@/lib/utils/helpers';

interface ProceededArticleData {
  date: string;
  analysed_count: number;
  non_analyzed_articles: number;
  articles_count: number;
}

const ProceededArticleTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0].payload as ProceededArticleData;
  if (!entry) {
    return null;
  }

  return (
    <div className="tooltip proceeded-article-tooltip">
      <div className="proceeded-article-tooltip__date">
        {entry.date && formatDate(entry.date, 'DD MMMM YYYY')}
      </div>
      <div className="proceeded-article-tooltip__stats">
        <div className="proceeded-article-tooltip__stat">
          <span className="proceeded-article-tooltip__label">Analyzed:</span>
          <span className="proceeded-article-tooltip__value">{entry.analysed_count || 0}</span>
        </div>
        <div className="proceeded-article-tooltip__stat">
          <span className="proceeded-article-tooltip__label">Not Analyzed:</span>
          <span className="proceeded-article-tooltip__value">{entry.non_analyzed_articles || 0}</span>
        </div>
        <div className="proceeded-article-tooltip__stat">
          <span className="proceeded-article-tooltip__label">Total:</span>
          <span className="proceeded-article-tooltip__value">{entry.articles_count || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ProceededArticleTooltip; 