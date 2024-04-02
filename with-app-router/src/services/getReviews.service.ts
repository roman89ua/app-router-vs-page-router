import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import { ReviewData, ReviewDataWithSlug } from "@/components/Review/types";

export async function getReview(slug: string): Promise<ReviewData> {
  let text: string = await readFile(`./src/content/reviews/${slug}.md`, "utf8");

  const {
    content,
    data: { title, date, image },
  } = matter(text);

  const body = marked(content) as string;

  return { title, date, image, body };
}
export async function getSlugs() {
  const files = await readdir("./src/content/reviews");
  const onlyMdFile = files.filter((file) => file.endsWith(".md"));

  return onlyMdFile.map((file) => file.split(".md").join(""));
}

export async function getReviewsList() {
  const reviewsData: Array<ReviewDataWithSlug> = [];
  const slugs = await getSlugs();

  for (const slug of slugs) {
    const currentReview: ReviewData = await getReview(slug);
    const review: ReviewDataWithSlug = {
      ...currentReview,
      slug,
    };

    reviewsData.push(review);
  }

  return reviewsData.sort((reviewA, reviewB) => {
    // if (new Date(reviewA.date) > new Date(reviewB.date)) return -1;
    // if (new Date(reviewA.date) === new Date(reviewB.date)) return 0;
    // return 1;
    return reviewB.date.localeCompare(reviewA.date);
  });
}

export async function getLatestReview() {
  const allReviews = await getReviewsList();

  return allReviews.at(0);
}
