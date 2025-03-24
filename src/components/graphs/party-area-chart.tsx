'use client';

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph, { BaseGraphProps } from '@/src/components/graphs/base-graph';
import round from 'lodash/round';

interface StackedBarChartProps extends BaseGraphProps {
  showParties: string[];
  positiveThreshold?: number; // Scores >= this value are considered positive
  negativeThreshold?: number; // Scores <= this value are considered negative
  sortBy?: 'name' | 'total' | 'positive' | 'negative'; // How to sort the data
  visibleSentiments: string[]; // Which sentiment types to display (positive, neutral, negative)
}

const buildUrl = ({
  media_id,
  category,
  startDate,
  endDate,
  party,
}: {
  category: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  party: string;
}) => {
  const params = new URLSearchParams();
  if (media_id) params.append('media_id', media_id);
  if (category) params.append('category', category);
  if (startDate) params.append('start_date', startDate.format('YYYY-MM-DD'));
  if (endDate) params.append('end_date', endDate.format('YYYY-MM-DD'));
  if (party) params.append('parties', party);

  return `sentiments/parties/progress/?${params.toString()}`;
};

const PartyAreaChart = ({
  media_id,
  category,
  dateRange,
  party, // Default to showing all parties
  positiveThreshold = 7, // Default: scores >= 7 are positive
  negativeThreshold = 3, // Default: scores <= 3 are negative
  visibleSentiments = ['positive', 'neutral', 'negative'], // Default: show all sentiments
}: StackedBarChartProps) => {
  const [startDate, endDate] = dateRange;
  const fetchUrl = buildUrl({ media_id, category, startDate, endDate, party });

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
      {(data, loading) => {
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="negative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="100%" stopColor="red" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="positive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="neutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="black" stopOpacity={0.2} />
                <stop offset="100%" stopColor="black" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              height={15}
              interval={2}
            />

            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickCount={6}
              scale="linear"
              width={30}
            />

            {/* Custom Tooltip */}
            <Tooltip
              formatter={(value: any, name: string, props: any) => {
                if (name === 'Negative') {
                  return [
                    `Negative: ${props.payload.negative_count} (${props.payload.negative_percentage}%)`,
                    'Negative',
                  ];
                }
                if (name === 'Positive') {
                  return [
                    `Positive: ${props.payload.positive_count} (${props.payload.positive_percentage}%)`,
                    'Positive',
                  ];
                }
                if (name === 'Neutral') {
                  return [
                    `Neutral: ${props.payload.neutral_count} (${props.payload.neutral_percentage}%)`,
                    'Neutral',
                  ];
                }
                return [value, name];
              }}
              labelFormatter={label => label}
            />

            {/* Display the Area components with the percentage data */}
            {visibleSentiments.includes('negative') && (
              <Area
                type="monotone"
                dataKey="negative_percentage"
                stroke="red"
                fill="url(#negative)"
                name="Negative"
                stackId="a"
              />
            )}

            {visibleSentiments.includes('positive') && (
              <Area
                type="monotone"
                dataKey="positive_percentage"
                stroke="#82ca9d"
                fill="url(#positive)"
                name="Positive"
                stackId="a"
              />
            )}

            {visibleSentiments.includes('neutral') && (
              <Area
                type="monotone"
                dataKey="neutral_percentage"
                stroke="#D9D9D9"
                fill="url(#neutral)"
                name="Neutral"
                stackId="a"
              />
            )}
          </AreaChart>
        );
      }}
    </BaseGraph>
  );
};

export default PartyAreaChart;
