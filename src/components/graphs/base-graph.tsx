'use client';

import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { ResponsiveContainer } from 'recharts';
import { Spin } from 'antd';
import { fetchData } from '@/src/lib/services/api';
import { LoadingOutlined } from '@ant-design/icons';

interface BaseGraphProps {
  graphName?: string;
  fetchUrl: string;
  processData: (data: any[]) => any[];
  children: (data: any[], loading: boolean) => JSX.Element;
}

const BaseGraph = ({ fetchUrl, processData, children, graphName }: BaseGraphProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      setShowSpinner(true);
    } else {
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, 300);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  const loadData = useCallback(
    debounce(async () => {
      if (!fetchUrl) return;

      setLoading(true);
      try {
        const endpoint = fetchUrl.startsWith('http')
          ? fetchUrl
          : fetchUrl.startsWith('/') ? fetchUrl : `/${ fetchUrl }`;

        const result = await fetchData<any[]>(endpoint);
        setData(Array.isArray(result) ? processData(result) : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, 1000),
    [fetchUrl, processData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={ classNames('graph', graphName, { 'loading': loading }) }>
      <div className={ classNames('graph-loading-spinner', { 'active': showSpinner }) }>
        <Spin size="large" indicator={ <LoadingOutlined spin /> } className={ classNames({ 'active': showSpinner }) } />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        { children(data, loading) }
      </ResponsiveContainer>
    </div>
  );
};

export default BaseGraph;