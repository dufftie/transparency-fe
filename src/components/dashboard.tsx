'use client';

import ProceededArticlesGraph from '@/src/components/graphs/proceeded-article-graph';
import React, { useState } from 'react';
import { Select } from 'antd';

const Dashboard = (): React.ReactNode => {
  const [category, setCategory] = useState('Мнение');

  return (
    <div className="dashboard">
      <div className="dashboard--settings">
        <Select
          options={[{ value: 'Мнение', label: 'Мнение' }]}
          defaultValue={category}
          onChange={setCategory}
        />
      </div>
      <ProceededArticlesGraph category={category} />
    </div>
  );
};

export default Dashboard;
