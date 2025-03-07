'use client';

import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { ResponsiveContainer } from 'recharts';
import { Spin } from 'antd';
import { fetchData } from '@/src/lib/services/api';

interface BaseGraphProps {
  graphName?: string;
  fetchUrl: string;
  processData: (data: any[]) => any[];
  children: (data: any[], loading: boolean) => JSX.Element;
}

const BaseGraph = ({ fetchUrl, processData, children, graphName }: BaseGraphProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(
    debounce(async () => {
      if (!fetchUrl) return;

      setLoading(true);
      try {
        // Normalize the endpoint
        const endpoint = fetchUrl.startsWith('http')
          ? fetchUrl
          : fetchUrl.startsWith('/') ? fetchUrl : `/${ fetchUrl }`;

        const result = await fetchData<any[]>(endpoint);
        setData(Array.isArray(result) ? processData(result) : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [fetchUrl, processData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={ classNames('graph', graphName) }>
      { loading && (
        <div className="graph-loading-spinner">
          <Spin size="large" />
        </div>
      ) }
      <ResponsiveContainer width="100%" height="100%">
        { children(data, loading) }
      </ResponsiveContainer>
    </div>
  );
};

export default BaseGraph;