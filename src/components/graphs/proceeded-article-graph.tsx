import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import map from 'lodash/map';

interface ProceededArticlesGraphProps {
  category: string;
  dateRange: dayjs[];
}

const ProceededArticlesGraph = ({ category, dateRange }: ProceededArticlesGraphProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const [startDate, endDate] = dateRange;
    const start_date = startDate.format('YYYY-MM-DD');
    const end_date = endDate.format('YYYY-MM-DD');

    const url = `http://127.0.0.1:8000/sentiments/category/${ category }/?start_date=${ start_date }&end_date=${ end_date }`;

    fetch(url)
    .then(response => response.json())
    .then(setData)
    .catch(console.error);
  }, [category, dateRange]);

  const processData = (data) => {
    return map(data, entry => (
      {
        ...entry,
        date: dayjs(entry.date).format('MMM YY'),
        non_analyzed_articles: entry.articles_count - entry.analysed_count,
      }
    ));
  };

  return (
    <div className="graph proceed-article-graph">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ processData(data) } margin={ { left: 0, right: 20, top: 30, bottom: 0 } }>
          <text x="50%" y="20" textAnchor="middle" fontSize="12px" fontWeight="bold">
            { `Chart of processed articles for '${ category }' category` }
          </text>
          <Tooltip formatter={ (value, name) => {
            const labelMap = {
              non_analyzed_articles: 'Not analyzed articles',
              analysed_count: 'Analysed articles',
            };
            return [value, labelMap[name] || name];
          } } />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Bar dataKey="analysed_count" fill="blue" stackId="a" />
          <Bar dataKey="non_analyzed_articles" fill="gray" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProceededArticlesGraph;