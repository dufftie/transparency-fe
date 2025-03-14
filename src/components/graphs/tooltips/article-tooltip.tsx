import { Descriptions } from 'antd';
import BaseTooltip from '@/src/components/graphs/tooltips/base-tooltip';
import { TooltipProps } from 'recharts';
import isNil from 'lodash/isNil';
import dayjs from 'dayjs';

const ArticleTooltip = (props: TooltipProps<any, any>) => {
  const processData = (article: any) => {
    if (!article) return [];

    return [
      {
        label: 'Title',
        children: article.title,
      },
      {
        label: 'Date',
        children: dayjs(article.date_time).format("DD MMMM, YYYY (HH:mm)"),
      },
      {
        label: 'Authors',
        children: article.authors,
      },
    ].filter(item => !isNil(item.children));
  };


  const article_id = props?.payload[0]?.payload?.article_id;
  const fetchUrl = article_id ? `/articles/${article_id}` : undefined;

  return (
    <BaseTooltip 
      fetchUrl={fetchUrl}
      processData={processData}
    >
      {(data) => (
        <Descriptions size='small' colon={false} items={data} column={1} layout='vertical' />
      )}
    </BaseTooltip>
  );
};

export default ArticleTooltip;
