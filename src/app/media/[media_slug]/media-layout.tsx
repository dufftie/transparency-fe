'use client';

import React, { JSX } from 'react';
import { MediaData } from '@/src/types/article';
import MediaHeader from '@/src/components/media-detail/media-header';
import ProceededArticlesGraph from '@/src/components/graphs/proceeded-article-graph';
import Card from '@/src/components/card';
import RangeDateSelect from '@/src/components/range-date-select';
import { DateRangeProvider } from '@/src/contexts/date-range-context';
import PartySentimentWidget from '@/src/components/widgets/party-sentiment-widget';
import PartiesMonthlySentimentsAreaChart from '@/src/components/widgets/parties-monthly-sentiments-area-chart';
import PartiesMonthlySentimentsBarChart from '@/src/components/widgets/parties-monthly-sentiments-barchart';
import SimpleBarChartWidget from '@/src/components/widgets/simple-bar-chart-widget';

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
          <div className="media-layout__meta">
            <Card label="Analysis progress" primary hint={hintText}>
              <ProceededArticlesGraph media_id={media.id} />
            </Card>
            <RangeDateSelect />
          </div>

          <div className="media-layout__graphs">
            <PartySentimentWidget media_id={media.id} />
            <PartiesMonthlySentimentsAreaChart media_id={media.id} />
            <PartiesMonthlySentimentsBarChart media_id={media.id} />
            <SimpleBarChartWidget media_id={media.id} />
          </div>
        </div>
      </div>
    </DateRangeProvider>
  );
};

export default MediaLayout;
