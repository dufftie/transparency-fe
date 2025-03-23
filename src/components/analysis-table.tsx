import React from 'react';
import map from 'lodash/map';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
import PoliticianRadarChart from '@/src/components/graphs/politician-radar-chart';
import { Collapse, Empty } from 'antd';

interface AnalysisDataProps {
  name: string;
  explanation: string;
  score: number;
}

interface AnalysisTableProps {
  title: string;
  data: AnalysisDataProps[];
}

const AnalysisTable = (props: AnalysisTableProps) => {
  const { data, title } = props;

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
                <td>{item.name}</td>
                <td>{item.explanation}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  const renderChart = () => {
    if (title === 'Politicians' && data.length > 4) {
      return <PoliticianRadarChart politicians={data} />;
    }
    return <ArticlePartySentimentBarchart parties={data} />;
  };

  return (
    <div className="analysis-table">
      <div style={{ display: 'grid', gap: 30 }}>
        <h2>{title}</h2>
        {!isEmpty && renderChart()}
        {isEmpty && `No ${title} found in the article`}
      </div>
      {!isEmpty && <Collapse items={collapseItems} bordered={false} />}
    </div>
  );
};

export default AnalysisTable;
