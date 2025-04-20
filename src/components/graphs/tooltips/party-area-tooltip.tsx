import { TooltipProps } from 'recharts';
import React from 'react';
import { formatDate } from '@/lib/utils/helpers';

interface PartyAreaData {
  date: string;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  positive_percentage: number;
  neutral_percentage: number;
  negative_percentage: number;
  total_count: number;
}

const PartyAreaTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0].payload as PartyAreaData;
  if (!entry) {
    return null;
  }

  return (
    <div className="party-area-tooltip">
      <div className="party-area-tooltip__date">
        {entry.date && formatDate(entry.date, 'DD MMMM YYYY')}
      </div>
      <div className="party-area-tooltip__stats">
        <div className="party-area-tooltip__stat">
          <span className="party-area-tooltip__label">Positive:</span>
          <span className="party-area-tooltip__value">
            {entry.positive_count} ({entry.positive_percentage}%)
          </span>
        </div>
        <div className="party-area-tooltip__stat">
          <span className="party-area-tooltip__label">Neutral:</span>
          <span className="party-area-tooltip__value">
            {entry.neutral_count} ({entry.neutral_percentage}%)
          </span>
        </div>
        <div className="party-area-tooltip__stat">
          <span className="party-area-tooltip__label">Negative:</span>
          <span className="party-area-tooltip__value">
            {entry.negative_count} ({entry.negative_percentage}%)
          </span>
        </div>
        <div className="party-area-tooltip__stat">
          <span className="party-area-tooltip__label">Total:</span>
          <span className="party-area-tooltip__value">{entry.total_count}</span>
        </div>
      </div>
    </div>
  );
};

export default PartyAreaTooltip; 