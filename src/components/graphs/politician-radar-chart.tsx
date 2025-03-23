'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import useIsMobile from '@/src/lib/hooks/isMobile';

interface PoliticianSentimentData {
  name: string;
  score: number;
  explanation: string;
}

interface PoliticianRadarChartProps {
  politicians: PoliticianSentimentData[];
  className?: string;
}

const PoliticianRadarChart = ({ politicians }: PoliticianRadarChartProps) => {
  const processData = () => {
    if (!politicians || politicians.length === 0) return [];

    return politicians.map(politician => ({
      subject: politician.name,
      score: politician.score,
      fullMark: 10,
      explanation: politician.explanation
    }));
  };

  const data = processData();

  if (data.length === 0) {
    return (
      <div className="politician-radar-chart">No politician sentiment data available</div>
    );
  }

  return (
    <div className="politician-radar-chart">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tickCount={10} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'score') {
                return [`${value}`, 'Score'];
              }
              return [value, name];
            }}
          />
          <Radar
            name="Sentiment"
            dataKey="score"
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PoliticianRadarChart;