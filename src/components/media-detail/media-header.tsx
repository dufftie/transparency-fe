import React from 'react';
import ArticlesCount from '@/components/articles-count';
interface MediaHeaderProps {
  title: string;
  url: string;
  description: string;
  analyzed_count: number;
  total_count: number;
}

export default function MediaHeader({
  title,
  url,
  description,
  analyzed_count,
  total_count,
}: MediaHeaderProps) {
  return (
    <div className="media-header">
      <div>
        <a
          className="media-header__title"
          href={'https://' + url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <p className="media-header__description">{description}</p>
      </div>
      <ArticlesCount analyzed_count={analyzed_count} total_count={total_count} />
    </div>
  );
}
