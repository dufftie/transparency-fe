'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import BaseGraph from '@/src/components/graphs/base-graph';
import { useDateRange } from '@/src/contexts/date-range-context';

// Extend dayjs with the required plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface ProceededArticlesGraphProps {
  mediaId: number;
}

const ProceededArticlesGraph = ({ mediaId }: ProceededArticlesGraphProps) => {
  const { formattedRequestDateRange, formattedDomainDateRange } = useDateRange();
  const [startDate, endDate] = formattedRequestDateRange;
  const fetchUrl = `/sentiments/daily-stats/media/${mediaId}/?start_date=${startDate}&end_date=${endDate}`;

  const processData = (data: any[]) => {
    // First process the data as before
    const processedData = data.map(entry => ({
      ...entry,
      date: dayjs(entry.date).format('YYYY-MM-DD'),
      displayDate: dayjs(entry.date).format('YYYY'),
      non_analyzed_articles: entry.articles_count - entry.analysed_count,
    }));

    // Then filter the data based on domain date range
    const [domainStart, domainEnd] = formattedDomainDateRange;
    const domainStartDate = dayjs(domainStart);
    const domainEndDate = dayjs(domainEnd);

    return processedData.filter(entry => {
      const entryDate = dayjs(entry.date);
      return entryDate.isSameOrAfter(domainStartDate) && entryDate.isSameOrBefore(domainEndDate);
    });
  };

  const formatXAxis = (tickItem: string) => {
    const date = dayjs(tickItem);
    const month = date.month();
    return month === 0 ? date.format('YYYY') : 
           month === 6 ? date.format('MMM YYYY') : '';
  };

  const ticks = (data: any[]) => {
    if (!data.length) return [];
    
    // Use domain date range for X-axis ticks
    const [domainStart, domainEnd] = formattedDomainDateRange;
    const startDate = dayjs(domainStart);
    const endDate = dayjs(domainEnd);
    
    const result: string[] = [];
    let currentDate = startDate.startOf('month');
    
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
