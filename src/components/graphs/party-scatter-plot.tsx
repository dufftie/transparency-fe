import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph from '@/src/components/graphs/base-graph';
import partiesList from '@/src/lib/dictionaries/partiesList';

interface PartyScatterPlotGraphProps {
  category: string;
  dateRange: dayjs.Dayjs[];
  party: string;
}

const buildUrl = ({
  category,
  startDate,
  endDate,
  party,
}: {
  category: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  party: string;
}) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (startDate) params.append('start_date', startDate.format('YYYY-MM-DD'));
  if (endDate) params.append('end_date', endDate.format('YYYY-MM-DD'));
  if (party) params.append('parties', party);

  return `sentiments/parties/mentions/?${params.toString()}`;
};

const PartyScatterPlotGraph = ({ category, dateRange, party }: PartyScatterPlotGraphProps) => {
  const [startDate, endDate] = dateRange;
  const fetchUrl = buildUrl({ category, startDate, endDate, party });

  const processData = (data: any[]) => {
    const timeline = [];
    let currentDate = startDate.clone();

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      timeline.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }

    return timeline.map(date => {
      const entry = data.find(d => d.party === party && d.date === date);
      return { date, sentiment_score: entry ? entry.sentiment_score : null };
    });
  };

  const partyColor = partiesList.find(p => p.value === party)?.color || 'gray';

  return (
    <BaseGraph graphName="party-scatter-plot-graph" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => (
        <ScatterChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <XAxis
            dataKey="date"
            name="Date"
            type="category"
            tickFormatter={tick => dayjs(tick).format('MMM YY')}
          />

          <YAxis
            dataKey="sentiment_score"
            name="Sentiment Score"
            domain={[0, 10]}
            tickCount={10}
            scale="linear"
          />

          <Scatter name={party} data={data} fill={partyColor} shape="circle" />

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <Legend />
        </ScatterChart>
      )}
    </BaseGraph>
  );
};

export default PartyScatterPlotGraph;
