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
      date: dayjs(entry.date).format('MMM YYYY'),
      non_analyzed_articles: entry.articles_count - entry.analysed_count,
    }));

  return (
    <BaseGraph graphName="proceed-article-graph" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => (
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" height={20} />
          <Bar dataKey="analysed_count" fill="#EA2525" stackId="a" />
          <Bar dataKey="non_analyzed_articles" fill="#B8B8B8" stackId="a" />
        </BarChart>
      )}
    </BaseGraph>
  );
};

export default ProceededArticlesGraph;
