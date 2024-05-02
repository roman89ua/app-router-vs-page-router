import "server-only";
import { marked } from "marked";
import {
  Daum,
  ReviewData,
  ReviewDataWithSlug,
  ReviewsStrapi,
  SuggestionsReviewInfo,
} from "@/components/Review/types";
import qs from "qs";

const CMS_URL = "http://localhost:1337";
export const CACHE_REVIEW_TAG = "review";

export async function getReview(slug: string): Promise<ReviewData | null> {
  const responseData: ReviewsStrapi = await fetchReviews({
    filters: { slug: { $eq: slug } }, //'filters' but not 'filter'
    fields: ["slug", "title", "subtitle", "body", "publishedAt"], // can have only needed fields for response like this line;
    // populate: "*", // all extra field populated
    populate: {
      image: {
        fields: ["url", "name"],
      },
    },
  });

  if (responseData.data.length === 0) {
    return null;
  }

  const firstItem = responseData.data[0];
  const body = await marked(firstItem?.attributes.body);

  return {
    body,
    ...toReview(responseData.data[0]),
  };
}

export async function getReviewsList(
  reviewsCount: number,
  page?: number,
): Promise<{
  reviews: Omit<ReviewDataWithSlug, "body">[];
  pageCount: number;
}> {
  const reviews: ReviewsStrapi = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"], // can have only needed fields for response like this line;
    // populate: "*", // all extra field populated
    populate: {
      image: {
        fields: ["url", "name"],
      },
    },
    pagination: { pageSize: reviewsCount, page },
    sort: ["publishedAt:desc"],
  });

  return {
    reviews: reviews.data.map(
      (obj): Omit<ReviewDataWithSlug, "body"> => toReview(obj),
    ),
    pageCount: reviews.meta.pagination.pageCount,
  };
}

export async function getReviewsSuggestions(
  query: string,
): Promise<SuggestionsReviewInfo[]> {
  const response: ReviewsStrapi = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    pagination: { pageSize: 10 },
    sort: ["title"],
  });

  return response.data.map(({ attributes }) => {
    const { slug, title } = attributes;
    return {
      slug,
      title,
    };
  });
}

export async function getSlugs() {
  const response: ReviewsStrapi = await fetchReviews({
    fields: ["slug"],
    pagination: { pageSize: 100 },
    sort: ["publishedAt:desc"],
  });
  return response.data.map((item) => item.attributes.slug);
}

async function fetchReviews(settings: any) {
  const response = await fetch(
    `${CMS_URL}/api/reviews?` +
      qs.stringify(settings, { encodeValuesOnly: true }),
    { next: { tags: [CACHE_REVIEW_TAG] } },
  );

  const responseData: ReviewsStrapi = await response.json();

  return responseData;
}

function toReview(responseData: Daum) {
  const { slug, title, image, publishedAt, subtitle } = responseData.attributes;
  return {
    slug,
    title,
    subtitle,
    image: CMS_URL + image.data.attributes.url,
    date: publishedAt,
  };
}
