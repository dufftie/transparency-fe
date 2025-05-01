'use client';

import classNames from 'classnames';
import { ResponsiveContainer } from 'recharts';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDataFetching } from '@/src/lib/utils/data-fetching';

export interface BaseGraphProps {
  graphName?: string;
  fetchUrl: string;
  processData: (data: any[]) => any[];
  children: (data: any[], loading: boolean) => JSX.Element;
  autoFetch?: boolean;
}

const BaseGraph = ({ fetchUrl, processData, children, graphName }: BaseGraphProps) => {
  const { data, loading, showSpinner } = useDataFetching({
    fetchUrl,
    processData,
  });

  return (
    <div className={classNames('graph', graphName, { loading: loading })}>
      <div className={classNames('graph__loading-spinner', { active: showSpinner })}>
        <Spin
          size="large"
          indicator={<LoadingOutlined spin />}
          className={classNames({ active: showSpinner })}
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {children(data, loading)}
      </ResponsiveContainer>
    </div>
  );
};

export default BaseGraph;
