export type ReviewData = {
  title: string;
  date: string;
  image: string;
  body: string;
};

export type ReviewDataWithSlug = {
  slug: string;
} & ReviewData;
