import ArticleSearch from '@/components/article-search/article-search';
import MediaSelect from '@/components/media-select';
import { fetchData } from '@/lib/services/api';
import { MediaData } from '@/types/article';

export default async function Home() {
  const { media } = await fetchData<{
    medias: MediaData[];
  }>(`/media`);

  const stats = await fetchData(`/articles/stats`);

  return (
    <div className="landing-layout">
      <div className="landing-layout__header">
        <h1>Läbipaistvus</h1>
        <p>
          an independent non-commercial organization focused on making media biases in Estonia
          transparent.
        </p>
      </div>

      <ArticleSearch {...stats} />

      <MediaSelect medias={media} />
    </div>
  );
}
