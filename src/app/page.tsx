import React, { cache } from 'react';
import ArticleSearch from '@/components/article-search/article-search';
import MediaSelect from '@/components/media-select/media-select';
import { fetchData } from '@/lib/services/api';
import { MediaData } from '@/types/article';


const getMediaList = cache(async () => {
  return fetchData<{
    medias: MediaData[];
  }>(
    `/media`,
    undefined,
    { next: { revalidate: 3600 } }
  );
});

const getArticlesStats = cache(async () => {
  return fetchData(
    `/articles/stats`,
    undefined,
    { next: { revalidate: 3600 } }
  );
});

export default async function Home() {
  try {

    const [mediaResponse, stats] = await Promise.all([
      getMediaList(),
      getArticlesStats()
    ]);

    return (
      <div className="landing-layout">
        <div className="landing-layout__header">
          <h1>Läbipaistvus</h1>
          <p>
            an independent non-profit organization focused on making media biases in Estonia
            transparent.
          </p>
        </div>

        <ArticleSearch {...stats} isWidget />

        <MediaSelect medias={mediaResponse.media} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Failed to load data</div>;
  }
}
