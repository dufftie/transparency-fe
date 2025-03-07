import GraphSettings from '@/src/components/graphs/graph-settings';
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

const PartiesMonthlySentimentsBarchart = () => {
  const [barChartCategory, setBarChartCategory] = useState('');
  const [barChartDateRange, setBarChartDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);

  return (
    <GraphWidget
      title="Sentiment Distribution by Party"
      settings={
        <GraphSettings
          category={barChartCategory}
          dateRange={barChartDateRange}
          categoryOptions={categoryOptions}
          onCategoryChange={setBarChartCategory}
          onDateRangeChange={setBarChartDateRange}
        />
      }
    >
      <StackedBarChart
        category={barChartCategory}
        dateRange={barChartDateRange}
        showParties={map(partiesList, party => party.value)}
        positiveThreshold={7}
        negativeThreshold={3}
      />
    </GraphWidget>
  );
};

export default PartiesMonthlySentimentsBarchart;
