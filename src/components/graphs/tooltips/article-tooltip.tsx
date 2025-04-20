import BaseTooltip from '@/src/components/graphs/tooltips/base-tooltip';
import { TooltipProps } from 'recharts';
import React from 'react';
import ArticlePreview from '@/src/components/article-preview';
import { ExportOutlined } from '@ant-design/icons';
import { formatDate } from '@/lib/utils/helpers';

interface ArticleData {
  article_id?: string;
  authors?: string;
  title?: string;
  preview_url?: string;
  date_time?: string;
}

const ArticleTooltip = (props: TooltipProps<any, any>) => {
  const processData = (data: any[]): any[] => {
    // If data is an array, return it as is
    if (Array.isArray(data)) {
      return data;
    }
    // If data is a single object, wrap it in an array
    return [data];
  };

  const article_id = props.payload?.[0]?.payload?.article_id;
  const fetchUrl = article_id ? `/articles/${article_id}/tooltip` : undefined;

  return (
    <BaseTooltip fetchUrl={fetchUrl} processData={processData}>
      {(data: any[]) => {
        const article = data[0] as ArticleData;
        return (
          <div className="article-tooltip">
            <ExportOutlined className="article-tooltip__icon" />
            {article?.authors && <span className="article-tooltip__authors">{article.authors}</span>}
            {article?.title && <span className="article-tooltip__title">{article.title}</span>}
            <ArticlePreview
              preview_url={article?.preview_url || ''}
              className="article-tooltip__preview"
            />
            <div className="article-tooltip__date">
              {article?.date_time && formatDate(article.date_time, 'DD MMMM YYYY')}
            </div>
          </div>
        );
      }}
    </BaseTooltip>
  );
};

export default ArticleTooltip;
