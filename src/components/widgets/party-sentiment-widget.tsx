import PartyScatterPlotGraph from '@/src/components/graphs/party-scatter-plot';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { useState } from 'react';
import partiesList from '@/src/lib/dictionaries/partiesList';
import PartySelect from '@/src/components/party-select';

interface PartySentimentWidgetProps {
  media_id: string;
}

const PartySentimentWidget = ({ media_id }: PartySentimentWidgetProps) => {
  const [party, setParty] = useState(partiesList[0].value);

  return (
    <GraphWidget
      title='Scatter plot of all sentiments per party'
      description='This scatter plot visualizes party sentiments, with each clickable dot representing a specific article.'
      extra={<PartySelect value={party} onChange={setParty} />}
    >
      <PartyScatterPlotGraph media_id={media_id} party={party} />
    </GraphWidget>
  );
};

export default PartySentimentWidget;
