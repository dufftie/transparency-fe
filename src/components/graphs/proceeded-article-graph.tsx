import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';
import BaseGraph from '@/src/components/graphs/base-graph';

interface ProceededArticlesGraphProps {
  dateRange: dayjs.Dayjs[];
}

const ProceededArticlesGraph = ({ dateRange }: ProceededArticlesGraphProps) => {
  const [startDate, endDate] = dateRange;
  const fetchUrl = `http://127.0.0.1:8000/sentiments/category/${category}/?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`;

  const processData = (data: any[]) =>
    data.map(entry => ({
      ...entry,
      date: dayjs(entry.date).format('MMM YY'),
      non_analyzed_articles: entry.articles_count - entry.analysed_count,
    }));

  return (
    <BaseGraph graphName="proceed-article-graph" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => (
        <BarChart data={data} margin={{ left: 0, right: 20, top: 30, bottom: 0 }}>
          <Tooltip
            formatter={(value, name) => {
              const labelMap = {
                non_analyzed_articles: 'Not analyzed articles',
                analysed_count: 'Analysed articles',
              };
              return [value, labelMap[name] || name];
            }}
          />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Bar dataKey="analysed_count" fill="blue" stackId="a" />
          <Bar dataKey="non_analyzed_articles" fill="gray" stackId="a" />
        </BarChart>
      )}
    </BaseGraph>
  );
};

export default ProceededArticlesGraph;
