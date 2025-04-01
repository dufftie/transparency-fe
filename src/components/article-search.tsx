'use client';

import { Input } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchData } from '@/lib/services/api';
import debounce from 'lodash/debounce';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import classNames from 'classnames';
import ArticlesCount from './articles-count';
import { isEmpty } from 'lodash';

const { Search } = Input;
gsap.registerPlugin(ScrollTrigger);

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
            <a
              key={article.id}
              id={`article-${article.id}`}
              href={`/articles/${article.id}`}
              className="article-search__result"
            >
              <h3>{article.title}</h3>
            </a>
          ))}
        </div>
        {!isEmpty(articles) && (
          <a href={`/articles?search=${searchValue}`} className="article-search__link">
            Open articles
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleSearch;
