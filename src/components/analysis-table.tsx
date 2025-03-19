import React from 'react';
import map from 'lodash/map';
import keys from 'lodash/keys';
import ArticlePartySentimentBarchart from '@/src/components/graphs/article-party-sentiment-barchart';
import { Empty } from 'antd';

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

  if (!data) return <Empty description={`${title} are not present in this article`} />

  return (
    <div className="analysis-table">
      <span className="analysis-table__title"> {title}</span>
      <table className="analysis-table">
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
      <ArticlePartySentimentBarchart parties={data} />
    </div>
  );
};

export default AnalysisTable;
