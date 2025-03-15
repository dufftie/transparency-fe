'use client';

import PartySentimentWidget from '@/src/components/widgets/party-sentiment-widget';
import PartiesMonthlySentimentsBarchart from '@/src/components/widgets/parties-monthly-sentiments-barchart';
import PartiesMonthlySentimentsAreaChart from '@/src/components/widgets/parties-monthly-sentiments-area-chart';

export default function Home() {
  return (
    <div>
      <PartiesMonthlySentimentsAreaChart />
      <PartiesMonthlySentimentsBarchart />
      <PartySentimentWidget />
    </div>
  );
}
