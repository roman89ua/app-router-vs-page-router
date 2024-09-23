export interface ReviewComment {
  message: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Data<T> {
  id: number;
  attributes: T;
}

export type ReviewComments = {
  data: Array<Data<ReviewComment>>;
};

export type ModifiedComment = ReviewComment & Pick<Data<ReviewComment>, "id">;

export type ModifiedComments = Array<ModifiedComment>;

export type ReviewData = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body: string;
  comments: ModifiedComments;
};

export type ReviewDataWithSlug = {
  slug: string;
} & ReviewData;

export type SuggestionsReviewInfo = Pick<ReviewDataWithSlug, "slug" | "title">;

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  small: Small;
  medium: Medium;
  large: Large;
}

export interface ImageDataObject {
  name: string;
  alternativeText: unknown;
  caption: unknown;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: unknown;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  data: Data<ImageDataObject>;
}

export interface ReviewsAttribute {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  subtitle: string;
  image: Image;
  comments: ReviewComments;
}

export type ReviewsAttributes = Array<Data<ReviewsAttribute>>;

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface ReviewsStrapi {
  data: ReviewsAttributes;
  meta: Meta;
}
