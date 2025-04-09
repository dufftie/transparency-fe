import MediaSelect from '@/components/media-select/media-select';
import { fetchData } from '@/lib/services/api';
import { MediaData } from '@/types/article';

export default async function Home() {
  const { media } = await fetchData<{
    medias: MediaData[];
  }>(`/media`);

  return <MediaSelect medias={media} />;
}
