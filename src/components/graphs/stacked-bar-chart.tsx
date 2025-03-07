'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph from '@/src/components/graphs/base-graph';
import partiesList from '@/src/lib/dictionaries/partiesList';
import { BaseGraphProps } from '@/src/types/graphs';

interface StackedBarChartProps extends BaseGraphProps {
  showParties: string[];
  positiveThreshold?: number; // Scores >= this value are considered positive
  negativeThreshold?: number; // Scores <= this value are considered negative
  sortBy?: 'name' | 'total' | 'positive' | 'negative'; // How to sort the data
  visibleSentiments: string[]; // Which sentiment types to display (positive, neutral, negative)
}

const buildUrl = ({
  category,
  startDate,
  endDate,
  parties,
}: {
  category: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  parties: string[];
}) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (startDate) params.append('start_date', startDate.format('YYYY-MM-DD'));
  if (endDate) params.append('end_date', endDate.format('YYYY-MM-DD'));
  if (parties) parties.forEach(party => params.append('parties', party));

  return `sentiments/parties/summary/?${params.toString()}`;
};

const StackedBarChart = ({
  category,
  dateRange,
  showParties = partiesList.map(p => p.value), // Default to showing all parties
  positiveThreshold = 7, // Default: scores >= 7 are positive
  negativeThreshold = 3, // Default: scores <= 3 are negative
  sortBy = 'name', // Default: sort by name
  visibleSentiments = ['positive', 'neutral', 'negative'], // Default: show all sentiments
}: StackedBarChartProps) => {
  const [startDate, endDate] = dateRange || [
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ];

  const fetchUrl = buildUrl({ category, startDate, endDate, parties: showParties });

  // Process the data for stacked bar chart
  const processData = (data: any[]) => {
    // Filter by requested parties
    const filteredData = data.filter(item => showParties.includes(item.party));

    // Calculate sentiment counts based on configurable thresholds
    let processedData = filteredData.map(item => {
      const partyInfo = partiesList.find(p => p.value === item.party);

      let positiveCount = 0;
      let neutralCount = 0;
      let negativeCount = 0;

      // Iterate through all possible score values (0-10)
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

      const totalCount = positiveCount + neutralCount + negativeCount;

      return {
        party: item.party,
        partyLabel: partyInfo?.label || item.party,
        positive_count: positiveCount,
        neutral_count: neutralCount,
        negative_count: negativeCount,
        total_count: totalCount,
        color: partyInfo?.color,
      };
    });

    // Sort the data based on sortBy parameter
    processedData = processedData.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.partyLabel.localeCompare(b.partyLabel);
        case 'total':
          return b.total_count - a.total_count;
        case 'positive':
          return b.positive_count - a.positive_count;
        case 'negative':
          return b.negative_count - a.negative_count;
        default:
          return a.partyLabel.localeCompare(b.partyLabel); // Default to name sort
      }
    });

    return processedData;
  };

  return (
    <BaseGraph graphName="stacked-bar-chart" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => {
        // Calculate max value for YAxis domain based on visible sentiments
        const maxTotal = Math.max(
          ...data.map(item => {
            let visibleTotal = 0;
            if (visibleSentiments.includes('positive')) {
              visibleTotal += item.positive_count;
            }
            if (visibleSentiments.includes('neutral')) {
              visibleTotal += item.neutral_count;
            }
            if (visibleSentiments.includes('negative')) {
              visibleTotal += item.negative_count;
            }
            return visibleTotal;
          })
        );

        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="partyLabel" axisLine={false} tickLine={false} interval={0} />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              domain={[0, maxTotal]}
              tickCount={6}
              width={50}
            />
            <Tooltip
              formatter={(value, name) => [`${value} mentions`, name]}
              labelFormatter={label => label}
            />
            <Legend />

            {visibleSentiments.includes('negative') && (
              <Bar
                dataKey="negative_count"
                name={`Negative (≤${negativeThreshold})`}
                stackId="a"
                fill="#EA5753"
              />
            )}

            {visibleSentiments.includes('neutral') && (
              <Bar
                dataKey="neutral_count"
                name={`Neutral (${negativeThreshold + 1}-${positiveThreshold - 1})`}
                stackId="a"
                fill="#D9D9D9"
                opacity="0.8"
              />
            )}

            {visibleSentiments.includes('positive') && (
              <Bar
                dataKey="positive_count"
                name={`Positive (≥${positiveThreshold})`}
                stackId="a"
                fill="#8FCC7E"
                opacity="0.8"
              />
            )}
          </BarChart>
        );
      }}
    </BaseGraph>
  );
};

export default StackedBarChart;
