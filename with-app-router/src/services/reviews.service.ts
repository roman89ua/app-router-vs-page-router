import { marked } from "marked";
import {
  Daum,
  ReviewData,
  ReviewDataWithSlug,
  ReviewsStrapi,
} from "@/components/Review/types";
import qs, { BooleanOptional, IStringifyOptions } from "qs";
const CMS_URL = "http://localhost:1337";

export async function getReview(slug: string): Promise<ReviewData> {
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
  const body = await marked(responseData.data[0].attributes.body);

  return {
    body,
    ...toReview(responseData.data[0]),
  };
}

export async function getReviewsList(): Promise<
  Omit<ReviewDataWithSlug, "body">[]
> {
  const reviews: ReviewsStrapi = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"], // can have only needed fields for response like this line;
    // populate: "*", // all extra field populated
    populate: {
      image: {
        fields: ["url", "name"],
      },
    },
    pagination: { pageSize: 6 },
    sort: ["publishedAt:desc"],
  });

  return reviews.data.map(
    (obj): Omit<ReviewDataWithSlug, "body"> => toReview(obj),
  );
}

export async function getSlugs() {
  const response: ReviewsStrapi = await fetchReviews({
    fields: ["slug"],
    pagination: { pageSize: 100 },
    sort: ["publishedAt:desc"],
  });
  return response.data.map((item) => item.attributes.slug);
}

export async function getLatestReview() {
  const allReviews = await getReviewsList();

  return allReviews.at(0);
}

async function fetchReviews(settings: any) {
  const response = await fetch(
    `${CMS_URL}/api/reviews?` +
      qs.stringify(settings, { encodeValuesOnly: true }),
  );

  const responseData: ReviewsStrapi = await response.json();

  return responseData;
}

function toReview(responseData: Daum) {
  const { slug, title, image, publishedAt } = responseData.attributes;
  return {
    slug,
    title,
    image: CMS_URL + image.data.attributes.url,
    date: publishedAt,
  };
}
