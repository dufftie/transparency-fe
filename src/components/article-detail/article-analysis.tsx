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
  title_score: number;
  title_explanation: string;
  body_score: number;
  body_explanation: string;
  media: MediaData;
  article: ArticleData;
}

export default function ArticleAnalysis({
  title_score,
  title_explanation,
  body_score,
  body_explanation,
  media,
  article,
}: ArticleAnalysisProps) {
  const formateDate = (date: string) => {
    if (!date) return null;
    return dayjs(date).format('DD.MM.YYYY, HH:mm:ss');
  };

  return (
    <div className="analysis-table">
      <table>
        <tbody>
          <tr>
            <td>
              <h6>Publisher</h6>
              <h2>
                <a href={`/media/${media.slug}`}>
                  <b>{media.title}</b>
                </a>
              </h2>
            </td>

            {article.authors && (
              <td>
                <h6>Author</h6>
                <h2>
                  <b>{article.authors}</b>
                </h2>
              </td>
            )}
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
                Title objectivity: {title_score} / 10{' '}
                <Hint title="AI prompt" content={titlePrompt} />
              </b>
              <p>{title_explanation}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                Article objectivity: {body_score} / 10{' '}
                <Hint title="AI prompt" content={articlePrompt} />
              </b>
              <p>{body_explanation}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
