'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Select, DatePicker, Spin } from 'antd';
import dayjs from 'dayjs';

// Dynamically import graphs (Lazy Load)
const ProceededArticlesGraph = dynamic(
  () => import('@/src/components/graphs/proceeded-article-graph'),
  { ssr: false }
);
const CompareScatterPlot = dynamic(() => import('@/src/components/graphs/compare-scatter-plot'), {
  ssr: false,
});

const { RangePicker } = DatePicker;

const categories = [
  { value: 'Мнение', label: 'Мнение' },
  { value: 'Эстония', label: 'Эстония' },
];

const Dashboard = (): React.ReactNode => {
  const [category, setCategory] = useState('Мнение');
  const [dateRange, setDateRange] = useState([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  return (
    <div className="dashboard">
      <div className="dashboard--settings">
        <Select
          options={categories}
          defaultValue={category}
          onChange={setCategory}
          style={{ width: '100%' }}
        />
        <RangePicker
          picker="week"
          value={dateRange}
          onCalendarChange={handleDateRangeChange}
          defaultValue={dateRange}
        />
      </div>

      {/* Async Loaded Graphs */}
      <Suspense fallback={<Spin size="large" />}>
        <ProceededArticlesGraph category={category} dateRange={dateRange} />
      </Suspense>

      <Suspense fallback={<Spin size="large" />}>
        <CompareScatterPlot category={category} dateRange={dateRange} />
      </Suspense>
    </div>
  );
};

export default Dashboard;
