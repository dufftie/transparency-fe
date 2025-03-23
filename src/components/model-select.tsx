import { Select } from 'antd';
import React from 'react';
import map from 'lodash/map';
import { SentimentData } from '@/src/types/article';

interface ModelSelectProps {
  selectedSentiment: SentimentData['id'];
  sentiments: SentimentData[];
}

const ModelSelect = (props: ModelSelectProps) => {
  const { selectedSentiment, sentiments } = props;

  const sentimentOptions = map(sentiments, sentiment => ({
    label: sentiment.model,
    value: sentiment.id
  }));

  return (
    <div className="model-select">
      Analysed by:
      <Select size="small" defaultValue={selectedSentiment} options={sentimentOptions} />
    </div>
  );
};

export default ModelSelect;
