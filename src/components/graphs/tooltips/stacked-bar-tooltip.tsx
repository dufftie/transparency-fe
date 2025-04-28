import { TooltipProps } from 'recharts';
import React from 'react';

interface StackedBarData {
  name: string;
  nameLabel: string;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  total_count: number;
  color?: string;
}

const StackedBarTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0].payload as StackedBarData;
  if (!entry) {
    return null;
  }

  return (
    <div className="tooltip stacked-bar-tooltip">
      <div className="stacked-bar-tooltip__party">
        {entry.nameLabel}
      </div>
      <div className="stacked-bar-tooltip__stats">
        <div className="stacked-bar-tooltip__stat">
          <span className="stacked-bar-tooltip__label">Positive:</span>
          <span className="stacked-bar-tooltip__value">
            {entry.positive_count}
          </span>
        </div>
        <div className="stacked-bar-tooltip__stat">
          <span className="stacked-bar-tooltip__label">Neutral:</span>
          <span className="stacked-bar-tooltip__value">
            {entry.neutral_count}
          </span>
        </div>
        <div className="stacked-bar-tooltip__stat">
          <span className="stacked-bar-tooltip__label">Negative:</span>
          <span className="stacked-bar-tooltip__value">
            {entry.negative_count}
          </span>
        </div>
        <div className="stacked-bar-tooltip__stat">
          <span className="stacked-bar-tooltip__label">Total:</span>
          <span className="stacked-bar-tooltip__value">{entry.total_count}</span>
        </div>
      </div>
    </div>
  );
};

export default StackedBarTooltip; 