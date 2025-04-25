'use client';

import StackedBarChart from '@/src/components/graphs/stacked-bar-chart';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { useState } from 'react';
import partiesList from '@/src/lib/dictionaries/partiesList';
import map from 'lodash/map';
import { DateRangeProvider } from '@/src/contexts/date-range-context';

interface PartiesMonthlySentimentsBarchartProps {
  media_id: string;
}

const PartiesMonthlySentimentsBarchart = ({ media_id }: PartiesMonthlySentimentsBarchartProps) => {
  // State for sorting and party filtering
  const [sortBy, setSortBy] = useState<'name' | 'total' | 'positive' | 'negative'>('name'); // Default sort by name
  const [selectedParties, setSelectedParties] = useState<string[]>(
    map(partiesList, party => party.value)
  );
  
  // State for sentiment visibility
  const [visibleSentiments, setVisibleSentiments] = useState<string[]>([
    'positive', 'neutral', 'negative'
  ]);

  return (
    <DateRangeProvider>
      <GraphWidget
        title="Sentiment Distribution by Party"
        description="This chart shows the distribution of sentiment for each party"
      >
        <StackedBarChart
          media_id={media_id}
          showParties={selectedParties}
          positiveThreshold={7}
          negativeThreshold={3}
          sortBy={sortBy}
          visibleSentiments={visibleSentiments}
        />
      </GraphWidget>
    </DateRangeProvider>
  );
};

export default PartiesMonthlySentimentsBarchart;
