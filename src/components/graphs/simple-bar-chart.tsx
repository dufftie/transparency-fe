'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import BaseGraph from '@/src/components/graphs/base-graph';
import useIsMobile from '@/src/lib/hooks/isMobile';
import { useDateRange } from '@/src/contexts/date-range-context';

interface SimpleBarChartProps {
  media_id: string;
}

const buildUrl = ({
  media_id,
  startDate,
  endDate,
}: {
  media_id: string;
  startDate: string;
  endDate: string;
}) => {
  const params = new URLSearchParams();
  if (media_id) params.append('media_id', media_id);
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  return `sentiments/summary/?${params.toString()}`;
};

const SimpleBarChart = ({ media_id }: SimpleBarChartProps) => {
  const isMobile = useIsMobile();
  const { formattedRequestDateRange } = useDateRange();
  const [startDate, endDate] = formattedRequestDateRange;
  const fetchUrl = buildUrl({ media_id, startDate, endDate });

  // Process the data for bar chart
  const processData = (data: any) => {
    // Create an array with all possible values from 0 to 10
    const allValues = Array.from({ length: 11 }, (_, i) => i.toString());
    
    // Map the data to include all values, defaulting to 0 for missing ones
    return allValues.map(key => ({
      key,
      value: Number(data[key] || 0)
    }));
  };

  return (
    <BaseGraph graphName="simple-bar-chart" fetchUrl={fetchUrl} processData={processData}>
      {(data, loading) => {
        return (
          <BarChart
            data={data}
            layout={isMobile ? 'vertical' : 'horizontal'}
            className="simple-bar-chart__wrapper"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={isMobile} horizontal={!isMobile} />

            <Bar
              dataKey="value"
              fill="#EBEBEB"
              minPointSize={30}
              opacity={0.5}
            >
              <LabelList
                dataKey="value"
                position="insideTop"
                offset={10}
                style={{
                  fill: '#000000',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              />
            </Bar>

            {isMobile ? (
              <YAxis
                dataKey="key"
                type="category"
                axisLine={false}
                tickLine={false}
                width={80}
                fontSize={10}
                textAnchor='end'
                orientation='right'
                mirror
              />
            ) : (
              <XAxis
                dataKey="key"
                axisLine={false}
                tickLine={false}
                interval={0}
                fontSize={10}
                domain={[0, 10]}
              />
            )}

            {isMobile ? (
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tickCount={6}
                fontSize={10}
                domain={[0, 10]}
              />
            ) : (
              <YAxis
                type="number"
                axisLine={false}
                tickLine={false}
                width={30}
                fontSize={10}
                domain={[0, 10]}
                scale='linear'
              />
            )}
          </BarChart>
        );
      }}
    </BaseGraph>
  );
};

export default SimpleBarChart; 