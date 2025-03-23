'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer, LabelList,
} from 'recharts';
import partiesList from '@/src/lib/dictionaries/partiesList';
import useIsMobile from '@/src/lib/hooks/isMobile';

interface ArticlePartySentimentData {
  name: string;
  score: number;
  explanation: string;
}

interface ArticlePartySentimentBarchartProps {
  parties: ArticlePartySentimentData[];
  className?: string;
}

const ArticlePartySentimentBarchart = ({ parties }: ArticlePartySentimentBarchartProps) => {
  const processData = () => {
    if (!parties || parties.length === 0) return [];

    return parties.map(party => {
      const partyInfo = partiesList.find(p => p.value === party.name);

      return {
        party: party.name,
        partyLabel: partyInfo?.label || party.name,
        score: party.score,
        explanation: party.explanation,
        color: partyInfo?.color || '#8FCC7E',
      };
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="graph-tooltip">
          <p className="graph-tooltip__name">{data.partyLabel}</p>
          <p className="graph-tooltip__score">Score: {data.score}</p>
          <p className="graph-tooltip__explanation">{data.explanation}</p>
        </div>
      );
    }
    return null;
  };

  const data = processData();

  if (data.length === 0) {
    return (
      <div className="article-party-sentiment-barchart">No party sentiment data available</div>
    );
  }

  return (
    <div className="article-party-sentiment-barchart">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="partyLabel"
            type="category"
            axisLine={false}
            tickLine={false}
            fontSize={10}
          />

          <YAxis
            type="number"
            domain={[0, 10]}
            tickCount={11}
            axisLine={false}
            tickLine={false}
            width={20}
          />

          <Bar dataKey="score" maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="score"
              position="insideBottom"
              fill="white"
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArticlePartySentimentBarchart;
