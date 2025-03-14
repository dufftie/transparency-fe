import { useDataFetching } from '@/src/lib/utils/data-fetching';
import { JSX } from 'react';

interface BaseTooltipProps {
  fetchUrl?: string;
  processData: (data: any[]) => any[];
  children: (data: any[]) => JSX.Element;
}

const BaseTooltip = ({ fetchUrl, processData, children, autoFetch = false }: BaseTooltipProps) => {
  const { data, loading } = useDataFetching({
    fetchUrl,
    processData,
  });

  // if (loading) return <>LOADING</>

  return (
    <div className='tooltip'>
      {children(data)}
    </div>
  );
};

export default BaseTooltip;
