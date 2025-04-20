'use client';

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph, { BaseGraphProps } from '@/src/components/graphs/base-graph';
import round from 'lodash/round';
import { formatDate } from '@/lib/utils/helpers';
import { useDateRange } from '@/src/contexts/date-range-context';
import { useState } from 'react';

interface PartyAreaChartProps {
  media_id?: string;
  category?: string;
  party: string;
  positiveThreshold?: number; // Scores >= this value are considered positive
  negativeThreshold?: number; // Scores <= this value are considered negative
  sortBy?: 'name' | 'total' | 'positive' | 'negative'; // How to sort the data
}

const buildUrl = ({
  media_id,
  category,
  startDate,
  endDate,
  party,
}: {
  media_id?: string;
  category?: string;
  startDate: string;
  endDate: string;
  party: string;
}) => {
  const params = new URLSearchParams();
  if (media_id) params.append('media_id', media_id);
  if (category) params.append('category', category);
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);
  if (party) params.append('parties', party);

  return `sentiments/parties/progress/?${params.toString()}`;
};

const PartyAreaChart = ({
  media_id,
  category,
  party, // Default to showing all parties
  positiveThreshold = 7, // Default: scores >= 7 are positive
  negativeThreshold = 3, // Default: scores <= 3 are negative
}: PartyAreaChartProps) => {
  const [visibleSentiments, setVisibleSentiments] = useState<string[]>([
    'positive',
    'neutral',
    'negative',
  ]);
  const { formattedRequestDateRange } = useDateRange();
  const [startDate, endDate] = formattedRequestDateRange;
  const fetchUrl = buildUrl({ media_id, category, startDate, endDate, party });

  const handleSentimentToggle = (sentiment: string) => {
    setVisibleSentiments(prev => {
      if (prev.includes(sentiment)) {
        return prev.filter(s => s !== sentiment);
      }
      return [...prev, sentiment];
    });
  };

  const processData = (data: any[]) => {
    return data.map(item => {
      let positiveCount = 0;
      let neutralCount = 0;
      let negativeCount = 0;

      for (let score = 0; score <= 10; score++) {
        const count = parseInt(item[score.toString()]) || 0;

        if (score >= positiveThreshold) {
          positiveCount += count;
        } else if (score <= negativeThreshold) {
          negativeCount += count;
        } else {
          neutralCount += count;
        }
      }

      // Determine which sentiment types to include based on the visibleSentiments prop
      const sentimentCounts = {
        positive: visibleSentiments.includes('positive') ? positiveCount : 0,
        neutral: visibleSentiments.includes('neutral') ? neutralCount : 0,
        negative: visibleSentiments.includes('negative') ? negativeCount : 0,
      };

      const totalCount =
        sentimentCounts.positive + sentimentCounts.neutral + sentimentCounts.negative;

      // If totalCount is 0 (i.e., no included sentiment types), set percentages to 0
      const positivePercentage = totalCount > 0 ? (sentimentCounts.positive / totalCount) * 100 : 0;
      const neutralPercentage = totalCount > 0 ? (sentimentCounts.neutral / totalCount) * 100 : 0;
      const negativePercentage = totalCount > 0 ? (sentimentCounts.negative / totalCount) * 100 : 0;

      return {
        date: item.date,
        positive_count: sentimentCounts.positive,
        neutral_count: sentimentCounts.neutral,
        negative_count: sentimentCounts.negative,
        positive_percentage: round(positivePercentage, 1),
        neutral_percentage: round(neutralPercentage, 1),
        negative_percentage: round(negativePercentage, 1),
        total_count: totalCount,
      };
    });
  };

  return (
    <BaseGraph graphName="stacked-bar-chart" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => (
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="negative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#EA2525" stopOpacity={1} />
              <stop offset="80%" stopColor="#EA2525" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="positive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#13BA00" stopOpacity={1} />
              <stop offset="100%" stopColor="#13BA00" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="neutral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D9D9D9" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#D9D9D9" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={tick => formatDate(tick, 'DD MMM, YYYY') || ''}
            fontSize={10}
          />

          <YAxis
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            scale="linear"
            tickCount={10}
            width={30}
            fontSize={10}
            tickFormatter={value => `${value}%`}
          />

          {/* Display the Area components with the percentage data */}
          {visibleSentiments.includes('negative') && (
            <Area
              type="monotone"
              stroke="none"
              dataKey="negative_percentage"
              fill="url(#negative)"
              name="Negative"
              stackId="a"
            />
          )}

          {visibleSentiments.includes('positive') && (
            <Area
              type="monotone"
              stroke="none"
              dataKey="positive_percentage"
              fill="url(#positive)"
              name="Positive"
              stackId="a"
            />
          )}

          {visibleSentiments.includes('neutral') && (
            <Area
              type="monotone"
              dataKey="neutral_percentage"
              stroke="none"
              fill="url(#neutral)"
              name="Neutral"
              stackId="a"
            />
          )}
        </AreaChart>
      )}
    </BaseGraph>
  );
};

export default PartyAreaChart;
