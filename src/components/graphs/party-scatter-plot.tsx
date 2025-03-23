import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph from '@/src/components/graphs/base-graph';
import partiesList from '@/src/lib/dictionaries/partiesList';
import ArticleTooltip from '@/src/components/graphs/tooltips/article-tooltip';

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
      return {
        date,
        sentiment_score: entry ? entry.sentiment_score : null,
        article_id: entry ? entry.article_id : null,
      };
    });
  };

  const partyColor = partiesList.find(p => p.value === party)?.color || 'gray';

  const openArticle = ({ article_id }: { article_id: string }) => {
    window.open(`/overview/article/${article_id}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <BaseGraph graphName="party-scatter-plot-graph" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => (
        <ScatterChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <XAxis
            dataKey="date"
            name="Date"
            type="category"
            tickFormatter={tick => dayjs(tick).format('DD MMM, YYYY')}
          />

          <YAxis
            dataKey="sentiment_score"
            name="Sentiment Score"
            domain={[0, 10]}
            tickCount={10}
            scale="linear"
            axisLine={false}
            tickLine={false}
            width={30}
          />

          <Scatter
            name={party}
            data={data}
            fill={partyColor}
            shape="circle"
            onClick={openArticle}
          />

          <Tooltip content={<ArticleTooltip />} cursor={{ strokeDasharray: '3 3' }} />

          <CartesianGrid strokeDasharray="2" vertical={false} />
        </ScatterChart>
      )}
    </BaseGraph>
  );
};

export default PartyScatterPlotGraph;
