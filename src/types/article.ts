export interface ArticleData {
  title: string;
  url: string;
  paywall: boolean;
  category: string;
  body: string;
  article_id: string;
  id: string;
  media_id: number;
  date_time: string;
  authors: string;
  preview_url: string;
}

export interface PartySentiment {
  name: string;
  score: number;
  explanation: string;
}

export interface SentimentData {
  model: string;
  sentiment: {
    article?: {
      title: {
        score: number;
        explanation: string;
      };
      body: {
        score: number;
        explanation: string;
      };
    };
    parties?: PartySentiment[];
  };
}
