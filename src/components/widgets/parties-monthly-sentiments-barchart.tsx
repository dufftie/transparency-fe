'use client';

import StackedBarChart from '@/src/components/graphs/stacked-bar-chart';
import GraphWidget from '@/src/components/graphs/graph-widget';
import { useState } from 'react';
import partiesList from '@/src/lib/dictionaries/partiesList';
import map from 'lodash/map';
import { DateRangeProvider } from '@/src/contexts/date-range-context';
import { Select, Checkbox, Space, Form } from 'antd';

const { Group: CheckboxGroup } = Checkbox;

// Party selection options
const partyOptions = partiesList.map(party => ({
  value: party.value,
  label: party.label,
}));

// Sort options
const sortOptions = [
  { value: 'name', label: 'Sort by Name' },
  { value: 'total', label: 'Total Mentions (High to Low)' },
  { value: 'positive', label: 'Most Positive' },
  { value: 'negative', label: 'Most Negative' },
];

interface PartiesMonthlySentimentsBarchartProps {
  media_id: string;
}

const PartiesMonthlySentimentsBarchart = ({ media_id }: PartiesMonthlySentimentsBarchartProps) => {
  // State for sorting and party filtering
  const [sortBy, setSortBy] = useState<'name' | 'total' | 'positive' | 'negative'>('name'); // Default sort by name
  const [selectedParties, setSelectedParties] = useState<string[]>(
    map(partiesList, party => party.value)
  );
  
  // State for sentiment visibility
  const [visibleSentiments, setVisibleSentiments] = useState<string[]>([
    'positive', 'neutral', 'negative'
  ]);

  return (
    <DateRangeProvider>
      <GraphWidget
        title="Sentiment Distribution by Party"
        description="This chart shows the distribution of sentiment for each party"
        // extra={
        //   <Form layout="vertical" className="graph-settings">
        //     {/* Sort By */}
        //     <Form.Item label="Sort By">
        //       <Select
        //         options={sortOptions}
        //         value={sortBy}
        //         onChange={setSortBy}
        //         style={{ width: '100%' }}
        //       />
        //     </Form.Item>

        //     {/* Multi-party selector with checkboxes */}
        //     <Form.Item label="Select Parties">
        //       <div className="graph-settings__party-checkboxes">
        //         <CheckboxGroup
        //           options={partyOptions}
        //           value={selectedParties}
        //           onChange={values => {
        //             // Ensure at least one party is always selected
        //             const newValues = values.length > 0 ? values : [partyOptions[0].value];
        //             setSelectedParties(newValues);
        //           }}
        //         />
        //       </div>
        //     </Form.Item>

        //     {/* Sentiment visibility */}
        //     <Form.Item>
        //       <CheckboxGroup
        //         options={[
        //           { label: 'Positive', value: 'positive' },
        //           { label: 'Neutral', value: 'neutral' },
        //           { label: 'Negative', value: 'negative' },
        //         ]}
        //         value={visibleSentiments}
        //         onChange={values => {
        //           // Ensure at least one sentiment is always selected
        //           const newValues = values.length > 0 ? values : ['positive'];
        //           setVisibleSentiments(newValues);
        //         }}
        //       />
        //     </Form.Item>
        //   </Form>
        // }
      >
        <StackedBarChart
          media_id={media_id}
          showParties={selectedParties}
          positiveThreshold={7}
          negativeThreshold={3}
          sortBy={sortBy}
          visibleSentiments={visibleSentiments}
        />
      </GraphWidget>
    </DateRangeProvider>
  );
};

export default PartiesMonthlySentimentsBarchart;
