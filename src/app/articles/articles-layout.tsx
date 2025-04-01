'use client';

import ArticleSearch from '@/components/article-search/article-search';
import { useSearchParams } from 'next/navigation';

const ArticlesLayout = (props) => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');

  return <ArticleSearch {...props} defaultValue={searchValue} limit={100} />;
};

export default ArticlesLayout;
