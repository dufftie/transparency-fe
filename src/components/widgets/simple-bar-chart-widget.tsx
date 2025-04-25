'use client';

import SimpleBarChart from '@/src/components/graphs/simple-bar-chart';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { DateRangeProvider } from '@/src/contexts/date-range-context';

interface SimpleBarChartWidgetProps {
  media_id: string;
  title?: string;
  description?: string;
}

const SimpleBarChartWidget = ({ 
  media_id,
  title = "Sentiment Distribution",
  description = "This chart shows the distribution of sentiment scores"
}: SimpleBarChartWidgetProps) => {
  return (
    <DateRangeProvider>
      <GraphWidget
        title={title}
        description={description}
      >
        <SimpleBarChart media_id={media_id} />
      </GraphWidget>
    </DateRangeProvider>
  );
};

export default SimpleBarChartWidget; 