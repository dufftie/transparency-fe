import { Select } from 'antd';
import React from 'react';
import map from 'lodash/map';
import { SentimentData } from '@/src/types/article';

interface ModelSelectProps {
  selectedSentiment: SentimentData['id'];
  sentiments: SentimentData[];
  onModelChange?: (sentimentId: number) => void;
}

const ModelSelect = (props: ModelSelectProps) => {
  const { selectedSentiment, sentiments, onModelChange } = props;

  const sentimentOptions = map(sentiments, sentiment => ({
    label: sentiment.model,
    value: sentiment.id
  }));

  const handleChange = (value: number) => {
    if (onModelChange) {
      onModelChange(value);
    }
  };

  return (
    <div className="model-select">
      Analysed by:
      <Select 
        size="small" 
        value={selectedSentiment} 
        options={sentimentOptions} 
        onChange={handleChange}
      />
    </div>
  );
};

export default ModelSelect;