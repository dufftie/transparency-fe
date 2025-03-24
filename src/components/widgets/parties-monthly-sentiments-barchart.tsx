import GraphSettings, { defaultSortOptions } from '@/src/components/graphs/graph-settings';
import StackedBarChart from '@/src/components/graphs/stacked-bar-chart';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { useState } from 'react';
import dayjs from 'dayjs';
import partiesList from '@/src/lib/dictionaries/partiesList';
import map from 'lodash/map';

const categoryOptions = [
  { value: '', label: 'Все' },
  { value: 'Мнение', label: 'Мнение' },
  { value: 'Эстония', label: 'Эстония' },
];

// Party selection options
const partyOptions = partiesList.map(party => ({
  value: party.value,
  label: party.label,
}));

const PartiesMonthlySentimentsBarchart = ({ media_id }) => {
  const [barChartCategory, setBarChartCategory] = useState('');
  const [barChartDateRange, setBarChartDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);
  
  // State for sorting and party filtering
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [selectedParties, setSelectedParties] = useState<string[]>(
    map(partiesList, party => party.value)
  );
  
  // State for sentiment visibility
  const [visibleSentiments, setVisibleSentiments] = useState<string[]>([
    'positive', 'neutral', 'negative'
  ]);

  return (
    <GraphWidget
      title="Sentiment Distribution by Party"
      settings={
        <GraphSettings
          // Category selection
          category={barChartCategory}
          categoryOptions={categoryOptions}
          onCategoryChange={setBarChartCategory}
          
          // Date range selection
          dateRange={barChartDateRange}
          onDateRangeChange={setBarChartDateRange}
          
          // Multi-party selection
          selectedParties={selectedParties}
          multiPartyOptions={partyOptions}
          onSelectedPartiesChange={setSelectedParties}
          
          // Sorting options
          sortBy={sortBy}
          sortOptions={defaultSortOptions}
          onSortChange={setSortBy}
          
          // Sentiment visibility
          visibleSentiments={visibleSentiments}
          onVisibleSentimentsChange={setVisibleSentiments}
        />
      }
    >
      <StackedBarChart
        media_id={media_id}
        category={barChartCategory}
        dateRange={barChartDateRange}
        showParties={selectedParties}
        positiveThreshold={7}
        negativeThreshold={3}
        sortBy={sortBy}
        visibleSentiments={visibleSentiments}
      />
    </GraphWidget>
  );
};

export default PartiesMonthlySentimentsBarchart;
