'use client';

import { Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchData } from '@/lib/services/api';
import debounce from 'lodash/debounce';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import classNames from 'classnames';
import ArticlesCount from '@/components/articles-count';
import { isEmpty } from 'lodash';
import ArticleSearchResult from '@/components/article-search/article-search-result';

const { Search } = Input;
gsap.registerPlugin(ScrollTrigger);

const ArticleSearch = ({ total_articles, total_sentiments, defaultValue, limit = 20, isWidget = false }) => {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const scopeRef = useRef(null);

  const requestArticles = useCallback(
    debounce(async value => {
      setIsLoading(true);
      if (!value || value?.length < 3) {
        setArticles([]);
        setIsLoading(false);
        return;
      }
      const { articles } = await fetchData('/articles/search', { value, limit });
      setArticles(articles);
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    requestArticles(searchValue);
  }, [searchValue, requestArticles]);

  useEffect(() => {
    if (articles.length > 0) {
      articles.forEach(article => {
        const articleElement = document.getElementById(`article-${article.id}`);

        gsap.fromTo(
          articleElement,
          { opacity: 0.2, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: articleElement,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              markers: false,
            },
          }
        );
      });
    }
  }, [articles]);

  return (
    <div className="article-search">
      <div className="article-search__header">
        <div className="article-search__header__inner">
          <div className="article-search__title">Articles</div>
          <ArticlesCount total_count={total_articles} analyzed_count={total_sentiments} layout='vertical' />
        </div>
      </div>
      <div className="article-search__content">
        <Search
          defaultValue={searchValue}
          rootClassName={classNames('article-search__input', {
            'article-search__input--focused': searchValue,
          })}
          placeholder="Search for title"
          onChange={e => setSearchValue(e.target.value)}
          size="large"
          loading={isLoading}

        />
        <div className="article-search__results" ref={scopeRef}>
          {articles.map(article => (
            <ArticleSearchResult key={article.id} article={article} />
          ))}
        </div>
        {(!isEmpty(articles) && isWidget) && (
          <a href={`/articles?search=${searchValue}`} className="article-search__link">
            Open articles
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleSearch;
