'use client';

import React, { JSX } from 'react';
import { MediaData } from '@/src/types/article';
import MediaHeader from '@/src/components/media-detail/media-header';
import PartiesMonthlySentimentsAreaChart from '@/src/components/widgets/parties-monthly-sentiments-area-chart';
import PartySentimentWidget from '@/src/components/widgets/party-sentiment-widget';
import PartiesMonthlySentimentsBarchart from '@/src/components/widgets/parties-monthly-sentiments-barchart';

interface MediaLayoutProps {
  media: MediaData;
}

const MediaLayout = ({ media }: MediaLayoutProps): JSX.Element => {
  return (
    <div className="media-detail-page">
      <div className="media-detail-page__details">
        <MediaHeader
          title={media.title}
          url={media.base_url}
          description={media.description}
        />
      </div>
      <div className="media-detail-page__analysis">
        <PartiesMonthlySentimentsBarchart media_id={media.id} />
        <PartiesMonthlySentimentsAreaChart media_id={media.id} />
        <PartySentimentWidget media_id={media.id} />
      </div>
    </div>
  );
};

export default MediaLayout;
