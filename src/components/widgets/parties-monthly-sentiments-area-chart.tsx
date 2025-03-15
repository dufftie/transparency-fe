import GraphSettings, { defaultSortOptions } from '@/src/components/graphs/graph-settings';
import PartyAreaChart from '@/src/components/graphs/party-area-chart';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { useState } from 'react';
import dayjs from 'dayjs';
import partiesList from '@/src/lib/dictionaries/partiesList';

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

const PartiesMonthlySentimentsAreaChart = () => {
  const [party, setParty] = useState(partiesList[0].value);
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);
  
  // State for sentiment visibility
  const [visibleSentiments, setVisibleSentiments] = useState<string[]>([
    'positive',
    'neutral',
    'negative',
  ]);

  return (
    <GraphWidget
      title="Sentiment progress by Party"
      settings={
        <GraphSettings
          party={party}
          category={category}
          dateRange={dateRange}
          categoryOptions={categoryOptions}
          partyOptions={partiesList}
          onPartyChange={setParty}
          onCategoryChange={setCategory}
          onDateRangeChange={setDateRange}
          visibleSentiments={visibleSentiments}
          onVisibleSentimentsChange={setVisibleSentiments}
        />
      }
    >
      <PartyAreaChart
        category={category}
        dateRange={dateRange}
        party={party}
        positiveThreshold={7}
        negativeThreshold={3}
        visibleSentiments={visibleSentiments}
      />
    </GraphWidget>
  );
};

export default PartiesMonthlySentimentsAreaChart;
