'use client';

import React from 'react';
import { ArticleData, MediaData } from '@/src/types/article';
import Hint from '@/src/components/hint';
import dayjs from 'dayjs';

const titlePrompt = (
  <pre>
    Оцени объективность *заголовка* статьи по шкале от 0 до 10 (0 - крайне предвзятый, 10 -
    абсолютно объективный). Предоставь обоснование. Учитывай, отражает ли заголовок содержание
    статьи, использует ли он эмоционально окрашенную лексику, преувеличения или искажения.
  </pre>
);

const articlePrompt = (
  <pre>
    Оцени объективность *всего текста* статьи по шкале от 0 до 10 (0 - крайне предвзятый, 10 -
    абсолютно объективный). Предоставь обоснование. Учитывай, представлены ли разные точки зрения,
    используются ли достоверные источники, есть ли признаки манипуляции фактами или мнениями.
  </pre>
);

interface ArticleAnalysisProps {
  titleAnalysis: {
    score: number;
    explanation: string;
  };
  bodyAnalysis: {
    score: number;
    explanation: string;
  };
  media: MediaData;
  article: ArticleData;
}

export default function ArticleAnalysis({
  titleAnalysis,
  bodyAnalysis,
  media,
  article,
}: ArticleAnalysisProps) {
  const formateDate = (date: string) => {
    return dayjs(date).format('DD MMMM YYYY');
  };

  return (
    <div className="article-analysis">
      <table>
        <tbody>
          <tr>
            <td>
              <span>Publisher</span>
              <h2>
                <a href={`/media/${media.id}`}>
                  <b>{media.title}</b>
                </a>
              </h2>
            </td>

            <td>
              <span>Author</span>
              <h2>
                <b>{article.authors}</b>
              </h2>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <b>Original publish date:</b> {formateDate(article.date_time)}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <b>Article scanned:</b> {formateDate(article.created_at)}
            </td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <td>
              <b>
                Title objectivity: {titleAnalysis.score} / 10 <Hint content={titlePrompt} />
              </b>
              <p>{titleAnalysis.explanation}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                Article objectivity: {bodyAnalysis.score} / 10 <Hint content={articlePrompt} />
              </b>
              <p>{bodyAnalysis.explanation}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
