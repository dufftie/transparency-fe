'use client';

import PartySentimentWidget from '@/src/components/widgets/party-sentiment-widget';
import PartiesMonthlySentimentsBarchart from '@/src/components/widgets/parties-monthly-sentiments-barchart';

export default function Home() {
  return (
    <div>
      <PartiesMonthlySentimentsBarchart />
      <PartySentimentWidget />
    </div>
  );
}
