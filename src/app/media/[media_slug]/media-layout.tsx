'use client';

import React, { JSX, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MediaData } from '@/src/types/article';
import { fetchData } from '@/src/lib/services/api';
import ArticleLoading from '@/src/components/article-detail/article-loading';
import ArticleError from '@/src/components/article-detail/article-error';
import MediaHeader from '@/src/components/media-detail/media-header';
import PartiesMonthlySentimentsAreaChart from '@/src/components/widgets/parties-monthly-sentiments-area-chart';
import PartySentimentWidget from '@/src/components/widgets/party-sentiment-widget';
import PartiesMonthlySentimentsBarchart from '@/src/components/widgets/parties-monthly-sentiments-barchart';

const MediaLayout = (): JSX.Element => {
  const { media_slug } = useParams();
  const [data, setData] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMediaData = async () => {
      if (!media_slug) {
        setError('Invalid media slug');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchData(`/media/${media_slug}`);
        setData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article data');
      } finally {
        setLoading(false);
      }
    };

    getMediaData();
  }, [media_slug]);

  if (loading) return <ArticleLoading />;

  if (error || !data) {
    return <ArticleError message={error || 'Failed to load article data'} />;
  }

  const { media } = data;

  return (
    <div className="media-detail-page">
      <div className="media-detail-page__details">
        <MediaHeader
          title={media.title}
          url={media.url}
          description={media.description}
        />
      </div>
      <div className="media-detail-page__analysis">
        <PartiesMonthlySentimentsAreaChart media_id={media.id} />
        <PartySentimentWidget media_id={media.id} />
        <PartiesMonthlySentimentsBarchart media_id={media.id} />
      </div>
    </div>
  );
};

export default MediaLayout;
