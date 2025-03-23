import { Select } from 'antd';
import React from 'react';
import map from 'lodash/map';
import { SentimentData } from '@/src/types/article';
import dayjs from 'dayjs';

interface ModelSelectProps {
  selectedSentiment: SentimentData;
  sentiments: SentimentData[];
  onModelChange?: (sentiment: SentimentData) => void;
}

const ModelSelect = (props: ModelSelectProps) => {
  const { selectedSentiment, sentiments, onModelChange } = props;

  console.log({ selectedSentiment });
  const sentimentOptions = map(sentiments, sentiment => ({
    label: sentiment.model,
    value: sentiment.id,
  }));

  const handleChange = (value: number) => {
    if (onModelChange) {
      const newSentiment = sentiments.find(s => s.id === value);
      if (newSentiment) {
        onModelChange(newSentiment);
      }
    }
  };

  return (
    <div className="model-select">
      <span className="model-select__input">
        Analysed by:
        <Select
          size="small"
          value={selectedSentiment.id}
          options={sentimentOptions}
          onChange={handleChange}
        />
      </span>
      <span className="model-select__date">
        Analysed on – {dayjs(selectedSentiment.analysed_at).format('DD MMMM YYYY, HH:mm:ss')}
      </span>
    </div>
  );
};

export default ModelSelect;
