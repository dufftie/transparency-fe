import React from 'react';
import map from 'lodash/map';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
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

  if (!data) return <Empty description={`${title} are not present in this article`} />;

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

  return (
    <div className="analysis-table">
      <div style={{ display: 'grid', gap: 30 }}>
        <h2>{title}</h2>
        <ArticlePartySentimentBarchart parties={data} />
      </div>
      <Collapse
        items={collapseItems}
        bordered={false}
      />
    </div>
  );
};

export default AnalysisTable;
