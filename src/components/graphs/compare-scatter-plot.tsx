'use client'

import PartiesScatterPlot from '@/src/components/graphs/party-scatter-plot';
import React, { useState } from 'react';
import map from 'lodash/map';
import { partiesList } from '@/src/components/dashboard';
import { Select } from 'antd';

const CompareScatterPlot = ({ category, dateRange }) => {
  const [parties, setParties] = useState<string[]>(map(partiesList, party => party.value));

  return (
    <div className="compare-scatter-plot">
      <div className="compare-scatter-plot__settings">
        <Select
          options={ partiesList }
          onChange={ setParties }
          defaultValue={ parties }
          mode="tags"
        />
      </div>
      <div className="compare-scatter-plot__graphs">
        { map(parties, (party, index) => (
          <PartiesScatterPlot key={ index } category={ category } dateRange={ dateRange } party={ party } />
        )) }
      </div>
    </div>
  );
};

export default CompareScatterPlot;