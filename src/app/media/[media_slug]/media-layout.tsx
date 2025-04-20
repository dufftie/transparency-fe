import React, { JSX } from 'react';
import { MediaData } from '@/src/types/article';
import MediaHeader from '@/src/components/media-detail/media-header';
import ProceededArticlesGraph from '@/src/components/graphs/proceeded-article-graph';
import dayjs from 'dayjs';
import Card from '@/src/components/card';
import RangeDateSelect from '@/src/components/range-date-select';
import { DateRangeProvider } from '@/src/contexts/DateRangeContext';

interface MediaLayoutProps {
  media: MediaData;
  analyzed_count: number;
  total_count: number;
}

const MediaLayout = ({
  media,
  analyzed_count,
  total_count,
}: MediaLayoutProps): JSX.Element => {
  // ToDo: Replace with actual hint text
  const hintText = `The number of articles analyzed for the selected period`;

  return (
    <DateRangeProvider>
      <div className="media-layout">
        <MediaHeader
          title={media.title}
          url={media.base_url}
          description={media.description}
          analyzed_count={analyzed_count}
          total_count={total_count}
        />

        <div className="media-layout__content">
          <Card label="Analysis progress" primary hint={hintText}>
            <ProceededArticlesGraph
              mediaId={media.id}
            />
          </Card>

          <RangeDateSelect /> 
        </div>
      </div>
    </DateRangeProvider>
  );
};

export default MediaLayout;
