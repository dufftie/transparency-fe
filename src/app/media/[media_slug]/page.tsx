import React from 'react';
import { fetchData } from '@/src/lib/services/api';
import { MediaData } from '@/src/types/article';
import { Metadata } from 'next';
import MediaLayout from '@/src/app/media/[media_slug]/media-layout';

export async function generateMetadata(props: {
  params: { media_slug: string };
}): Promise<Metadata> {
  const params = await props.params;
  const media_slug = params.media_slug;

  const { media } = await fetchData<{ media: MediaData }>(`/media/${media_slug}`);
  if (!media) return {};

  return {
    title: media.title,
  };
}

export default function MediaDetailPage() {
  return <MediaLayout />;
}
