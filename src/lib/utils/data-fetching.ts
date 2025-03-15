import { useCallback, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { fetchData } from '@/src/lib/services/api';

export interface UseDataFetchingProps {
  fetchUrl?: string;
  processData: (data: any[]) => any[];
  debounceTime?: number;
}

export interface UseDataFetchingResult {
  data: any[];
  loading: boolean;
  showSpinner: boolean;
  loadData: () => void;
}

export const useDataFetching = ({
  fetchUrl,
  processData,
  debounceTime = 300,
}: UseDataFetchingProps): UseDataFetchingResult => {
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
        const endpoint = formatEndpoint(fetchUrl);
        const result = await fetchData<any[]>(endpoint);
        setData(processData(result));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, debounceTime),
    [fetchUrl, processData, debounceTime]
  );

  useEffect(() => {
    if (fetchUrl) {
      loadData();
    }
  }, [loadData, fetchUrl]);

  return { data, loading, showSpinner, loadData };
};

export const formatEndpoint = (url: string): string => {
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
};
