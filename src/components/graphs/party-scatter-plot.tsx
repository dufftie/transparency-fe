import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph from '@/src/components/graphs/base-grap';
import partiesList from '@/src/lib/dictionaries/partiesList';

interface PartyScatterPlotGraphProps {
  category: string;
  dateRange: dayjs.Dayjs[];
  party: string;
}

const PartyScatterPlotGraph = ({ category, dateRange, party }: PartyScatterPlotGraphProps) => {
  const [startDate, endDate] = dateRange;
  const fetchUrl = `http://127.0.0.1:8000/sentiments/parties/mentions/?category=${ category }&start_date=${ startDate.format('YYYY-MM-DD') }&end_date=${ endDate.format('YYYY-MM-DD') }&parties=${ party }`;

  const processData = (data: any[]) => {
    const timeline = [];
    let currentDate = startDate.clone();

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      timeline.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }

    return timeline.map((date) => {
      const entry = data.find((d) => d.party === party && d.date === date);
      return { date, sentiment_score: entry ? entry.sentiment_score : null };
    });
  };

  const partyColor = partiesList.find((p) => p.value === party)?.color || 'gray';

  return (
    <BaseGraph graphName="party-scatter-plot-graph" fetchUrl={ fetchUrl } processData={ processData }>
      { (data, loading) => (
        <ScatterChart margin={ { left: 0, right: 0, top: 0, bottom: 0 } }>
          <text x="50%" y="20" textAnchor="middle" fontSize="12px" fontWeight="bold">
            { `Sentiment Scatter Plot for '${ party }'` }
          </text>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            name="Date"
            type="category"
            allowDuplicatedCategory={ false }
            tickFormatter={ (tick) => dayjs(tick).format('MMM D, YYYY') }
          />
          <YAxis dataKey="sentiment_score" name="Sentiment Score" domain={ [0, 10] } />
          <Tooltip cursor={ { strokeDasharray: '3 3' } } />
          <Legend />
          <Scatter name={ party } data={ data } fill={ partyColor } shape="circle" />
        </ScatterChart>
      ) }
    </BaseGraph>
  );
};

export default PartyScatterPlotGraph;