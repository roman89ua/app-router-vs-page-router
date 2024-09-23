// eslint-disable-next-line import/no-extraneous-dependencies
import "server-only";

import { marked } from "marked";
import {
  Data,
  ReviewData,
  ReviewDataWithSlug,
  ReviewsAttribute,
  ReviewsStrapi,
  SuggestionsReviewInfo,
} from "@/components/Review/types";
import qs from "qs";

const { CMS_URL } = process.env;
export const CACHE_REVIEW_TAG = "review";

function toReview(
  responseData: Data<ReviewsAttribute>
): Omit<ReviewDataWithSlug, "body"> {
  return {
    id: responseData?.id,
    slug: responseData?.attributes?.slug,
    title: responseData?.attributes?.title,
    subtitle: responseData?.attributes?.subtitle,
    image:
      CMS_URL + (responseData?.attributes?.image.data.attributes.url || ""),
    date: responseData?.attributes?.publishedAt,
    comments: responseData?.attributes?.comments
      ? responseData?.attributes?.comments?.data.map((comment) => ({
          id: comment.id,
          ...comment.attributes,
        }))
      : [],
  };
}

async function fetchReviews(settings: unknown) {
  const response = await fetch(
    `${CMS_URL}/api/reviews?${qs.stringify(settings, {
      encodeValuesOnly: true,
    })}`,
    { next: { tags: [CACHE_REVIEW_TAG] } }
  );
  return response.json();
}

export async function getReview(slug: string): Promise<ReviewData> {
  const responseData: ReviewsStrapi = await fetchReviews({
    filters: { slug: { $eq: slug } }, // 'filters' but not 'filter'
    fields: ["slug", "title", "subtitle", "body", "publishedAt"], // can have only needed fields for response like this line;
    // populate: "*", // all extra field populated
    populate: {
      image: {
        fields: ["url", "name"],
      },
      comments: {
        fields: [
          "message",
          "username",
          "createdAt",
          "updatedAt",
          "publishedAt",
        ],
      },
    },
  });

  const defaultResponse = {
    body: "",
    title: "",
    comments: [],
    id: 0,
    subtitle: "",
    image: "",
    date: "",
  } as ReviewData;

  const someReviewsPresent = responseData.data.length > 0;

  const firstItem = responseData.data[0];

  if (someReviewsPresent && !!firstItem) {
    const body = await marked(firstItem.attributes?.body || "");

    return {
      body,
      ...toReview(firstItem),
    };
  }
  return defaultResponse;
}

export async function getReviewsList(
  reviewsCount: number,
  page?: number
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
    reviews: reviews.data?.map(
      (obj): Omit<ReviewDataWithSlug, "body"> => toReview(obj)
    ),
    pageCount: reviews.meta?.pagination.pageCount,
  };
}

export async function getReviewsSuggestions(
  query: string
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
  return response.data.map((item) => item.attributes.slug) || [];
}
