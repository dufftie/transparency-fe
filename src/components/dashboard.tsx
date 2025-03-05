'use client';

import ProceededArticlesGraph from '@/src/components/graphs/proceeded-article-graph';
import React, { useState } from 'react';
import { Checkbox, Select, DatePicker } from 'antd';
import map from 'lodash/map';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const partiesList = [
  {
    label: 'Eesti Keskerakond',
    value: 'Eesti Keskerakond',
    color: 'green',
  },
  {
    label: 'Eest Reformierakond',
    value: 'Eest Reformierakond',
    color: 'darkyellow',
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

const PartiesSelect = ({ selectedParties, handleChange }: {
  selectedParties: string[],
  handleChange: (party: string) => void
}) => {
  return (
    <div style={ { display: 'grid' } }>
      { map(partiesList, (party) => (
        <Checkbox
          key={ party.value }
          checked={ selectedParties.includes(party.value) }
          onChange={ () => handleChange(party.value) }
        >
          { party.label }
        </Checkbox>
      )) }
    </div>
  );
};


const categories = [
  { value: 'Мнение', label: 'Мнение' },
  { value: 'Эстония', label: 'Эстония' },
];

const Dashboard = (): React.ReactNode => {
  const [category, setCategory] = useState('Мнение');
  const [parties, setParties] = useState<string[]>(map(partiesList, party => party.value));
  const [dateRange, setDateRange] = useState([dayjs('2025-02-21', 'YYYY-MM-DD'), dayjs('2025-03-01', 'YYYY-MM-DD')]);

  const handlePartySelect = (party: string) => {
    setParties((prevParties) =>
      prevParties.includes(party)
        ? prevParties.filter((selectedParty) => selectedParty !== party)
        : [...prevParties, party],
    );
  };

  const handleDateRangeChange = (dates: any) => {
    setDateRange(dates);
  };

  return (
    <div className="dashboard">
      <div className="dashboard--settings">
        <div style={ { display: 'flex' } }>
          <Select
            options={ categories }
            defaultValue={ category }
            onChange={ setCategory }
          />
          <RangePicker
            picker="week"
            value={ dateRange } // Bind the selected date range
            onCalendarChange={ handleDateRangeChange } // Update state on date change
            defaultValue={ [dayjs('2022-01-01', 'YYYY-MM-DD'), dayjs('2025-03-01', 'YYYY-MM-DD')] }
          />
        </div>
        <PartiesSelect selectedParties={ parties } handleChange={ handlePartySelect } />
      </div>
      <ProceededArticlesGraph category={ category } dateRange={dateRange} />
    </div>
  );
};

export default Dashboard;
