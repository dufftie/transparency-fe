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

  // Filter and aggregate data based on the number of data points
  const filterAndAggregateData = (data: any[]) => {
    const [domainStart, domainEnd] = formattedDomainDateRange;
    const domainStartDate = dayjs(domainStart);
    const domainEndDate = dayjs(domainEnd);

    // Filter data to domain range
    const filteredData = data.filter(entry => {
      const entryDate = dayjs(entry.date);
      return entryDate.isSameOrAfter(domainStartDate) && entryDate.isSameOrBefore(domainEndDate);
    });

    // If we have 500 or fewer data points, return all of them
    if (filteredData.length <= 500) {
      return filteredData;
    }

    // Determine aggregation period based on the number of data points
    let aggregationPeriod: 'day' | 'week';
    
    // Calculate how many data points we'd have with each aggregation level
    const uniqueDays = new Set(filteredData.map(entry => dayjs(entry.date).format('YYYY-MM-DD'))).size;
    const uniqueWeeks = new Set(filteredData.map(entry => dayjs(entry.date).startOf('week').format('YYYY-MM-DD'))).size;
    
    // Choose the smallest aggregation period that gives us 500 or fewer data points
    if (uniqueWeeks <= 500) {
      aggregationPeriod = 'week';
    } else {
      aggregationPeriod = 'day';
    }

    // Group data by aggregation period
    const aggregatedData: Record<string, any> = {};

    filteredData.forEach(entry => {
      let key: string;
      
      if (aggregationPeriod === 'day') {
        key = dayjs(entry.date).format('YYYY-MM-DD');
      } else {
        // Week
        key = dayjs(entry.date).startOf('week').format('YYYY-MM-DD');
      }

      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date: entry.date,
          timestamp: dayjs(key).valueOf(),
          displayDate: dayjs(key).format('YYYY'),
          analysed_count: 0,
          non_analyzed_articles: 0,
          articles_count: 0
        };
      }

      aggregatedData[key].analysed_count += entry.analysed_count;
      aggregatedData[key].non_analyzed_articles += entry.non_analyzed_articles;
      aggregatedData[key].articles_count += entry.articles_count;
    });

    // Convert aggregated data to array and sort by date
    const sortedData = Object.values(aggregatedData).sort((a, b) => a.timestamp - b.timestamp);
    
    // Fill in missing dates with zero values to avoid gaps
    const filledData: any[] = [];
    
    if (sortedData.length > 0) {
      const startTimestamp = sortedData[0].timestamp;
      const endTimestamp = sortedData[sortedData.length - 1].timestamp;
      
      let currentTimestamp = startTimestamp;
      
      while (currentTimestamp <= endTimestamp) {
        const currentDate = dayjs(currentTimestamp);
        const currentKey = aggregationPeriod === 'day' 
          ? currentDate.format('YYYY-MM-DD')
          : currentDate.startOf('week').format('YYYY-MM-DD');
        
        // Find if we have data for this date
        const existingData = sortedData.find(item => 
          dayjs(item.timestamp).format('YYYY-MM-DD') === currentKey
        );
        
        if (existingData) {
          filledData.push(existingData);
        } else {
          // Add a zero-value entry for this date
          filledData.push({
            date: currentKey,
            timestamp: currentTimestamp,
            displayDate: currentDate.format('YYYY'),
            analysed_count: 0,
            non_analyzed_articles: 0,
            articles_count: 0
          });
        }
        
        // Move to next date
        currentTimestamp = aggregationPeriod === 'day'
          ? currentTimestamp + 24 * 60 * 60 * 1000 // Add one day
          : currentTimestamp + 7 * 24 * 60 * 60 * 1000; // Add one week
      }
    }
    
    return filledData;
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
        // Filter and aggregate the data based on the number of data points
        const aggregatedData = filterAndAggregateData(data);
        
        // Calculate domain for even distribution
        const [domainStart, domainEnd] = formattedDomainDateRange;
        const startTimestamp = dayjs(domainStart).valueOf();
        const endTimestamp = dayjs(domainEnd).valueOf();

        return (
          <BarChart data={aggregatedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
