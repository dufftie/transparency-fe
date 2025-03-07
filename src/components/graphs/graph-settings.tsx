'use client';

import React from 'react';
import { Form, Select, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

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

      {/* Multi-party selector */}
      {multiPartyOptions && onSelectedPartiesChange && (
        <Form.Item label="Select Parties">
          <Select
            mode="multiple"
            options={multiPartyOptions}
            value={selectedParties}
            onChange={onSelectedPartiesChange}
            style={{ width: '100%' }}
            placeholder="Select parties to display"
            allowClear
            maxTagCount={3}
          />
        </Form.Item>
      )}

      {/* Category selector */}
      {categoryOptions && onCategoryChange && (
        <Form.Item label="Category">
          <Select
            options={categoryOptions}
            value={category}
            onChange={onCategoryChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

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
      
      {/* Sort selector */}
      {sortOptions && onSortChange && (
        <Form.Item label="Sort By">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default GraphSettings;
