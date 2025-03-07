'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

import GraphWidget from '@/src/components/graphs/graph-widget';
import GraphSettings from '@/src/components/graphs/graph-settings';
import PartyScatterPlotGraph from '@/src/components/graphs/party-scatter-plot';
import PartySentimentWidget from '@/src/components/widgets/party-sentiment-widget';

export default function Home() {
  // State for second widget
  const [compareCategory, setCompareCategory] = useState('Мнение');
  const [compareDateRange, setCompareDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs('2024-01-01', 'YYYY-MM-DD'),
    dayjs('2025-03-01', 'YYYY-MM-DD'),
  ]);

  return (
    <>
      <PartySentimentWidget />

      {/*/!* Articles Widget *!/*/}
      {/*<GraphWidget */}
      {/*  title="Articles by Category" */}
      {/*  settings={*/}
      {/*    <GraphSettings*/}
      {/*      category={articleCategory}*/}
      {/*      dateRange={articleDateRange}*/}
      {/*      categoryOptions={categoryOptions}*/}
      {/*      onCategoryChange={setArticleCategory}*/}
      {/*      onDateRangeChange={setArticleDateRange}*/}
      {/*    />*/}
      {/*  }*/}
      {/*>*/}
      {/*  <ProceededArticlesGraph*/}
      {/*    category={articleCategory}*/}
      {/*    dateRange={articleDateRange}*/}
      {/*  />*/}
      {/*</GraphWidget>*/}
    </>
  );
}
