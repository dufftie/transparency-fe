'use client';

import { Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchData } from '@/lib/services/api';
import debounce from 'lodash/debounce';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import classNames from 'classnames';
import ArticlesCount from './articles-count';

const { Search } = Input;

const ArticleSearch = ({ total_articles, total_sentiments }) => {
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState([]);
  const scopeRef = useRef(null);

  const requestArticles = useCallback(
    debounce(async value => {
      if (!value || value?.length < 3) {
        setArticles([]);
        return;
      }
      const { articles } = await fetchData('/articles/search', { value });
      setArticles(articles);
    }, 300),
    []
  );

  useEffect(() => {
    requestArticles(searchValue);
  }, [searchValue, requestArticles]);

  useGSAP(
    () => {
      gsap.fromTo(
        'a',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.05, stagger: 0.05, ease: 'power2.inOut' }
      );
    },
    { scope: scopeRef, dependencies: [articles] }
  );

  return (
    <div className="article-search">
      <div className="article-search__header">
        <div className="article-search__header__inner">
          <div className="article-search__title">Articles</div>
          <ArticlesCount total_count={total_articles} analyzed_count={total_sentiments} />
        </div>
      </div>
      <div className="article-search__content">
        <Search
          rootClassName={classNames('article-search__input', {
            'article-search__input--focused': searchValue,
          })}
          placeholder="Search for title"
          onChange={e => setSearchValue(e.target.value)}
          size="large"
        />
        <div className="article-search__results" ref={scopeRef}>
          {articles.map(article => (
            <a key={article.id} href={`/article/${article.id}`} className="article-search__result">
              <h3>{article.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleSearch;