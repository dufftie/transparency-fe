import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { ResponsiveContainer } from 'recharts';

interface BaseGraphProps {
  graphName?: string;
  fetchUrl: string;
  processData: (data: any[]) => any[];
  children: (data: any[], loading: boolean) => JSX.Element;
}

const BaseGraph = ({ fetchUrl, processData, children, graphName }: BaseGraphProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // Track if first fetch is done

  const fetchData = useCallback(
    debounce(async () => {
      if (!fetchUrl) return;

      setLoading(true);
      try {
        const response = await fetch(fetchUrl);
        const result = await response.json();
        setData(Array.isArray(result) ? processData(result) : []);
        setHasFetched(true); // Mark as fetched once we get data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [fetchUrl, processData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={ classNames('graph', graphName) }>
      <ResponsiveContainer width="100%" height="100%">
        { children(data, loading) }
      </ResponsiveContainer>
    </div>
  );
};

export default BaseGraph;