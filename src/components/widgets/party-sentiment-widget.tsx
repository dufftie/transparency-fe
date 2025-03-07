import GraphSettings from '@/src/components/graphs/graph-settings';
import PartyScatterPlotGraph from '@/src/components/graphs/party-scatter-plot';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { useState } from 'react';
import dayjs from 'dayjs';
import partiesList from '@/src/lib/dictionaries/partiesList';

const categoryOptions = [
  { value: '', label: 'Все' },
  { value: 'Мнение', label: 'Мнение' },
  { value: 'Эстония', label: 'Эстония' },
];

const PartySentimentWidget = () => {
  const [party, setParty] = useState(partiesList[0].value);
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);

  return (
    <GraphWidget
      title={`${party} sentiment`}
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
        />
      }
    >
      <PartyScatterPlotGraph
        category={category}
        dateRange={dateRange}
        party={party}
      />
    </GraphWidget>
  );
};

export default PartySentimentWidget;
