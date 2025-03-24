import React from 'react';
import map from 'lodash/map';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
import PoliticianBarChart from '@/src/components/graphs/politician-bar-chart';
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

  const renderChart = () => {
    if (title === 'Politicians') {
      return <PoliticianBarChart politicians={data} />;
    }
    return <ArticlePartySentimentBarchart parties={data} />;
  };

  return (
    <div className="analysis-table">
      <div style={{ display: 'grid', gap: 30 }}>
        <h2>{title}</h2>
        {!isEmpty ? (
          renderChart()
        ) : (
          <p className="analysis-table__note">No {title} found in the article</p>
        )}
      </div>
      {!isEmpty && <Collapse items={collapseItems} bordered={false} />}
    </div>
  );
};

export default AnalysisTable;
