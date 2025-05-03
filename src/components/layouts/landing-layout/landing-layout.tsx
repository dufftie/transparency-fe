import React from 'react';
import ArticleSearch from '@/components/article-search/article-search';
import MediaSelect from '@/components/media-select/media-select';
import { MediaData } from '@/types/article';
import styles from './landing-layout.module.scss';

interface LandingLayoutProps {
  stats: {
    total_articles: number;
    total_sentiments: number;
  };
  media: MediaData[];
}

const LandingLayout = ({ stats, media }: LandingLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Läbipaistvus</h1>
        <p className={styles.description}>
          an independent non-profit organization focused on making media biases in Estonia
          transparent.
        </p>
      </div>
      <ArticleSearch {...stats} isWidget />
      <MediaSelect media={media} />
    </div>
  );
};

export default LandingLayout;
