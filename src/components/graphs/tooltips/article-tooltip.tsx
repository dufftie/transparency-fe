import BaseTooltip from '@/src/components/graphs/tooltips/base-tooltip';
import { TooltipProps } from 'recharts';
import React from 'react';
import ArticlePreview from '@/src/components/article-preview';
import { ExportOutlined } from '@ant-design/icons';
import { formatDate } from '@/lib/utils/helpers';

const ArticleTooltip = (props: TooltipProps<any, any>) => {
  const processData = (article: any) => {
    return article;
  };

  const article_id = props.payload[0]?.payload?.article_id;
  const fetchUrl = article_id ? `/articles/${article_id}/tooltip` : undefined;

  return (
    <BaseTooltip fetchUrl={fetchUrl} processData={processData}>
      {article => {
        return (
          <div className="article-tooltip">
            <ExportOutlined className="article-tooltip__icon" />
            <div className="article-tooltip__authors">{article.authors}</div>
            <div className="article-tooltip__title">{article.title}</div>
            <ArticlePreview
              preview_url={article.preview_url}
              className="article-tooltip__preview"
            />
            <div className="article-tooltip__date">
              {formatDate(article.date_time, 'DD MMMM YYYY')}
            </div>
          </div>
        );
      }}
    </BaseTooltip>
  );
};

export default ArticleTooltip;
