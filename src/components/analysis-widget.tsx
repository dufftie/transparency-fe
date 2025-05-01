import React from 'react';
import map from 'lodash/map';
import { Collapse, Empty } from 'antd';

interface AnalysisDataProps {
  name: string;
  explanation: string;
  score: number;
}

interface AnalysisTableProps {
  title: string;
  data: AnalysisDataProps[];
  chart: React.ReactNode;
}

const AnalysisTable = (props: AnalysisTableProps) => {
  const { data, title, chart } = props;

  const isEmpty = !data || data.length === 0;

  const collapseItems = [
    {
      key: 'explanation',
      label: 'Explanation',
      children: (
        <table>
          <tbody>
            {map(data, item => (
              <tr key={item.name}>
                <td className="analysis-table__cell">{item.name}</td>
                <td className="analysis-table__cell">{item.explanation}</td>
                <td className="analysis-table__cell">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <div className="analysis-widget">
      <h3>{title}</h3>
      {!isEmpty ? chart : <Empty description="No data found" />}
      {!isEmpty && <Collapse items={collapseItems} bordered={false} />}
    </div>
  );
};

export default AnalysisTable;
