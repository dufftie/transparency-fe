import React, { cache } from 'react';
import { fetchData } from '@/src/lib/services/api';
import ArticlesLayout from './articles-layout';


const getArticlesStats = cache(async () => {
  return fetchData(
    `/articles/stats`,
    undefined,
    { next: { revalidate: 3600 } }
  );
});

export default async function ArticlesPage() {
  try {
    const stats = await getArticlesStats();
    return <ArticlesLayout {...stats} />;
  } catch (error) {
    console.error('Error fetching articles stats:', error);
    return <div>Failed to load articles data</div>;
  }
}
