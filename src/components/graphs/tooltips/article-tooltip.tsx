import BaseTooltip from '@/src/components/graphs/tooltips/base-tooltip';
import { TooltipProps } from 'recharts';
import React from 'react';
import ArticlePreview from '@/src/components/article-preview';
import dayjs from 'dayjs';
import { ExportOutlined } from '@ant-design/icons';

const ArticleTooltip = (props: TooltipProps<any, any>) => {
  const processData = (article: any) => {
    return article;
  };

  const article_id = props?.payload[0]?.payload?.article_id;
  const fetchUrl = article_id ? `/articles/${article_id}/tooltip` : undefined;

  return (
    <BaseTooltip fetchUrl={fetchUrl} processData={processData}>
      {article => {
        return (
          <div className='article-tooltip'>
            <ExportOutlined className='article-tooltip__icon' />
            <div className='article-tooltip__authors'>{ article.authors }</div>
            <div className='article-tooltip__title'>{ article.title }</div>
            <ArticlePreview preview_url={article.preview_url} />
            <div className='article-tooltip__date'>{ dayjs(article.date_time).format("DD MMMM YYYY") }</div>
          </div>
        );
      }}
    </BaseTooltip>
  );
};

export default ArticleTooltip;
