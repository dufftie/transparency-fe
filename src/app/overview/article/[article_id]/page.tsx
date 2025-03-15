'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@/src/lib/services/api';
import dayjs from 'dayjs';
import ArticlePreview from '@/src/components/article-preview';
import { ExportOutlined } from '@ant-design/icons';

interface ArticleData {
  title: string;
  url: string;
  paywall: boolean;
  category: string;
  body: string;
  article_id: string;
  id: string;
  media_id: number;
  date_time: string;
  authors: string;
  preview_url: string;
}

export default function ArticleDetailPage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState<ArticleData>(null);
  const [sentiments, setSentiments] = useState<>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticleData = async () => {
      if (!article_id) return;

      setLoading(true);
      try {
        const { article, sentiments } = await fetchData<ArticleData>(`/articles/${article_id}`);
        setArticle(article);
        setSentiments(sentiments);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article data');
      } finally {
        setLoading(false);
      }
    };

    getArticleData();
  }, [article_id]);

  if (loading) return <>LOADING</>;

  const selectedSentiment = sentiments[0];
  const formattedDate = dayjs(article.date_time).format('DD MMMM, YYYY');

  return (
    <div className="article-detail-page">
      <div className="article-detail-page__details">
        <a href={article.url} target="_blank">
          <article className="article">
            <ExportOutlined className='article-tooltip__icon' />
            <span className="article__title">{article.title}</span>
            <ArticlePreview preview_url={article.preview_url} />
            <span className="article__date">{formattedDate}</span>
          </article>
        </a>
        <div className="model">
          Analysed by: <b>{selectedSentiment.model}</b>
        </div>
      </div>
      <div className="article-detail-page__analysis">
        <div className="analysis-card">
          <span className="analysis-card__title">
            Title analysis
            <span className="analysis-card__score">
              {selectedSentiment.sentiment.article?.title.score}
            </span>
          </span>
          <p className="analysis-card__description">
            {selectedSentiment.sentiment.article?.title.explanation}
          </p>
        </div>

        <div className="analysis-card">
          <span className="analysis-card__title">
            Article analysis
            <span className="analysis-card__score">
              {selectedSentiment.sentiment.article?.body.score}
            </span>
          </span>
          <p className="analysis-card__description">
            {selectedSentiment.sentiment.article?.body.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
