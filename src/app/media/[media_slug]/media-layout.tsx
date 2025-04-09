import React, { JSX } from 'react';
import { MediaData } from '@/src/types/article';
import MediaHeader from '@/src/components/media-detail/media-header';
import ProceededArticlesGraph from '@/src/components/graphs/proceeded-article-graph';
import dayjs from 'dayjs';
import Card from '@/src/components/card';
interface MediaLayoutProps {
  media: MediaData;
  analyzed_count: number;
  total_count: number;
}

const MediaLayout = ({ media, analyzed_count, total_count }: MediaLayoutProps): JSX.Element => {
  // ToDo: Replace with actual hint text
  const hintText = `The number of articles analyzed for the selected period`;

  return (
    <div className="media-layout">
      <MediaHeader
        title={media.title}
        url={media.base_url}
        description={media.description}
        analyzed_count={analyzed_count}
        total_count={total_count}
      />

      <div className='media-layout__meta'>
        <Card label='Analysis progress' primary hint={hintText}>
          <ProceededArticlesGraph mediaId={media.id} dateRange={[
            dayjs().subtract(2, 'year').format('YYYY-MM-DD'),
            dayjs().format('YYYY-MM-DD')
          ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default MediaLayout;
