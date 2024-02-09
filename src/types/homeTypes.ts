export type TArticle = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export type TNewsResponse = {
  message: string;
  data: {
    totalArticles: number;
    articles: TArticle[];
  };
};
