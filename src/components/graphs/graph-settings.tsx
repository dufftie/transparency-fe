'use client';

import React from 'react';
import { Form, Select, DatePicker, Checkbox, Space, Divider } from 'antd';

const { RangePicker } = DatePicker;
const { Group: CheckboxGroup } = Checkbox;

// Default sort options that can be used across different graphs
export const defaultSortOptions = [
  { value: 'name', label: 'Sort by Name' },
  { value: 'total', label: 'Total Mentions (High to Low)' },
  { value: 'positive', label: 'Most Positive' },
  { value: 'negative', label: 'Most Negative' },
];

/**
 * Reusable settings component for graph widgets
 * Can be configured to show/hide different settings options
 */
const GraphSettings = ({
  // Single party selection
  party,
  partyOptions = null,
  onPartyChange,
  
  // Multi-party selection
  selectedParties,
  multiPartyOptions = null,
  onSelectedPartiesChange,
  
  // Sentiment visibility
  visibleSentiments,
  onVisibleSentimentsChange,
  
  // Category selection
  category,
  categoryOptions = null,
  onCategoryChange,
  
  // Date range
  dateRange,
  onDateRangeChange,
  
  // Sorting options
  sortBy,
  sortOptions = defaultSortOptions,
  onSortChange,
}) => {
  return (
    <Form layout="vertical" className="graph-settings">
      {/* Single party selector */}
      {partyOptions && onPartyChange && (
        <Form.Item label="Party">
          <Select
            options={partyOptions}
            value={party}
            onChange={onPartyChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {/* Multi-party selector with checkboxes */}
      {multiPartyOptions && onSelectedPartiesChange && (
        <Form.Item label="Select Parties">
          <div className="party-checkboxes">
            <div className="party-checkboxes-header">
              <Checkbox
                indeterminate={selectedParties.length > 0 && selectedParties.length < multiPartyOptions.length}
                checked={selectedParties.length === multiPartyOptions.length}
                onChange={e => {
                  if (e.target.checked) {
                    onSelectedPartiesChange(multiPartyOptions.map(option => option.value));
                  } else {
                    onSelectedPartiesChange([]);
                  }
                }}
              >
                Select All
              </Checkbox>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div className="party-checkboxes-list">
              <CheckboxGroup
                options={multiPartyOptions}
                value={selectedParties}
                onChange={values => {
                  // Ensure at least one party is always selected
                  const newValues = values.length > 0 ? values : [multiPartyOptions[0].value];
                  onSelectedPartiesChange(newValues);
                }}
              />
            </div>
          </div>
        </Form.Item>
      )}
      
      {/* Sentiment visibility */}
      {visibleSentiments && onVisibleSentimentsChange && (
        <Form.Item label="Show Sentiments">
          <CheckboxGroup
            options={[
              { label: 'Positive', value: 'positive' },
              { label: 'Neutral', value: 'neutral' },
              { label: 'Negative', value: 'negative' }
            ]}
            value={visibleSentiments}
            onChange={values => {
              // Ensure at least one sentiment is always selected
              const newValues = values.length > 0 ? values : ['positive'];
              onVisibleSentimentsChange(newValues);
            }}
          />
        </Form.Item>
      )}

      {/* Category and Sort By in same row */}
      <div className="form-row">
        {categoryOptions && onCategoryChange && (
          <Form.Item label="Category" className="form-col">
            <Select
              options={categoryOptions}
              value={category}
              onChange={onCategoryChange}
              style={{ width: '100%' }}
            />
          </Form.Item>
        )}
        
        {sortOptions && onSortChange && (
          <Form.Item label="Sort By" className="form-col">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              style={{ width: '100%' }}
            />
          </Form.Item>
        )}
      </div>

      {/* Date range picker */}
      {dateRange && onDateRangeChange && (
        <Form.Item label="Time period">
          <RangePicker
            picker="week"
            value={dateRange}
            onChange={onDateRangeChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default GraphSettings;
