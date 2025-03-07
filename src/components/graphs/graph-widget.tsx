'use client';

import React, { JSX, useState } from 'react';
import PartyScatterPlotGraph from '@/src/components/graphs/party-scatter-plot';
import { DatePicker, Form, Select } from 'antd';
import dayjs from 'dayjs';

const categories = [
  { value: 'Мнение', label: 'Мнение' },
  { value: 'Эстония', label: 'Эстония' },
  // { value: 'Всё', label: null },
];

const { RangePicker } = DatePicker;

const GraphWidget = (props): JSX.Element => {
  const { title } = props;

  const [category, setCategory] = useState('Мнение');
  const [dateRange, setDateRange] = useState([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  return (
    <div className="graph-widget">
      <div className="graph-widget__settings">
        <span className="graph-widget__title">{ title }</span>
        <Form layout="vertical">
          <Form.Item label="Category">
            <Select
              options={ categories }
              defaultValue={ category }
              onChange={ setCategory }
              style={ { width: '100%' } }
            />
          </Form.Item>
          <Form.Item label="Time period">
            <RangePicker
              picker="week"
              value={ dateRange }
              onCalendarChange={ handleDateRangeChange }
              defaultValue={ dateRange }
            />
          </Form.Item>
        </Form>
      </div>
      <div className='graph-widget__content'>
        <PartyScatterPlotGraph category={ category } dateRange={ dateRange } party="Sotsiaaldemokraatlik Erakond" />
      </div>
    </div>
  );
};

export default GraphWidget;