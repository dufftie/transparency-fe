import { formatDate } from '@/lib/utils/helpers';

const ArticleSearchResult = ({ article }) => {
  return (
    <a
      key={article.id}
      id={`article-${article.id}`}
      href={`/articles/${article.id}`}
      className="article-search-result"
    >
      <div className="article-search-result__title">{article.title}</div>
      <div className="article-search-result__meta">
        <div className="article-search-result__media">{article.media_title}</div>
        <div className="article-search-result__date">
          {formatDate(article.date_time, 'DD.MM.YYYY')}
        </div>
      </div>
    </a>
  );
};

export default ArticleSearchResult;
