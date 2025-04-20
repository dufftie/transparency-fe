'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import BaseGraph from '@/src/components/graphs/base-graph';
import { useDateRange } from '@/src/contexts/date-range-context';
import { useMemo } from 'react';

// Extend dayjs with the required plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface ProceededArticlesGraphProps {
  mediaId: number;
}

const ProceededArticlesGraph = ({ mediaId }: ProceededArticlesGraphProps) => {
  const { formattedRequestDateRange, formattedDomainDateRange } = useDateRange();
  const [startDate, endDate] = formattedRequestDateRange;
  
  // Memoize the fetchUrl so it only changes when request range changes
  const fetchUrl = useMemo(() => 
    `/sentiments/daily-stats/media/${mediaId}/?start_date=${startDate}&end_date=${endDate}`,
    [mediaId, startDate, endDate]
  );

  // Memoize the base data processing function that doesn't depend on domain range
  const processData = useMemo(() => {
    return (data: any[]) => data.map(entry => ({
      ...entry,
      date: dayjs(entry.date).format('YYYY-MM-DD'),
      timestamp: dayjs(entry.date).valueOf(),
      displayDate: dayjs(entry.date).format('YYYY'),
      non_analyzed_articles: entry.articles_count - entry.analysed_count,
    }));
  }, []); // No dependencies as it doesn't use any external values

  // Filter data based on domain range - this will run during render but won't trigger refetch
  const filterDataByDomain = (data: any[]) => {
    const [domainStart, domainEnd] = formattedDomainDateRange;
    const domainStartDate = dayjs(domainStart);
    const domainEndDate = dayjs(domainEnd);

    return data.filter(entry => {
      const entryDate = dayjs(entry.date);
      return entryDate.isSameOrAfter(domainStartDate) && entryDate.isSameOrBefore(domainEndDate);
    });
  };

  const formatXAxis = (timestamp: number) => {
    const date = dayjs(timestamp);
    
    // Calculate the total duration to determine the appropriate format
    const [domainStart, domainEnd] = formattedDomainDateRange;
    const startDate = dayjs(domainStart);
    const endDate = dayjs(domainEnd);
    const totalDuration = endDate.diff(startDate, 'day');
    
    // For ranges less than 1 year, show month and day
    if (totalDuration < 365) {
      return date.format('MMM D');
    }
    
    // For ranges between 1-3 years, show month and year
    if (totalDuration < 365 * 3) {
      return date.format('MMM YYYY');
    }
    
    // For ranges over 3 years, show just the year
    return date.format('YYYY');
  };

  return (
    <BaseGraph graphName="proceed-article-graph" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => {
        // Filter the data based on domain range
        const filteredData = filterDataByDomain(data);
        
        // Calculate domain for even distribution
        const [domainStart, domainEnd] = formattedDomainDateRange;
        const startTimestamp = dayjs(domainStart).valueOf();
        const endTimestamp = dayjs(domainEnd).valueOf();

        return (
          <BarChart data={filteredData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="timestamp"
              scale="time"
              type="number"
              interval='preserveStartEnd'
              domain={[startTimestamp, endTimestamp]}
              tickFormatter={formatXAxis}
              ticks={[
                startTimestamp,
                startTimestamp + (endTimestamp - startTimestamp) * 0.2,
                startTimestamp + (endTimestamp - startTimestamp) * 0.4,
                startTimestamp + (endTimestamp - startTimestamp) * 0.6,
                startTimestamp + (endTimestamp - startTimestamp) * 0.8,
                endTimestamp,
              ]}
              tickMargin={10}
            />
            <Bar dataKey="analysed_count" fill="#EA2525" stackId="a" />
            <Bar dataKey="non_analyzed_articles" fill="#B8B8B8" stackId="a" />
          </BarChart>
        );
      }}
    </BaseGraph>
  );
};

export default ProceededArticlesGraph;
