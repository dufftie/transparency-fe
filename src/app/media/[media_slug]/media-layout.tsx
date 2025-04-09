import React, { JSX } from 'react';
import { MediaData } from '@/src/types/article';
import MediaHeader from '@/src/components/media-detail/media-header';

interface MediaLayoutProps {
  media: MediaData;
  analyzed_count: number;
  total_count: number;
}

const MediaLayout = ({ media, analyzed_count, total_count }: MediaLayoutProps): JSX.Element => {
  return (
    <div className="media-layout">
      <MediaHeader
        title={media.title}
        url={media.base_url}
        description={media.description}
        analyzed_count={analyzed_count}
        total_count={total_count}
      />

      <div>
        
      </div>
    </div>
  );
};

export default MediaLayout;
