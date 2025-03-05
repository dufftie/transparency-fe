import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { partiesList } from '@/src/components/dashboard';

interface PartyScatterPlotGraphProps {
  category: string;
  dateRange: dayjs.Dayjs[];
  party: string;
}

const PartyScatterPlotGraph = ({ category, dateRange, party }: PartyScatterPlotGraphProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const [startDate, endDate] = dateRange;
    const start_date = startDate.format('YYYY-MM-DD');
    const end_date = endDate.format('YYYY-MM-DD');

    const url = new URL('http://127.0.0.1:8000/sentiments/parties/mentions/');
    const params = new URLSearchParams();

    params.set('category', category);
    params.set('start_date', start_date);
    params.set('end_date', end_date);
    params.append('parties', party);

    url.search = params.toString();

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      setData(Array.isArray(result) ? result : []);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setData([]);
    });
  }, [category, dateRange, party]);

  const generateCompleteTimeline = () => {
    const [startDate, endDate] = dateRange;
    const allDates = [];
    let currentDate = startDate.clone();

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      allDates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    return allDates;
  };

  const processData = () => {
    const timeline = generateCompleteTimeline();
    const safeData = Array.isArray(data) ? data : []; // Ensure data is an array

    return timeline.map(date => {
      const entry = safeData.find(d => d.party === party && d.date === date);
      return entry ? { date, sentiment_score: entry.sentiment_score } : { date, sentiment_score: null };
    });
  };

  const getColorForParty = (partyName: string) => {
    const partyData = partiesList.find(p => p.value === partyName);
    return partyData ? partyData.color : 'gray';
  };

  const processedData = processData();
  const partyColor = getColorForParty(party);

  return (
    <div className="graph party-scatter-plot-graph">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ left: 0, right: 20, top: 30, bottom: 30 }}>
          <text x="50%" y="20" textAnchor="middle" fontSize="12px" fontWeight="bold">
            {`Sentiment Scatter Plot for '${party}'`}
          </text>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            name="Date"
            type="category"
            allowDuplicatedCategory={false}
            tickFormatter={(tick) => dayjs(tick).format('MMM D, YYYY')}
          />
          <YAxis
            dataKey="sentiment_score"
            name="Sentiment Score"
            domain={[0, 10]}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => {
              const labelMap = {
                sentiment_score: 'Sentiment Score',
              };
              return [value, labelMap[name] || name];
            }}
          />
          <Legend />
          <Scatter name={party} data={processedData} fill={partyColor} shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartyScatterPlotGraph;