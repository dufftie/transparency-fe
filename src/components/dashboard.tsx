'use client';

import ProceededArticlesGraph from '@/src/components/graphs/proceeded-article-graph';
import React, { useState } from 'react';
import { Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import CompareScatterPlot from '@/src/components/graphs/compare-scatter-plot';

const { RangePicker } = DatePicker;

export const partiesList = [
  {
    label: 'Eesti Keskerakond',
    value: 'Eesti Keskerakond',
    color: 'green',
  },
  {
    label: 'Eesti Reformierakond',
    value: 'Eesti Reformierakond',
    color: 'gold',
  },
  {
    label: 'Erakond Eesti 200',
    value: 'Erakond Eesti 200',
    color: 'lightblue',
  },
  {
    label: 'Sotsiaaldemokraatlik Erakond',
    value: 'Sotsiaaldemokraatlik Erakond',
    color: 'red',
  },
  {
    label: 'Eesti Konservatiivne Rahvaerakond',
    value: 'Eesti Konservatiivne Rahvaerakond',
    color: 'black',
  },
  {
    label: 'Erakond Parempoolsed',
    value: 'Erakond Parempoolsed',
    color: 'orange',
  },
  {
    label: 'ISAMAA Erakond',
    value: 'ISAMAA Erakond',
    color: 'blue',
  },
];

const categories = [
  { value: 'Мнение', label: 'Мнение' },
  { value: 'Эстония', label: 'Эстония' },
];

const Dashboard = (): React.ReactNode => {
  const [category, setCategory] = useState('Мнение');
  const [dateRange, setDateRange] = useState([dayjs('2024-01-01', 'YYYY-MM-DD'), dayjs('2025-03-01', 'YYYY-MM-DD')]);

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  return (
    <div className="dashboard">
      <div className="dashboard--settings">
        <Select
          options={ categories }
          defaultValue={ category }
          onChange={ setCategory }
          style={ { width: '100%' } }
        />
        <RangePicker
          picker="week"
          value={ dateRange }
          onCalendarChange={ handleDateRangeChange }
          defaultValue={ dateRange }
        />
      </div>
      <ProceededArticlesGraph category={ category } dateRange={ dateRange } />
      <CompareScatterPlot category={category} dateRange={dateRange} />
    </div>
  );
};

export default Dashboard;
