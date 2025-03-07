'use client';

import React from 'react';
import { Form, Select, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

/**
 * Reusable settings component for graph widgets
 * Can be configured to show/hide different settings options
 */
const GraphSettings = ({
  party,
  partyOptions = null,
  category,
  categoryOptions = null,
  dateRange,
  onPartyChange,
  onCategoryChange,
  onDateRangeChange,
}) => {
  return (
    <Form layout="vertical" className="graph-settings">
      {partyOptions && (
        <Form.Item label="Party">
          <Select
            options={partyOptions}
            value={party}
            onChange={onPartyChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {categoryOptions && (
        <Form.Item label="Category">
          <Select
            options={categoryOptions}
            value={category}
            onChange={onCategoryChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {dateRange && (
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
