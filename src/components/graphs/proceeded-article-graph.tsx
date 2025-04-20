'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph from '@/src/components/graphs/base-graph';

interface ProceededArticlesGraphProps {
  dateRange: string[];
  mediaId: number;
}

const ProceededArticlesGraph = ({ dateRange, mediaId }: ProceededArticlesGraphProps) => {
  const [startDate, endDate] = dateRange;
  const fetchUrl = `/sentiments/daily-stats/media/${mediaId}/?start_date=${startDate}&end_date=${endDate}`;

  const processData = (data: any[]) =>
    data.map(entry => ({
      ...entry,
      date: dayjs(entry.date).format('YYYY-MM-DD'),
      displayDate: dayjs(entry.date).format('YYYY'),
      non_analyzed_articles: entry.articles_count - entry.analysed_count,
    }));

  const formatXAxis = (tickItem: string) => {
    const date = dayjs(tickItem);
    const month = date.month();
    return month === 0 ? date.format('YYYY') : 
           month === 6 ? date.format('MMM YYYY') : '';
  };

  const ticks = (data: any[]) => {
    if (!data.length) return [];
    const allDates = data.map(item => dayjs(item.date));
    const result: string[] = [];
    
    let currentDate = dayjs(allDates[0]).startOf('month');
    const endDate = dayjs(allDates[allDates.length - 1]);

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      if (currentDate.month() === 0 || currentDate.month() === 6) {
        result.push(currentDate.format('YYYY-MM-DD'));
      }
      currentDate = currentDate.add(1, 'month');
    }
    
    return result;
  };

  return (
    <BaseGraph graphName="proceed-article-graph" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => (
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="date"
            tickFormatter={formatXAxis}
            ticks={ticks(data)}
            tickMargin={10}
          />
          <Bar dataKey="analysed_count" fill="#EA2525" stackId="a" />
          <Bar dataKey="non_analyzed_articles" fill="#B8B8B8" stackId="a" />
        </BarChart>
      )}
    </BaseGraph>
  );
};

export default ProceededArticlesGraph;
