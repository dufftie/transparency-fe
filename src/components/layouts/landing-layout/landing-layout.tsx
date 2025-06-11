import React from 'react';
import ArticleSearch from '@/components/article-search/article-search';
import MediaSelect from '@/components/media-select/media-select';
import Intro from '@/components/intro';
import { MediaData } from '@/types/article';
import styles from './landing-layout.module.scss';
import Beams from '@/components/beams';

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
      <Intro />
      <ArticleSearch {...stats} isWidget />
      <MediaSelect media={media} />

      <div className={styles.silk}>
        <Beams
          beamWidth={15}
          beamHeight={15}
          beamNumber={5}
          lightColor="#bbdbf5"
          speed={4}
          rotation={260}
        />
      </div>
    </div>
  );
};

export default LandingLayout;
