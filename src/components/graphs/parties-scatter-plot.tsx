import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { partiesList } from '@/src/components/dashboard';

interface PartyScatterPlotGraphProps {
  category: string;
  dateRange: dayjs.Dayjs[];
  party: string;
}

const PartyScatterPlotGraph = ({ category, dateRange, party }: PartyScatterPlotGraphProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    debounce(async () => {
      if (!category || !party || dateRange.length !== 2) return;

      setLoading(true);
      const [startDate, endDate] = dateRange;
      const url = new URL('http://127.0.0.1:8000/sentiments/parties/mentions/');
      const params = new URLSearchParams({
        category,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD'),
      });
      params.append('parties', party);
      url.search = params.toString();

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [category, dateRange, party]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateCompleteTimeline = useCallback(() => {
    const [startDate, endDate] = dateRange;
    const allDates = [];
    let currentDate = startDate.clone();

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      allDates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    return allDates;
  }, [dateRange]);

  const processedData = useMemo(() => {
    const timeline = generateCompleteTimeline();
    return timeline.map((date) => {
      const entry = data?.find((d) => d.party === party && d.date === date);
      return { date, sentiment_score: entry ? entry.sentiment_score : null };
    });
  }, [data, party, generateCompleteTimeline]);

  const getPartyColor = (partyName: string) => {
    return partiesList.find((p) => p.value === partyName)?.color || 'gray';
  };

  const partyColor = useMemo(() => getPartyColor(party), [party]);

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
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter
            name={party}
            data={processedData}
            fill={partyColor}
            shape="circle"
            isPure
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(PartyScatterPlotGraph);